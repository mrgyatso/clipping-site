"use client";

import { useState, useSyncExternalStore } from "react";
import { PALETTE_STORAGE_KEY, palettes } from "@/data/palettes";

// A review tool, not a site feature. It shows up automatically in development;
// on a deployed build it stays hidden unless the URL carries ?palette, so a
// preview link can be shared for a decision without exposing the control.
function shouldShow() {
  if (process.env.NODE_ENV === "development") return true;
  return new URLSearchParams(window.location.search).has("palette");
}

// The <html> data attribute is the single source of truth for the active
// palette — the layout's inline script sets it before first paint. Reading it
// through a store keeps that authoritative instead of mirroring it into state.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const readActive = () => document.documentElement.dataset.palette ?? "";
const readActiveOnServer = () => "";
const readVisible = () => shouldShow();
const readVisibleOnServer = () => false;

function apply(id: string | null) {
  if (id) document.documentElement.dataset.palette = id;
  else delete document.documentElement.dataset.palette;
  try {
    if (id) localStorage.setItem(PALETTE_STORAGE_KEY, id);
    else localStorage.removeItem(PALETTE_STORAGE_KEY);
  } catch {
    // Private browsing can refuse storage; the switch still works this session.
  }
  listeners.forEach((notify) => notify());
}

export function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const visible = useSyncExternalStore(
    subscribe,
    readVisible,
    readVisibleOnServer,
  );
  const active = useSyncExternalStore(
    subscribe,
    readActive,
    readActiveOnServer,
  );

  if (!visible) return null;

  return (
    <div className={`palette-switcher${open ? " open" : ""}`}>
      <button
        className="palette-toggle"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span className="palette-toggle-dot" aria-hidden="true" />
        {open ? "Close" : "Palette"}
      </button>

      {open && (
        <div className="palette-panel">
          <p className="palette-title">Try a palette</p>
          <p className="palette-sub">
            Changes the whole site live. Saved in this browser only — visitors
            always get Warm Press.
          </p>
          <ul className="palette-list">
            {palettes.map((option) => {
              const isActive = active === (option.id ?? "");
              return (
                <li key={option.id ?? "default"}>
                  <button
                    className={`palette-option${isActive ? " active" : ""}`}
                    type="button"
                    onClick={() => apply(option.id)}
                    aria-pressed={isActive}
                  >
                    <span className="palette-chips" aria-hidden="true">
                      {option.swatches.map((color) => (
                        <span key={color} style={{ background: color }} />
                      ))}
                    </span>
                    <span className="palette-text">
                      <strong>{option.name}</strong>
                      <small>{option.note}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
