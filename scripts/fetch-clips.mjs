#!/usr/bin/env node
// Turns data/clips.links.txt into data/clips.generated.json plus the media the
// clip wall plays. Downloads each post with yt-dlp, transcodes a small muted
// preview with ffmpeg, and records the real view count from the live post.
//
//   npm run clips              download anything new, keep existing clips as-is
//   npm run clips -- --refresh re-read view counts for every clip too
//
// Requires yt-dlp and ffmpeg on PATH (brew install yt-dlp ffmpeg).

import { execFile } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const LINKS_FILE = join(root, "data", "clips.links.txt");
const MANIFEST_FILE = join(root, "data", "clips.generated.json");
const CLIP_DIR = join(root, "public", "media", "clips");
const POSTER_DIR = join(root, "public", "media", "posters");
const WORK_DIR = join(root, ".clip-cache");

// The card renders at 202px, so 404px covers a 2x display and nothing more.
const CARD_WIDTH = 404;
// A preview only needs to feel alive; the card links out for the full post.
const PREVIEW_SECONDS = 10;
const CRF = 30;
// yt-dlp and ffmpeg are both happy to saturate a machine. Keep it civil.
const CONCURRENCY = 4;

const refresh = process.argv.includes("--refresh");

// Testing aid: repeat the fetched clips until the wall holds this many cards, so
// the marquee can be judged at length before there are real links to fill it.
// Repeats reuse the same media — they cost nothing extra on disk.
const fillArg = process.argv.find((arg) => arg.startsWith("--fill="));
const fillTo = fillArg ? Number(fillArg.split("=")[1]) : 0;

function platformOf(url) {
  if (/tiktok\.com/i.test(url)) return "tiktok";
  if (/youtube\.com|youtu\.be/i.test(url)) return "yt";
  if (/instagram\.com/i.test(url)) return "ig";
  return "tiktok";
}

// 81400 -> "81.4K". Always keep the tenth: rounding 166.6M to "167M" would state
// a bigger number than the post actually has. Trailing ".0" reads like a typo.
function formatViews(count) {
  if (typeof count !== "number" || !Number.isFinite(count)) return null;
  const units = [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (count >= size) {
      // Truncate rather than round, so the badge never overstates the post.
      const scaled = Math.floor((count / size) * 10) / 10;
      return `${scaled.toFixed(1).replace(/\.0$/, "")}${suffix}`;
    }
  }
  return String(count);
}

async function readLinks() {
  const raw = await readFile(LINKS_FILE, "utf8");
  const seen = new Set();
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .filter((url) => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    });
}

