import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { ExamPrep } from "@/lib/types";

// Mock-up v3: simplified per feedback — every patch is the same shape and
// the same navy accent (no per-category color/shape variation for now).
// Keeps the stitched inner border and faint watermark icon from the
// earlier pass.
const SHIELD_CLIP = "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)";

export function ExamPatchCard({
  exam,
  entryLevel,
}: {
  exam: Pick<ExamPrep, "type" | "slug" | "title" | "examName" | "organization" | "tagline">;
  entryLevel?: boolean;
}) {
  return (
    <Link
      href={urlFor(exam)}
      className="group relative flex flex-col border border-hairline bg-white/40 p-1.5 transition-colors hover:border-navy hover:bg-white/70"
      style={{ clipPath: SHIELD_CLIP }}
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-navy" aria-hidden="true" />
      <Icon
        kind="exam"
        size={44}
        className="pointer-events-none absolute -bottom-2 -right-2 text-navy opacity-[0.08]"
      />
      <div className="relative flex flex-col gap-2 border border-dashed border-ink/15 p-3 pt-4">
        {/* Fixed-height slot whether or not this exam is Entry Level, so
            the gap between the badge row and the title is identical across
            every patch instead of the title shifting up when there's no
            badge to show. */}
        <div className="flex h-[22px] items-center">
          {entryLevel && (
            <span className="inline-block w-fit border border-navy bg-navy/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
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
        {exam.tagline && (
          <p className="line-clamp-2 text-sm leading-snug text-steel">{exam.tagline}</p>
        )}
      </div>
    </Link>
  );
}
