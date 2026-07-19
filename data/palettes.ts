// Options for the live palette switcher. The authoritative token values live in
// app/globals.css under [data-palette="…"]; the three swatches here are only for
// the switcher's own preview chips, so keep them in step when a palette changes.
//
// `id` of null is the shipping default declared on :root.

export type PaletteOption = {
  id: string | null;
  name: string;
  note: string;
  swatches: [string, string, string];
};

export const palettes: PaletteOption[] = [
  {
    id: null,
    name: "Warm Press",
    note: "Currently shipping. Cream stock, ink type, hot orange.",
    swatches: ["#11100e", "#f5f0e4", "#f05a28"],
  },
  {
    id: "mono",
    name: "Mono & Sand",
    note: "The one picked on 17 Jul. Near-monochrome, bronze accent.",
    swatches: ["#1c1b17", "#e8e3d6", "#b9a06a"],
  },
  {
    id: "cobalt",
    name: "Ink & Cobalt",
    note: "Cool paper, saturated blue. Reads more software than agency.",
    swatches: ["#0f1420", "#edf0f6", "#2f5fe0"],
  },
  {
    id: "oxblood",
    name: "Paper & Oxblood",
    note: "Warm paper, deep red. The most editorial of the set.",
    swatches: ["#191110", "#f3ece2", "#8c2320"],
  },
  {
    id: "forest",
    name: "Forest & Bone",
    note: "Bone paper, deep green. Calmer, less urgent.",
    swatches: ["#0f1a14", "#edf0e8", "#2f6b46"],
  },
  {
    id: "volt",
    name: "Slate & Volt",
    note: "Slate with the lime the clip cards were born with.",
    swatches: ["#14181d", "#e9edf1", "#c6f24e"],
  },
];

export const PALETTE_STORAGE_KEY = "clipwave-palette";
