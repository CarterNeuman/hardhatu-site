// A real jobsite photo, styled to match the site's hairline-border,
// sharp-corner house style (no rounded-SaaS look). Used on career/concept
// detail pages right after the lead paragraph. Fixed aspect-ratio box with
// object-fit: cover so the varied source photos sit consistently regardless
// of their original crop.
export function ContentPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-5 aspect-[3/2] w-full overflow-hidden border border-hairline bg-steel/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}
