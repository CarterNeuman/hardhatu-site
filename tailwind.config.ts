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
        steel: "#6B7278",
        hairline: "#D6D0C2",
        amber: "#B67F1E",
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
