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
  type ResumeGuide,
} from "./types";

// URL-anchor slug for each of the 8 career categories (/careers#<slug>
// and the matching section ids on the index pages).
//
// Lives here, NOT in components/Header.tsx where it used to be: Header
// is a "use client" module, and a plain value exported from a client
// module is only a reference when a Server Component imports it --
// indexing into it on the server quietly yields undefined. That's how
// the homepage's "Choose your path" tiles ended up linking to
// /careers#undefined and the footer's category links to a bare
// /careers# (found in the 2026-11-11 bug sweep). Anything a server
// file needs must be imported from a shared module like this one.
export const CATEGORY_SLUG: Record<string, string> = {
  "Field & Trades": "field-trades",
  "Project & Operations": "project-operations",
  "Preconstruction & Estimating": "preconstruction-estimating",
  Business: "business",
  "Technology & Design": "technology-design",
  "Specialized Construction": "specialized-construction",
  "Insurance & Claims": "insurance-claims",
  "Consultants & Advisory": "consultants-advisory",
};

// Quiz v2: which scoped category quiz (content/quizzes/*-match.md,
// CareerMatchQuizSchema's `category` field) belongs to each of the 8
// career categories. Shared here, the same reason as CATEGORY_SLUG
// above, since both a server page (the Get Hired hub) and a client
// component (CareerMatchQuiz's own "narrow it down further" link) need
// the same mapping.
export const CATEGORY_QUIZ_SLUG: Record<string, string> = {
  "Field & Trades": "field-trades-match",
  "Project & Operations": "project-operations-match",
  "Preconstruction & Estimating": "preconstruction-estimating-match",
  Business: "business-match",
  "Technology & Design": "technology-design-match",
  "Specialized Construction": "specialized-construction-match",
  "Insurance & Claims": "insurance-claims-match",
  "Consultants & Advisory": "consultants-advisory-match",
};

// How many items per category the header's dropdowns show. Shared (same
// reason as above) because app/layout.tsx, a Server Component, uses it
// to slim the nav data before handing it to the client Header.
export const NAV_ITEMS_PER_GROUP = 3;

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

// Resume Guide carries the same optional category as Interview Prep, one
// guide per career umbrella today, with room for a future general or
// career-specific guide to land in its own "General" bucket the same way
// Interview Prep's general/career-changer guides do.
export function groupResumesByCategory(
  items: AnyContent[]
): { category: string; items: ResumeGuide[] }[] {
  const resumes = items as ResumeGuide[];
  const general = resumes.filter((r) => !r.category);
  const categorized = resumes.filter((r) => r.category);

  const groups = new Map<string, ResumeGuide[]>();
  for (const resume of categorized) {
    const list = groups.get(resume.category!) ?? [];
    list.push(resume);
    groups.set(resume.category!, list);
  }
  const known = CAREER_CATEGORY_ORDER.filter((c) => groups.has(c));
  const unknown = [...groups.keys()].filter((c) => !known.includes(c)).sort();

  const result = known.concat(unknown).map((category) => ({
    category,
    items: groups.get(category)!,
  }));

  return general.length > 0 ? [{ category: "General", items: general }, ...result] : result;
}

// Get Qualified also carries the same category strings (a handful of the 8,
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

// Matches a career's free-text `software` entries ("Bluebeam", "Scheduling
// software (e.g. Primavera P6, Microsoft Project)") against the site's
// real Software profiles. Career pages store software as display names,
// not ids, so this is the one place that turns a name into a link --
// used by the career page's Software tags and by the Action Plan data
// layer (which previously looked these up as ids and so never matched
// anything). Whole-word, case-insensitive; a profile matches when its
// title, or its title minus a vendor prefix/suffix ("Autodesk Revit" ->
// "Revit", "Bluebeam Revu" -> "Bluebeam"), appears in the entry.
function softwareAliases(title: string): string[] {
  const aliases = new Set<string>();
  const base = title.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  if (base) aliases.add(base);
  const paren = title.match(/\(formerly ([^)]+)\)/i);
  if (paren) aliases.add(paren[1].toLowerCase().trim());
  if (base.startsWith("autodesk ")) {
    const rest = base.slice("autodesk ".length);
    // "Autodesk Build" minus the vendor is just "build" -- far too generic
    // to match on its own.
    if (rest !== "build") aliases.add(rest);
  }
  if (base.endsWith(" revu")) aliases.add(base.slice(0, -" revu".length));
  return [...aliases].filter((a) => a.length >= 4);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchSoftwareByName<T extends { title: string }>(name: string, software: T[]): T[] {
  const haystack = name.toLowerCase();
  return software.filter((sw) =>
    softwareAliases(sw.title).some((alias) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(alias)}($|[^a-z0-9])`).test(haystack))
  );
}
