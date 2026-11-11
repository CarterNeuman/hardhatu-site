import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import type { ResumeGuide } from "@/lib/types";

// Mock-up: a quick-scan "before/after" strip shown above a category's
// resume guides, built from that guide's own exampleBullets (real,
// copy-and-adapt content already in the schema) rather than inventing new
// copy. The "before" side is a deliberately generic, weak placeholder line
// used only as a contrast anchor — it isn't attributed to any guide.
const GENERIC_WEAK_BULLET = "Worked on construction sites doing various tasks.";

export function ResumeBeforeAfterStrip({
  guide,
}: {
  guide: Pick<ResumeGuide, "type" | "slug" | "title"> & { exampleBullets: string[] };
}) {
  const after = guide.exampleBullets[0];
  if (!after) return null;

  return (
    <div className="grid grid-cols-1 overflow-hidden border border-hairline sm:grid-cols-2">
      <div className="flex flex-col gap-1.5 bg-white/30 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-steel">Before</span>
        <p className="text-sm leading-snug text-steel line-through decoration-steel/50">
          {GENERIC_WEAK_BULLET}
        </p>
      </div>
      <div className="flex flex-col gap-1.5 border-t border-hairline bg-amber-soft/30 p-4 sm:border-l sm:border-t-0">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-amber">After</span>
        <p className="text-sm font-medium leading-snug text-ink">{after}</p>
        <Link
          href={urlFor(guide)}
          className="mt-1 text-xs font-semibold text-navy underline-offset-2 hover:underline"
        >
          See the full {guide.title} guide →
        </Link>
      </div>
    </div>
  );
}
