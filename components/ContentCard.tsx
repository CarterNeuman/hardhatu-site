import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { Icon } from "./Icon";
import type { AnyContent } from "@/lib/types";

// The card used on every index/listing page (careers, concepts, lessons,
// etc.) — kept generic and given the description as a prop rather than
// reading a type-specific field itself, since "tagline" / "definition" /
// "whatItIs" differ by content type.
export function ContentCard({ item, description }: { item: AnyContent; description?: string }) {
  return (
    <Link
      href={urlFor(item)}
      className="group flex flex-col gap-2 border border-hairline bg-white/40 p-4 transition-colors hover:border-navy hover:bg-white/70"
    >
      <Icon kind={item.type} size={16} className="text-clay" />
      <h3 className="break-words font-display text-base font-semibold leading-snug text-ink group-hover:text-navy">
        {item.title}
      </h3>
      {description && (
        <p className="line-clamp-3 text-sm leading-snug text-steel">{description}</p>
      )}
    </Link>
  );
}
