import type { Config } from "tailwindcss";

// Design tokens from build-brief.md, section 9 (Visual design system)
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE6",
        ink: "#1C2B33",
        navy: "#1F3F52",
        // Darkened from #6B7278 so text-steel clears WCAG AA (4.5:1) at
        // normal text sizes on the paper background — it's used as small
        // body/meta text (labels, descriptions) in ~50 places sitewide,
        // and the original only cleared the large-text 3:1 threshold.
        steel: "#656C71",
        hairline: "#D6D0C2",
        // Darkened from #B67F1E so text-amber clears WCAG AA (4.5:1) on
        // paper — it's the default color for in-content wiki-links
        // (Prose.tsx) and several badge labels (TypeBadge), both real
        // body text, and the original only hit 2.97:1. Non-text uses
        // (icon fills, borders, the amber-soft-tinted Premium badge) are
        // unaffected by contrast rules and read fine at this depth too.
        // The one text use on a dark background (the footer logo's "U")
        // switched to amber-soft instead, since this darker amber reads
        // even lower contrast on ink than the original did.
        amber: "#8C6217",
        "amber-soft": "#F1E1BC",
        clay: "#8A4A31",
      },
      fontFamily: {
        display: ["'Big Shoulders Display'", "sans-serif"],
        sans: ["'IBM Plex Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px", // sharp corners per the design system — no rounded SaaS-card look
      },
    },
  },
  plugins: [],
};
export default config;
