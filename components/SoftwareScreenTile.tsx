import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { Software } from "@/lib/types";

// The "on-screen" icon tile used inside SoftwareDeskIntro's CRT frame.
// Deliberately NOT built on top of ContentCard — that card assumes the
// paper/white listing-page look, and this needs the dark, amber-glow
// phosphor treatment to read as something glowing on a screen. amber-soft
// (not amber) is used for text/icons here on purpose: this codebase's own
// design tokens note that the darker `amber` fails contrast on dark
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
      className="group flex flex-col items-center gap-1.5 border border-amber-soft/15 bg-white/5 p-3 text-center transition-colors hover:border-amber-soft/50 hover:bg-white/10"
    >
      <Icon kind="software" size={28} className="text-amber-soft" />
      <h3 className="break-words font-display text-sm font-semibold leading-snug text-amber-soft">
        {tool.title}
      </h3>
      {description && (
        <p className="line-clamp-2 text-xs leading-snug text-paper/60">{description}</p>
      )}
    </Link>
  );
}
