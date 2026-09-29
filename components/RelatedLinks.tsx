import Link from "next/link";
import { Icon } from "./Icon";
import { urlFor } from "@/lib/content-client";
import type { AnyContent } from "@/lib/types";

// The "spiderweb" — every page ends here so no page is a dead end
// (build-brief.md section 1).
export function RelatedLinks({ items }: { items: AnyContent[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-10 border-t border-hairline pt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-steel">
        Explore next
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={urlFor(item)}
            className="inline-flex items-center gap-1.5 border border-hairline bg-white/60 px-3 py-1.5 text-sm text-ink transition-colors hover:border-navy hover:text-navy"
          >
            <Icon kind={item.type} size={13} />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
