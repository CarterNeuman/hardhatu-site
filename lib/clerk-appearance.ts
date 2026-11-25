// One look for every Clerk form on the site (the /sign-in and /sign-up
// pages and the sign-in pop-ups on gated pages and the quiz result):
// navy buttons, square corners, IBM Plex, a hairline border instead of a
// drop shadow. Applied once on <ClerkProvider> in app/layout.tsx.
const NAVY = "#1F3F52";
const INK = "#1C2B33";
const HAIRLINE = "#D6D0C2";
const PAPER = "#EFEDE6";

export const clerkAppearance = {
  variables: {
    colorPrimary: NAVY,
    colorForeground: INK,
    borderRadius: "0px",
    fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
  },
  elements: {
    cardBox: { border: `1px solid ${HAIRLINE}`, boxShadow: "none" },
    card: { boxShadow: "none" },
    footer: { background: PAPER },
    formButtonPrimary: {
      backgroundColor: NAVY,
      backgroundImage: "none",
      boxShadow: "none",
      "&:hover": { backgroundColor: INK },
    },
    socialButtonsBlockButton: { border: `1px solid ${HAIRLINE}`, boxShadow: "none" },
    formFieldInput: { border: `1px solid ${HAIRLINE}`, boxShadow: "none" },
    modalBackdrop: { backgroundColor: "rgba(28, 43, 51, 0.6)" },
  },
};
