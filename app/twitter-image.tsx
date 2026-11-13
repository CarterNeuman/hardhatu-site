import { ImageResponse } from "next/og";

// Twitter Card counterpart to app/opengraph-image.tsx -- same image,
// kept as its own file (Next.js's file-based convention) rather than
// relying on Twitter falling back to the Open Graph image, so the card
// renders correctly even on clients that look for twitter:image
// specifically. See opengraph-image.tsx for the rest of the reasoning
// (no custom webfont, real brand colors).
//
// Deliberately no custom webfont here: next/og (Satori) can't use the
// Google Fonts <link> this site loads for its real pages, and fetching
// a font file over the network at request time is one more thing that
// can fail silently on a social preview nobody's watching render. A
// bold system sans-serif plus the real brand colors reads clearly at
// the small size these previews are actually shown at.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#EFEDE6",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 18, height: 70, backgroundColor: "#8C6217" }} />
          <div style={{ fontSize: 42, fontWeight: 700, color: "#1C2B33", letterSpacing: -1 }}>
            BreakGroundU
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 58,
            fontWeight: 700,
            color: "#1F3F52",
            maxWidth: 950,
            lineHeight: 1.1,
          }}
        >
          Explore construction careers. Learn the industry. Get hired.
        </div>
        <div style={{ marginTop: 30, fontSize: 30, color: "#656C71", maxWidth: 850 }}>
          A free, interconnected guide for anyone new to construction.
        </div>
      </div>
    ),
    { ...size }
  );
}
