import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import type { ExamPrep } from "@/lib/types";

// Mock-up: the "certification wall" treatment for Get Qualified. Renders
// each exam as a patch/badge instead of a plain card, color-coded per
// category (the accent color is chosen once per category section and
// passed down, so every patch in a section matches). Shape stays
// sharp-cornered per the site's no-rounded-corners rule — the "shield"
// read comes from the notched bottom edge (clip-path), not from rounding.
const ACCENT_STYLES = {
  navy: { bar: "bg-navy", ring: "border-navy", chip: "bg-navy text-paper" },
  clay: { bar: "bg-clay", ring: "border-clay", chip: "bg-clay text-paper" },
  amber: { bar: "bg-amber", ring: "border-amber", chip: "bg-amber-soft text-amber" },
  steel: { bar: "bg-steel", ring: "border-steel", chip: "border border-steel text-steel" },
} as const;

export type PatchAccent = keyof typeof ACCENT_STYLES;

export function ExamPatchCard({
  exam,
  accent,
  entryLevel,
}: {
  exam: Pick<ExamPrep, "type" | "slug" | "title" | "examName" | "organization" | "tagline">;
  accent: PatchAccent;
  entryLevel?: boolean;
}) {
  const styles = ACCENT_STYLES[accent];

  return (
    <Link
      href={urlFor(exam)}
      className="group relative flex flex-col gap-2 border border-hairline bg-white/40 p-4 pt-5 transition-colors hover:border-navy hover:bg-white/70"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)" }}
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 ${styles.bar}`} aria-hidden="true" />
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center border-2 text-[11px] font-bold ${styles.ring} text-ink`}
          aria-hidden="true"
        >
          {(exam.examName ?? exam.title).slice(0, 1)}
        </span>
        {entryLevel && (
          <span className="inline-block border border-navy bg-navy/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
            Entry Level
          </span>
        )}
      </div>
      <h3 className="break-words font-display text-base font-semibold leading-snug text-ink group-hover:text-navy">
        {exam.examName ?? exam.title}
      </h3>
      {exam.organization && (
        <p className="text-[11px] font-semibold uppercase tracking-wide text-clay">
          {exam.organization}
        </p>
      )}
      {exam.tagline && <p className="line-clamp-2 text-sm leading-snug text-steel">{exam.tagline}</p>}
    </Link>
  );
}
