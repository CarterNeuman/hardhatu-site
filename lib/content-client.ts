// Client-safe content utilities: pure functions that only operate on data
// already passed in, with no filesystem access. Anything here can be
// imported from a "use client" component (Header.tsx does) without pulling
// `fs`/`path`/`gray-matter` into the browser bundle — see the comment in
// content-registry.ts for why that matters. lib/content.ts re-exports all
// of these so existing server-side imports of "@/lib/content" keep working
// unchanged; only client components need to import from this file directly.
import { CONTENT_TYPE_DIR } from "./content-registry";
import {
  CAREER_CATEGORY_ORDER,
  CONCEPT_CATEGORY_ORDER,
  type AnyContent,
  type Career,
  type Concept,
  type InterviewPrep,
  type ExamPrep,
} from "./types";

export function urlFor(node: Pick<AnyContent, "type" | "slug">): string {
  return `/${CONTENT_TYPE_DIR[node.type]}/${node.slug}`;
}

// Fallback slug for a category group that isn't one of the 8 known career
// categories (e.g. the "General" bucket interviews/exams without a
// category land in) — CATEGORY_SLUG in Header.tsx covers the known 8.
export function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Strips the [[id]] / [[id|label]] wiki-link syntax down to plain text —
// used for index-page preview snippets, where a raw [[concept-x|label]]
// would otherwise leak into a plain (non-Prose) <p>.
export function stripWikiLinks(text: string): string {
  return text.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_match, id, label) => label || id);
}

// Groups careers by their category (Field & Trades, Insurance & Claims,
// etc. — see content-inventory.md) in a consistent display order, so the
// career listing reads as organized sections rather than one flat list.
// A category not in CAREER_CATEGORY_ORDER still shows up, just sorted
// alphabetically after the known ones instead of being dropped.
export function groupCareersByCategory(
  items: AnyContent[]
): { category: string; items: Career[] }[] {
  const careers = items as Career[];
  const groups = new Map<string, Career[]>();
  for (const career of careers) {
    const list = groups.get(career.category) ?? [];
    list.push(career);
    groups.set(career.category, list);
  }
  const known = CAREER_CATEGORY_ORDER.filter((c) => groups.has(c));
  const unknown = [...groups.keys()].filter((c) => !known.includes(c)).sort();
  return [...known, ...unknown].map((category) => ({
    category,
    items: groups.get(category)!,
  }));
}

// Same idea for interview guides: the 8 category-specific guides get
// grouped in the same order as careers (so "Field & Trades" always means
// the same set of careers everywhere on the site), and the 2 guides with
// no `category` (general/career-changer) land in their own "General" group
// up front rather than being dropped.
export function groupInterviewsByCategory(
  items: AnyContent[]
): { category: string; items: InterviewPrep[] }[] {
  const interviews = items as InterviewPrep[];
  const general = interviews.filter((i) => !i.category);
  const categorized = interviews.filter((i) => i.category);

  const groups = new Map<string, InterviewPrep[]>();
  for (const interview of categorized) {
    const list = groups.get(interview.category!) ?? [];
    list.push(interview);
    groups.set(interview.category!, list);
  }
  const known = CAREER_CATEGORY_ORDER.filter((c) => groups.has(c));
  const unknown = [...groups.keys()].filter((c) => !known.includes(c)).sort();

  const result = known.concat(unknown).map((category) => ({
    category,
    items: groups.get(category)!,
  }));

  return general.length > 0 ? [{ category: "General", items: general }, ...result] : result;
}

// Exam Prep also carries the same category strings (a handful of the 8,
// not all — not every category has a certification exam tied to it yet).
// Anything with no category lands in its own group rather than vanishing.
export function groupExamsByCategory(
  items: AnyContent[]
): { category: string; items: ExamPrep[] }[] {
  const exams = items as ExamPrep[];
  const uncategorized = exams.filter((e) => !e.category);
  const categorized = exams.filter((e) => e.category);

  const groups = new Map<string, ExamPrep[]>();
  for (const exam of categorized) {
    const list = groups.get(exam.category!) ?? [];
    list.push(exam);
    groups.set(exam.category!, list);
  }
  const known = CAREER_CATEGORY_ORDER.filter((c) => groups.has(c));
  const unknown = [...groups.keys()].filter((c) => !known.includes(c)).sort();

  const result = known.concat(unknown).map((category) => ({
    category,
    items: groups.get(category)!,
  }));

  return uncategorized.length > 0
    ? [...result, { category: "General", items: uncategorized }]
    : result;
}

// Groups the concept glossary by its 6 CONCEPT_CATEGORY_ORDER buckets
// (Project Process & Lifecycle, Contracts & Business, Materials & Systems,
// Insurance & Restoration, Safety & Regulatory Compliance, Technology,
// Data & Sustainability — see content-inventory.md). Items within a group
// are alphabetized so the category view reads as a glossary, not
// insertion order. Every concept is required to have a category (schema-
// enforced), so there's no "General" fallback bucket needed here the way
// interviews/exams have one for their optional category field.
export function groupConceptsByCategory(
  items: AnyContent[]
): { category: string; items: Concept[] }[] {
  const concepts = items as Concept[];
  const groups = new Map<string, Concept[]>();
  for (const concept of concepts) {
    const list = groups.get(concept.category) ?? [];
    list.push(concept);
    groups.set(concept.category, list);
  }
  const known = CONCEPT_CATEGORY_ORDER.filter((c) => groups.has(c));
  const unknown = [...groups.keys()].filter((c) => !known.includes(c)).sort();
  return [...known, ...unknown].map((category) => ({
    category,
    items: groups.get(category)!.slice().sort((a, b) => a.title.localeCompare(b.title)),
  }));
}
