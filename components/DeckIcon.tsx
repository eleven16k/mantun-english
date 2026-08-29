/**
 * Deck icon set — 12 curated line-style SVGs (24×24, stroke-based to match
 * the app's icon language) + a 6-color palette. Students pick one of each
 * when creating a deck; the choice is stored on the UserDeck.
 */
export interface DeckIconDef {
  id: string;
  paths: string[];
}

export const DECK_ICONS: DeckIconDef[] = [
  { id: "book", paths: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"] },
  { id: "star", paths: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"] },
  { id: "flame", paths: ["M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"] },
  { id: "bolt", paths: ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"] },
  { id: "trophy", paths: ["M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"] },
  { id: "globe", paths: ["M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"] },
  { id: "cap", paths: ["M22 10 12 5 2 10l10 5 10-5z", "M6 12v5c3 3 9 3 12 0v-5"] },
  { id: "music", paths: ["M9 18V5l12-2v13", "M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", "M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"] },
  { id: "pencil", paths: ["M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"] },
  { id: "lightbulb", paths: ["M15 14c.2-1 .7-1.7 1.5-2.5A5.5 5.5 0 1 0 7 5.5c0 1 .3 2 .9 2.8.5.7 1.1 1.3 1.4 2.2", "M9 18h6", "M10 22h4"] },
  { id: "heart", paths: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"] },
  { id: "rocket", paths: ["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"] },
];

export const DECK_COLORS = ["#7c3aed", "#2563eb", "#16a34a", "#f59e0b", "#ec4899", "#06b6d4"];

export function getDeckIcon(id: string | undefined): DeckIconDef {
  return DECK_ICONS.find((i) => i.id === id) ?? DECK_ICONS[0];
}

/** Rounded tile rendering a deck's chosen icon + color (deck-card style). */
export function DeckIcon({
  icon,
  color,
  size = 32,
}: {
  icon?: string;
  color?: string;
  size?: number;
}) {
  const def = getDeckIcon(icon);
  const bg = color ?? "#7c3aed";
  const iconSize = Math.round(size / 2);
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl text-white"
      style={{ background: bg, height: size, width: size }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{ height: iconSize, width: iconSize }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {def.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    </span>
  );
}
