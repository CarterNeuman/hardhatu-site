import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { ResumeGuide } from "@/lib/types";

// Mock-up v4: one merged card instead of a separate icon-only strip above
// a duplicate guide card. The left side IS the guide's normal card (icon,
// title, tagline — same as every other ContentCard in the grid), and the
// before/after panel is attached directly to its right, stacked
// (Before above After). This resume no longer also appears as a plain
// ContentCard elsewhere in the grid — this card replaces that slot.
const GENERIC_WEAK_BULLET = "Worked on construction sites doing various tasks.";

export function ResumeBeforeAfterStrip({
  guide,
}: {
  guide: Pick<ResumeGuide, "type" | "slug" | "title"> & { exampleBullets: string[]; tagline?: string };
}) {
  const after = guide.exampleBullets[0];
  if (!after) return null;

  return (
    <div className="grid grid-cols-1 overflow-hidden border border-hairline sm:grid-cols-2">
      <Link
        href={urlFor(guide)}
        className="group flex flex-col gap-2 border-b border-hairline bg-white/40 p-4 transition-colors hover:border-navy hover:bg-white/70 sm:border-b-0 sm:border-r"
      >
        <Icon kind="resume" size={32} className="text-clay" />
        <h3 className="break-words font-display text-base font-semibold leading-snug text-ink group-hover:text-navy">
          {guide.title}
        </h3>
        {guide.tagline && (
          <p className="line-clamp-3 text-sm leading-snug text-steel">{guide.tagline}</p>
        )}
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col gap-1 bg-white/30 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-steel">Before</span>
          <p className="text-sm leading-snug text-steel line-through decoration-steel/50">
            {GENERIC_WEAK_BULLET}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-1 border-t border-hairline bg-amber-soft/30 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-amber">After</span>
          <p className="text-sm font-medium leading-snug text-ink">{after}</p>
        </div>
      </div>
    </div>
  );
}
