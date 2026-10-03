import Link from "next/link";
import { Icon } from "./Icon";
import { urlFor } from "@/lib/content-client";
import type { AnyContent } from "@/lib/types";

function ChipLink({ item }: { item: AnyContent }) {
  return (
    <Link
      href={urlFor(item)}
      className="inline-flex items-center gap-1.5 border border-hairline bg-white/60 px-3 py-1.5 text-sm text-ink transition-colors hover:border-navy hover:text-navy"
    >
      <Icon kind={item.type} size={13} />
      {item.title}
    </Link>
  );
}

// The "spiderweb" — every page ends here so no page is a dead end
// (build-brief.md section 1).
//
// `recommended` is the curated subset (content.ts's getRecommended(), from
// the recommendedIds frontmatter field) meant to be the 10-15 most
// relevant connections — shown as the main "Explore next" row. Everything
// in `items` (the full relatedIds list) that isn't in `recommended` goes
// behind a collapsible "See all" section instead of padding out the main
// row, which is what let pages with 40-90+ related items turn into a wall
// of chips. A content type that hasn't been curated yet (recommended is
// empty or omitted) just falls back to the old behavior: show everything
// in the main row, no collapsible section.
export function RelatedLinks({
  items,
  recommended,
}: {
  items: AnyContent[];
  recommended?: AnyContent[];
}) {
  if (items.length === 0) return null;

  const hasCuration = Boolean(recommended && recommended.length > 0);
  const primary = hasCuration ? recommended! : items;
  const primaryIds = new Set(primary.map((item) => item.id));
  const rest = hasCuration ? items.filter((item) => !primaryIds.has(item.id)) : [];

  return (
    <div className="mt-10 border-t border-hairline pt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-steel">
        Explore next
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {primary.map((item) => (
          <ChipLink key={item.id} item={item} />
        ))}
      </div>
      {rest.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-steel hover:text-navy">
            See all {items.length} connections
          </summary>
          <div className="mt-3 flex flex-wrap gap-2">
            {rest.map((item) => (
              <ChipLink key={item.id} item={item} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
