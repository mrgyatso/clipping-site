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

export function ClipWall() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = Array.from(
      trackRef.current?.querySelectorAll<HTMLVideoElement>("video") ?? [],
    );
    if (videos.length === 0) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only fetch a clip once it is on screen, and never leave one playing off screen.
    const observer = new IntersectionObserver(
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

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  // The track is rendered twice so the marquee can loop without a visible seam.
  const looped = [...clipWall, ...clipWall];

  return (
    <div className="clip-marquee reveal">
      <div className="clip-track" ref={trackRef}>
        {looped.map((clip, index) => {
          const card = (
            <>
              <div className="clip-frame">
                <span className="clip-views">{clip.views} views</span>
                <span className={`clip-plat cp-${clip.platform}`}>
                  {PLATFORM_ICON[clip.platform]}
                </span>
                <video
                  className="clip-vid"
                  poster={clip.poster}
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
                <span className={`clip-av cp-${clip.platform}`}>{clip.handle[0]}</span>
                <span className="clip-name">{clip.handle}</span>
              </div>
            </>
          );

          // Cards link out to the live post once a real URL is supplied.
          return clip.href ? (
            <a
              className="clip-card"
              key={`${clip.src}-${index}`}
              href={clip.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={index >= clipWall.length}
              tabIndex={index >= clipWall.length ? -1 : undefined}
            >
              {card}
            </a>
          ) : (
            <article
              className="clip-card"
              key={`${clip.src}-${index}`}
              aria-hidden={index >= clipWall.length}
            >
              {card}
            </article>
          );
        })}
      </div>
    </div>
  );
}
