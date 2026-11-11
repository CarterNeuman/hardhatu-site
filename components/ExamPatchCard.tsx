import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { ExamPrep } from "@/lib/types";

// Mock-up v2: the "certification wall" treatment for Get Qualified.
// Renders each exam as an embroidered-patch-style badge instead of a plain
// card: a color-coded accent per category, a dashed "stitched" inner
// border, a faint watermark icon, and one of three sharp-cornered patch
// silhouettes (shield point, single notch, double notch) rotating by
// position so a category's patches don't all read as identical shapes.
const ACCENT_STYLES = {
  navy: { bar: "bg-navy", ring: "border-navy", icon: "text-navy" },
  clay: { bar: "bg-clay", ring: "border-clay", icon: "text-clay" },
  amber: { bar: "bg-amber", ring: "border-amber", icon: "text-amber" },
  steel: { bar: "bg-steel", ring: "border-steel", icon: "text-steel" },
} as const;

export type PatchAccent = keyof typeof ACCENT_STYLES;

const SHAPES = [
  // Shield: pointed bottom
  "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
  // Single notch: top-right corner cut
  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
  // Double notch: both top corners cut
  "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%, 0 14px)",
] as const;

export function ExamPatchCard({
  exam,
  accent,
  shapeIndex = 0,
  entryLevel,
}: {
  exam: Pick<ExamPrep, "type" | "slug" | "title" | "examName" | "organization" | "tagline">;
  accent: PatchAccent;
  shapeIndex?: number;
  entryLevel?: boolean;
}) {
  const styles = ACCENT_STYLES[accent];
  const clipPath = SHAPES[shapeIndex % SHAPES.length];

  return (
    <Link
      href={urlFor(exam)}
      className="group relative flex flex-col border border-hairline bg-white/40 p-1.5 transition-colors hover:border-navy hover:bg-white/70"
      style={{ clipPath }}
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 ${styles.bar}`} aria-hidden="true" />
      <Icon
        kind="exam"
        size={44}
        className={`pointer-events-none absolute -bottom-2 -right-2 opacity-[0.08] ${styles.icon}`}
      />
      <div className="relative flex flex-col gap-2 border border-dashed border-ink/15 p-3 pt-4">
        {entryLevel && (
          <span className="inline-block w-fit border border-navy bg-navy/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
            Entry Level
          </span>
        )}
        <h3 className="break-words font-display text-base font-semibold leading-snug text-ink group-hover:text-navy">
          {exam.examName ?? exam.title}
        </h3>
        {exam.organization && (
          <p className="text-[11px] font-semibold uppercase tracking-wide text-clay">
            {exam.organization}
          </p>
        )}
        {exam.tagline && (
          <p className="line-clamp-2 text-sm leading-snug text-steel">{exam.tagline}</p>
        )}
      </div>
    </Link>
  );
}
