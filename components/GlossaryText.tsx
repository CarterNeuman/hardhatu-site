// Auto-links construction jargon inside a plain string back to its
// Concept glossary page, for the action-plan day-by-day list (see
// ActionPlanBuilder.tsx) -- a newcomer shouldn't have to already know
// what "HAZWOPER" or "RFI" means to follow their own plan. Deliberately
// scoped to the concept pool already matched to the visitor's chosen
// career/category (GeneratedPlan.glossaryConcepts), not every concept on
// the site, so a short, common-sounding title ("Bid", "Owner") only
// risks matching in a context where it's actually plausible.
import Link from "next/link";
import type { ConceptRef } from "@/lib/action-plan-generator";

type GlossaryEntry = { key: string; concept: ConceptRef };

// Pulls one or two matchable keys out of each concept's title: titles
// written "Short Code (Full Name)" (e.g. "AFCI (Arc-Fault Circuit
// Interrupter)") yield both "AFCI" and "Arc-Fault Circuit Interrupter" as
// independent keys pointing at the same concept, since a visitor could
// plausibly see either form in their own plan's task text. A title with
// no parenthetical just yields itself. Keys are deduped (first concept
// to claim a key wins) and sorted longest-first so "OSHA 10-30 Training"
// is tried before a shorter, more generic "OSHA" would swallow part of
// it.
export function buildGlossaryIndex(concepts: ConceptRef[]): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  const seenKeys = new Set<string>();
  for (const concept of concepts) {
    const parenMatch = concept.title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    const keys = parenMatch ? [parenMatch[1], parenMatch[2]] : [concept.title];
    for (const rawKey of keys) {
      const key = rawKey.trim();
      const lower = key.toLowerCase();
      if (key.length < 3 || seenKeys.has(lower)) continue;
      seenKeys.add(lower);
      entries.push({ key, concept });
    }
  }
  return entries.sort((a, b) => b.key.length - a.key.length);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Renders `text` as plain text with up to `maxLinks` of its first
// matching glossary terms turned into links to their concept page (the
// concept's one-line definition rides along as the link's native title
// attribute -- a free, no-JS hover tooltip). Capped deliberately low: a
// day's task description should read as a sentence, not a wall of
// underlines.
export function GlossaryText({
  text,
  index,
  maxLinks = 2,
}: {
  text: string;
  index: GlossaryEntry[];
  maxLinks?: number;
}) {
  if (index.length === 0 || !text) return <>{text}</>;

  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let linksUsed = 0;
  let keyCounter = 0;

  while (remaining.length > 0 && linksUsed < maxLinks) {
    let best: { at: number; length: number; entry: GlossaryEntry } | null = null;
    for (const entry of index) {
      const re = new RegExp(`\\b${escapeRegExp(entry.key)}\\b`, "i");
      const m = re.exec(remaining);
      if (!m) continue;
      if (!best || m.index < best.at || (m.index === best.at && m[0].length > best.length)) {
        best = { at: m.index, length: m[0].length, entry };
      }
    }
    if (!best) break;

    nodes.push(remaining.slice(0, best.at));
    const matchedText = remaining.slice(best.at, best.at + best.length);
    nodes.push(
      <Link
        key={keyCounter++}
        href={`/concepts/${best.entry.concept.slug}`}
        title={best.entry.concept.definition}
        className="underline decoration-dotted decoration-steel underline-offset-2 hover:decoration-navy"
      >
        {matchedText}
      </Link>
    );
    remaining = remaining.slice(best.at + best.length);
    linksUsed++;
  }
  nodes.push(remaining);
  return <>{nodes}</>;
}
