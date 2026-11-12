// A real jobsite photo, or (for careers with no good photo match) a
// construction-themed line-art icon, styled to match the site's
// hairline-border, sharp-corner house style (no rounded-SaaS look). Used
// on career/concept detail pages right after the lead paragraph.
//
// Real photos use a fixed aspect-ratio box with object-fit: cover so the
// varied source photos sit consistently regardless of their original crop.
// Line-art icons (any src ending in .svg) get a different treatment:
// object-fit: contain on a tinted background, centered with padding, so a
// schematic icon doesn't get stretched or cropped like a photo would be --
// it's meant to read clearly as "icon standing in for a photo", not as an
// oddly-cropped picture.
export function ContentPhoto({ src, alt }: { src: string; alt: string }) {
  const isLineArt = src.endsWith(".svg");
  return (
    <div
      className={`mt-5 aspect-[3/2] w-full overflow-hidden border border-hairline ${
        isLineArt ? "bg-amber-soft/40 p-8" : "bg-steel/10"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={isLineArt ? "h-full w-full object-contain" : "h-full w-full object-cover"}
        loading="lazy"
      />
    </div>
  );
}
