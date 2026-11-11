import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import type { Software } from "@/lib/types";

// The "on-screen" tile used inside SoftwareDeskIntro's CRT frame. No icon —
// just the tool's name, large, the way a desktop shortcut's label is the
// main thing you read. Nothing here is line-clamped: the box grows to fit
// whatever the title/description actually need instead of cutting text off.
// amber-soft (not amber) is used for text here on purpose: this codebase's
// own design tokens note that the darker `amber` fails contrast on dark
// backgrounds, which is exactly the situation here.
export function SoftwareScreenTile({
  tool,
  description,
}: {
  tool: Pick<Software, "type" | "slug" | "title">;
  description?: string;
}) {
  return (
    <Link
      href={urlFor(tool)}
      className="group flex flex-col items-center gap-1.5 border border-amber-soft/15 bg-white/5 p-4 text-center transition-colors hover:border-amber-soft/50 hover:bg-white/10"
    >
      <h3 className="break-words font-display text-lg font-bold leading-snug text-amber-soft sm:text-xl">
        {tool.title}
      </h3>
      {description && (
        <p className="text-xs leading-snug text-paper/60">{description}</p>
      )}
    </Link>
  );
}
