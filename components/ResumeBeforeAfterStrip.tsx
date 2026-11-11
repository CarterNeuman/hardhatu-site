import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { ResumeGuide } from "@/lib/types";

// Mock-up v3: dropped the repeated guide title (it's redundant — the same
// title already sits right below on the guide's own card), leaving just a
// centered icon-link in a narrower column so the whole strip takes up less
// space. Before/after padding tightened for the same reason.
const GENERIC_WEAK_BULLET = "Worked on construction sites doing various tasks.";

export function ResumeBeforeAfterStrip({
  guide,
}: {
  guide: Pick<ResumeGuide, "type" | "slug" | "title"> & { exampleBullets: string[] };
}) {
  const after = guide.exampleBullets[0];
  if (!after) return null;

  return (
    <div className="grid grid-cols-1 overflow-hidden border border-hairline sm:grid-cols-[88px_1fr]">
      <Link
        href={urlFor(guide)}
        aria-label={`Open the ${guide.title} guide`}
        className="flex items-center justify-center border-b border-hairline bg-white/30 p-3 text-clay transition-colors hover:text-navy sm:border-b-0 sm:border-r"
      >
        <Icon kind="resume" size={44} />
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1 bg-white/30 p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-steel">Before</span>
          <p className="text-sm leading-snug text-steel line-through decoration-steel/50">
            {GENERIC_WEAK_BULLET}
          </p>
        </div>
        <div className="flex flex-col gap-1 border-t border-hairline bg-amber-soft/30 p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-amber">After</span>
          <p className="text-sm font-medium leading-snug text-ink">{after}</p>
        </div>
      </div>
    </div>
  );
}
