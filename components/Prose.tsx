import Link from "next/link";
import { getAllContent, urlFor } from "@/lib/content";
import type { AnyContent } from "@/lib/types";

// Renders a plain-text field as separate paragraphs, split on blank lines.
// Frontmatter fields are stored as one string (YAML block scalars don't
// have a "list of paragraphs" type), so this is what keeps a long field
// from rendering as one dense wall of text.
//
// It also understands a lightweight wiki-link syntax inside that text —
// [[concept-change-order]] or [[concept-change-order|change order]] — and
// turns it into a real link to that content's page. This is what lets a
// lesson's narrative example mention "the change order" and have it be
// clickable right there, instead of only surfacing related pages in a list
// at the bottom. Any content id works, not just concepts (careers, phases,
// etc.), but concepts are the common case. See scripts/validate-content.mjs
// for the build-time check that every [[id]] actually resolves.
const WIKI_LINK = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

function renderParagraph(text: string, byId: Map<string, AnyContent>) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  WIKI_LINK.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = WIKI_LINK.exec(text)) !== null) {
    const [full, id, label] = match;
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const target = byId.get(id);
    if (target) {
      nodes.push(
        <Link
          key={key++}
          href={urlFor(target)}
          className="text-amber underline decoration-amber/40 underline-offset-2 transition-colors hover:text-clay hover:decoration-clay"
        >
          {label || target.title}
        </Link>
      );
    } else {
      // Unresolved id — fall back to plain text so a bad reference doesn't
      // break the page in production. validate-content.mjs catches this
      // at build time so it should never actually ship.
      nodes.push(label || id);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function Prose({ text }: { text: string }) {
  const { byId } = getAllContent();
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mt-2 space-y-4 leading-relaxed text-ink">
      {paragraphs.map((p, i) => (
        <p key={i}>{renderParagraph(p, byId)}</p>
      ))}
    </div>
  );
}
