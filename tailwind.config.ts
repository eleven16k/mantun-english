import type { Config } from "tailwindcss";

/**
 * Lexi skin — mapped to the verbatim Gizmo token set (globals.css vars).
 * Semantic utilities: bg-app / bg-surface / bg-canvas / text-primary /
 * text-secondary / text-tertiary / border-subtle / bg-brand / text-gold ...
 */
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: "var(--bg-app)",
        surface: "var(--bg-surface)",
        surfaceelevated: "var(--bg-surface-elevated)",
        canvas: "var(--bg-canvas)",
        inverse: "var(--bg-inverse)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        brand: {
          DEFAULT: "var(--bg-brand-emphasis-default)",
          hover: "var(--bg-brand-emphasis-hover)",
          subtle: "var(--bg-brand-subtle-default)",
          text: "var(--text-brand-default)",
        },
        action: "var(--bg-action-emphasis-default)",
        actionhover: "var(--bg-action-emphasis-hover)",
        gold: "var(--text-gold-default)",
        streak: "var(--text-streak-default)",
        hearts: "var(--text-hearts-default)",
        positive: "var(--text-positive-default)",
        critical: "var(--text-critical-default)",
        info: "var(--text-info-default)",
        subtle: "var(--border-subtle)",
        brandborder: "var(--border-brand-default)",
        focus: "var(--border-focus)",
      },
      fontFamily: {
        booster: ["var(--font-booster)", "var(--font-inter)", "sans-serif"],
        heading: ["var(--font-booster)", "var(--font-inter)", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        herocard: "24px",
        pill: "9999px",
      },
      animation: {
        "heart-break": "g-heart-break 0.6s cubic-bezier(0.36,0.07,0.19,0.97) both",
        "reward-float": "g-reward-float 1.1s ease-out forwards",
        "question-enter": "g-question-enter 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
