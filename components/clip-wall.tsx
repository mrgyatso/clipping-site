"use client";

import { useEffect, useRef } from "react";
import { clipWall } from "@/data/site";

const PLATFORM_ICON: Record<string, React.ReactNode> = {
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.8c-1.4.1-2.7-.3-3.9-1v5.6a5.7 5.7 0 11-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 102 2.7V3z" />
    </svg>
  ),
  yt: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10 9.2l5 2.8-5 2.8z" fill="#fff" />
    </svg>
  ),
  ig: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  ),
};

const PLATFORM_LABEL: Record<string, string> = {
  tiktok: "TikTok",
  yt: "YouTube Shorts",
  ig: "Instagram Reels",
};

// Card width plus the flex gap, used to hold the marquee at a constant speed no
// matter how many clips the manifest carries.
const CARD_STRIDE_PX = 220;
const MARQUEE_PX_PER_SECOND = 19;

export function ClipWall() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = Array.from(
      trackRef.current?.querySelectorAll<HTMLVideoElement>("video") ?? [],
    );
    if (videos.length === 0) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fetch a clip only once it is on screen, and never leave one playing off it.
    const playObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) video.src = video.dataset.src;
            if (!reduceMotion) void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }),
      { threshold: 0.2 },
    );

    // With a hundred clips in the track, paused-but-loaded video piles up in
    // memory. Once a clip is well out of range, drop its buffer; the observer
    // above re-fetches it if the marquee brings it back around.
    const unloadObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) return;
          const video = entry.target as HTMLVideoElement;
          if (!video.src) return;
          video.pause();
          video.removeAttribute("src");
          video.load();
        }),
      { rootMargin: "100% 200%" },
    );

    videos.forEach((video) => {
      playObserver.observe(video);
      unloadObserver.observe(video);
    });
    return () => {
      playObserver.disconnect();
      unloadObserver.disconnect();
    };
  }, []);

  // Nothing verified yet? Show nothing rather than inventing a wall of clips.
  if (clipWall.length === 0) return null;

  // The track is rendered twice so the marquee can loop without a visible seam.
  const looped = [...clipWall, ...clipWall];
  const duration = Math.round(
    (clipWall.length * CARD_STRIDE_PX) / MARQUEE_PX_PER_SECOND,
  );

  return (
    <div className="clip-marquee reveal">
      <div
        className="clip-track"
        ref={trackRef}
        style={{ "--clip-duration": `${duration}s` } as React.CSSProperties}
      >
        {looped.map((clip, index) => {
          const isDuplicate = index >= clipWall.length;
          return (
            <a
              className="clip-card"
              key={`${clip.id}-${index}`}
              href={clip.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={isDuplicate}
              tabIndex={isDuplicate ? -1 : undefined}
            >
              <div className="clip-frame">
                <span className="clip-views">{clip.views} views</span>
                <span className={`clip-plat cp-${clip.platform}`}>
                  {PLATFORM_ICON[clip.platform]}
                </span>
                {/* A native lazy image rather than the video's poster attribute:
                    browsers fetch poster eagerly, which at this many cards would
                    pull every thumbnail on first paint. Plain <img> rather than
                    next/image because ffmpeg already emits these at exactly 2x
                    the card width — next/image would re-optimise a correctly
                    sized file and bill a transformation for every clip. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="clip-poster"
                  src={clip.poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={404}
                  height={718}
                />
                <video
                  className="clip-vid"
                  data-src={clip.src}
                  muted
                  loop
                  playsInline
                  preload="none"
                  tabIndex={-1}
                  aria-label={`${clip.handle} clip on ${PLATFORM_LABEL[clip.platform]}`}
                />
                <span className="clip-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              </div>
              <div className="clip-who">
                <span className={`clip-av cp-${clip.platform}`}>
                  {clip.handle.replace("@", "")[0]}
                </span>
                <span className="clip-name">{clip.handle}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