async function readManifest() {
  if (!existsSync(MANIFEST_FILE)) return [];
  try {
    return JSON.parse(await readFile(MANIFEST_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function probe(url) {
  const { stdout } = await run(
    "yt-dlp",
    ["--socket-timeout", "20", "--no-warnings", "--no-playlist", "-J", url],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  return JSON.parse(stdout);
}

async function download(url, id) {
  const target = join(WORK_DIR, `${id}.%(ext)s`);
  await run(
    "yt-dlp",
    [
      "--socket-timeout", "20",
      "--no-warnings",
      "--no-playlist",
      // Prefer a plain mp4 so ffmpeg never has to demux anything exotic.
      "-f", "mp4/bestvideo[ext=mp4]+bestaudio/best",
      "--merge-output-format", "mp4",
      "-o", target,
      url,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  const raw = join(WORK_DIR, `${id}.mp4`);
  if (!existsSync(raw)) throw new Error("yt-dlp produced no mp4");
  return raw;
}

async function transcode(raw, id) {
  const video = join(CLIP_DIR, `${id}.mp4`);
  const poster = join(POSTER_DIR, `${id}.jpg`);

  // Muted: the wall autoplays, so audio is dead weight and blocks autoplay.
  await run("ffmpeg", [
    "-y", "-loglevel", "error",
    "-i", raw,
    "-t", String(PREVIEW_SECONDS),
    "-an",
    "-vf", `scale=${CARD_WIDTH}:-2`,
    "-c:v", "libx264",
    "-crf", String(CRF),
    "-preset", "slow",
    "-profile:v", "main",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    video,
  ]);

  // One second in, so we skip any fade-from-black opening frame.
  await run("ffmpeg", [
    "-y", "-loglevel", "error",
    "-ss", "1",
    "-i", raw,
    "-frames:v", "1",
    "-vf", `scale=${CARD_WIDTH}:-2`,
    "-q:v", "6",
    poster,
  ]);

  return {
    src: `/media/clips/${id}.mp4`,
    poster: `/media/posters/${id}.jpg`,
  };
}

async function buildClip(url, existing) {
  const info = await probe(url);
  const id = `${platformOf(url)}-${info.id}`;
  const views = formatViews(info.view_count);

  const alreadyOnDisk =
    existsSync(join(CLIP_DIR, `${id}.mp4`)) &&
    existsSync(join(POSTER_DIR, `${id}.jpg`));

  let paths;
  if (alreadyOnDisk && !refresh) {
    paths = { src: `/media/clips/${id}.mp4`, poster: `/media/posters/${id}.jpg` };
  } else {
    const raw = await download(url, id);
    paths = await transcode(raw, id);
    await rm(raw, { force: true });
  }

  return {
    id,
    ...paths,
    // Keep a hand-edited handle or view count if one was set in the manifest.
    handle: existing?.handleOverride ?? `@${info.uploader ?? info.channel ?? "clip"}`,
    views: existing?.viewsOverride ?? views ?? existing?.views ?? "—",
    platform: platformOf(url),
    href: info.webpage_url ?? url,
    ...(existing?.handleOverride ? { handleOverride: existing.handleOverride } : {}),
    ...(existing?.viewsOverride ? { viewsOverride: existing.viewsOverride } : {}),
  };
}

async function mapWithLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  for (const dir of [CLIP_DIR, POSTER_DIR, WORK_DIR]) {
    await mkdir(dir, { recursive: true });
  }

  const links = await readLinks();
  if (links.length === 0) {
    console.error("No links in data/clips.links.txt — nothing to do.");
    process.exit(1);
  }

  const previous = await readManifest();
  const byHref = new Map(previous.map((clip) => [clip.href, clip]));

  console.log(`Processing ${links.length} link${links.length === 1 ? "" : "s"}…`);

  const failures = [];
  const clips = await mapWithLimit(links, CONCURRENCY, async (url, index) => {
    const label = `[${index + 1}/${links.length}]`;
    try {
      const clip = await buildClip(url, byHref.get(url));
      console.log(`${label} ok   ${clip.handle} — ${clip.views} views`);
      return clip;
    } catch (error) {
      // One dead or private link should never sink the whole run.
      const reason = String(error.stderr || error.message).split("\n")[0];
      console.warn(`${label} skip ${url}\n         ${reason}`);
      failures.push({ url, reason });
      return null;
    }
  });

  const kept = clips.filter(Boolean);

  // Each repeat needs its own id, or React sees duplicate keys in the wall.
  const output = [...kept];
  if (fillTo > kept.length && kept.length > 0) {
    for (let index = kept.length; index < fillTo; index += 1) {
      const source = kept[index % kept.length];
      output.push({ ...source, id: `${source.id}-fill${index}` });
    }
    console.log(`Filled to ${output.length} cards for testing (--fill).`);
  }

  await writeFile(MANIFEST_FILE, `${JSON.stringify(output, null, 2)}\n`);
  await rm(WORK_DIR, { recursive: true, force: true });

  console.log(`\nWrote ${output.length} clip(s) to data/clips.generated.json`);
  if (failures.length > 0) {
    console.log(`${failures.length} link(s) skipped — see the warnings above.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
