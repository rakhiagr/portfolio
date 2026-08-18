import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        surface: "var(--surface)",
        paper: "var(--paper)",
        muted: "var(--muted)",
        signal: "var(--signal)",
        edge: "var(--edge)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 7vw + 1rem, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-l": ["clamp(2.5rem, 4vw + 1rem, 5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 1.5vw + 1rem, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        body: ["1.0625rem", { lineHeight: "1.55" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        "mono-data": ["0.9375rem", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};

export default config;
