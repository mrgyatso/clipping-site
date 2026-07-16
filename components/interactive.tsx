"use client";

import { useEffect, useState } from "react";
import { guideTabs, siteConfig } from "@/data/site";

declare global {
  interface Window {
    Cal?: CalApi & { ns?: Record<string, CalApi> };
  }
}

type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

export function RotatingWord() {
  const words = ["Viral", "Massive", "Global"];
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"" | "out" | "in">("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setPhase("in");
        window.setTimeout(() => setPhase(""), 520);
      }, 400);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [words.length]);

  return <span className={`rot-word ${phase}`}>{words[index]}</span>;
}

export function RevealManager() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

export function GuideTabs() {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Campaign narrative">
        {guideTabs.map((tab, index) => (
          <button
            className={`tab ${active === index ? "active" : ""}`}
            id={`guide-tab-${index}`}
            key={tab.label}
            role="tab"
            aria-controls={`guide-panel-${index}`}
            aria-selected={active === index}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panels">
        {guideTabs.map((tab, index) => (
          <div
            className={`tab-panel ${active === index ? "active" : ""}`}
            id={`guide-panel-${index}`}
            key={tab.label}
            role="tabpanel"
            aria-labelledby={`guide-tab-${index}`}
            hidden={active !== index}
          >
            <span className="eyebrow-icon">{tab.eyebrow}</span>
            <p>{tab.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function CalEmbed() {
  useEffect(() => {
    const C = window;
    const A = "https://app.cal.com/embed/embed.js";
    const L = "init";
    const push = (api: CalApi, args: IArguments | unknown[]) => {
      api.q = api.q || [];
      api.q.push(args);
    };

    C.Cal =
      C.Cal ||
      function (...args: unknown[]) {
        const cal = C.Cal as CalApi & { ns: Record<string, CalApi> };
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = document.createElement("script");
          script.src = A;
          document.head.appendChild(script);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const namespace = args[1];
          const api: CalApi = function (...apiArgs: unknown[]) {
            push(api, apiArgs);
          };
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            push(cal.ns[namespace], args);
            push(cal, ["initNamespace", namespace]);
          } else {
            push(cal, args);
          }
          return;
        }
        push(cal, args);
      };

    C.Cal("init", "book", { origin: "https://app.cal.com" });
    C.Cal.ns?.book("inline", {
      elementOrSelector: "#cal-embed",
      config: { layout: "month_view", theme: "light" },
      calLink: siteConfig.calLink,
    });
    C.Cal.ns?.book("ui", {
      theme: "light",
      hideEventTypeDetails: true,
      layout: "month_view",
      styles: { branding: { brandColor: "#f05a28" } },
    });
  }, []);

  return (
    <div id="cal-embed" className="cal-embed">
      <div className="cal-skel" aria-hidden="true">
        <span className="sk sk-title" />
        <span className="sk sk-grid" />
        <span className="sk sk-line" />
      </div>
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`to-top glass-chip ${visible ? "show" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
