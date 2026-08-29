/**
 * Inline SVG icon replacements for emoji — Gizmo lucide 2px stroke style.
 * Each is a self-contained component taking className for sizing/color.
 */

type IProps = { className?: string; size?: number };

const base = (size: number | undefined, className?: string) => ({
  viewBox: "0 0 24 24",
  width: size ?? 20,
  height: size ?? 20,
  className,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function LightbulbIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.5 1 1.2 1 2V16h6v-.5c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </svg>
  );
}

export function MoonIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function WrenchIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function SnowflakeIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M2 12h20" />
    </svg>
  );
}

export function HeartIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
    </svg>
  );
}

export function HeartFilledIcon({ className, size }: IProps) {
  return (
    <svg viewBox="0 0 24 24" width={size ?? 20} height={size ?? 20} className={className}
      fill="currentColor" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
    </svg>
  );
}

export function FlameIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export function TrophyIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0z" />
    </svg>
  );
}

export function RocketIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function AlertIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  );
}

export function PartyPopperIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5.8 11.3L2 22l10.7-3.79M4 3h.01M22 8h.01M15 2h.01M22 20h.01" />
      <path d="M22 2l-2.24.75L22 5l.5-2.5L22 2zM11 13l1.5 1.5" />
      <path d="M14 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
      <path d="M4 14v.01M17 6l.01 0M21 12l.01 0" />
    </svg>
  );
}

export function MuscleIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M6.5 6.5a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4h3l4.5 3.5V7L9.5 10.5h-3z" />
      <path d="M17.5 6.5a5.5 5.5 0 0 1 0 11H14" />
    </svg>
  );
}

export function GiftIcon({ className, size }: IProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

export function MedalIcon({ className, size, color = "#facc15" }: IProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size ?? 20} height={size ?? 20} className={className}
      fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15L2.66 7.14a.5.5 0 0 1 .43-.74h4.78a1 1 0 0 1 .86.49L12 12l3.27-5.11a1 1 0 0 1 .86-.49h4.78a.5.5 0 0 1 .43.74L16.79 15" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.01" />
    </svg>
  );
}
