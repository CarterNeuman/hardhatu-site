import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { ResumeGuide } from "@/lib/types";

// Mock-up v2: a quick-scan before/after strip shown above a category's
// resume guides. Left side is the guide's title with a large icon link
// below it (the icon itself is the link into the full guide); right side
// stacks Before above After, built from that guide's own exampleBullets
// (real, copy-and-adapt content already in the schema). The "before" line
// is a deliberately generic, weak placeholder used only as a contrast
// anchor — it isn't attributed to any guide.
const GENERIC_WEAK_BULLET = "Worked on construction sites doing various tasks.";

export function ResumeBeforeAfterStrip({
  guide,
}: {
  guide: Pick<ResumeGuide, "type" | "slug" | "title"> & { exampleBullets: string[] };
}) {
  const after = guide.exampleBullets[0];
  if (!after) return null;

  return (
    <div className="grid grid-cols-1 overflow-hidden border border-hairline sm:grid-cols-[180px_1fr]">
      <div className="flex flex-col items-start gap-3 border-b border-hairline bg-white/30 p-4 sm:border-b-0 sm:border-r">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">{guide.title}</h3>
        <Link
          href={urlFor(guide)}
          aria-label={`Open the ${guide.title} guide`}
          className="text-clay transition-colors hover:text-navy"
        >
          <Icon kind="resume" size={44} />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1.5 bg-white/30 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-steel">Before</span>
          <p className="text-sm leading-snug text-steel line-through decoration-steel/50">
            {GENERIC_WEAK_BULLET}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 border-t border-hairline bg-amber-soft/30 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-amber">After</span>
          <p className="text-sm font-medium leading-snug text-ink">{after}</p>
        </div>
      </div>
    </div>
  );
}
