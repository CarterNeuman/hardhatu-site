// Pure generation logic for the action-plan feature (see
// lib/types.ts's ActionPlanSchema and the premium-action-plan-feasibility
// project notes). Takes an authored skeleton plus one visitor's intake
// answers and produces the concrete, dated plan a result screen renders.
// No fs, no network, no accounts -- this runs entirely in the browser, on
// purpose, per the build-sequencing decision to ship the generator itself
// before any accounts/database/payments work starts.
import type { ActionPlan, GetHired, ResumeGuide } from "./types";

// Minimal shapes, not the full Lesson/Career content types -- the
// component feeding this only has (and only needs to ship to the
// browser) a slim id/slug/title projection, not full lesson bodies or
// career content. Structurally compatible with the real types, so a
// server component can still pass a slimmed-down Lesson/Career straight
// through without any casting.
export type LessonRef = { id: string; slug: string; title: string; minutes: number };
export type SoftwareRef = { id: string; slug: string; title: string; whatItIs: string };
export type CareerRef = {
  id: string;
  title: string;
  slug: string;
  // Entry-level pay for this specific career, carried straight through
  // from the career page's own already-sourced payTimeline.entry (see
  // CareerSchema in lib/types.ts) -- never a new or separately-looked-up
  // figure. Undefined for a career with no payTimeline authored yet.
  entryPay?: { low: number; high: number; unit: "annual" | "hourly"; source: string; asOf: string };
  // Carried straight through from the career's own `isEntryRole` field
  // (see CareerSchema in lib/types.ts). Drives whether the result
  // screen's "what you can expect to earn" section frames entryPay as
  // day-one pay or as the lower end of a role normally reached through
  // promotion -- same reasoning as PayTimeline's label switch.
  isEntryRole?: boolean;
};
// A slim Concept projection -- just enough to link to it and show why it's
// worth knowing (definition), same spirit as LessonRef. Used both for the
// "Go further" recommendations and (on the component side) for linking
// jargon in the day-by-day text back to its concept page.
export type ConceptRef = { id: string; slug: string; title: string; definition: string };
// A slim Program projection -- just enough to link to it and show why
// it's worth checking out (org, type, cost/duration), same spirit as
// LessonRef/ConceptRef above.
export type ProgramRef = {
  id: string;
  slug: string;
  title: string;
  organization: string;
  programType: string;
  costNote?: string;
  durationNote?: string;
};

// One site page (or one section of the plan itself) a step points at.
// Every step on the calendar can carry a few of these, so "use the
// Resume Guide" is a link to the Resume Guide rather than a suggestion
// to go find it. `kind` only drives the small label/icon the result
// screen shows next to the link.
export type ResourceKind =
  | "career"
  | "lesson"
  | "software"
  | "examPrep"
  | "program"
  | "concept"
  | "guide"
  | "section";
export type PlanResource = { label: string; href: string; kind: ResourceKind };
// A real Exam Prep guide on the site, by title -- used both for the
// practice-question task and to give each "pursue another certification"
// round a specific credential to point at.
// `entryLevel` mirrors the "Entry Level" badge on the exam index: a
// credential someone can earn before (or right as) they start, as
// opposed to one that takes years in the trade to sit for.
export type ExamRef = { title: string; href: string; entryLevel?: boolean };

export type ApplicationStatus = "browsing" | "applying";

// Both free-text fields below are untrusted visitor input: never echoed
// back as HTML (React escapes all text content, and neither field is ever
// rendered with dangerouslySetInnerHTML), never used as a regex or SQL
// pattern, and capped at the UI layer (ActionPlanBuilder's maxLength) so a
// pathological paste can't bloat the page. certsHeld specifically is only
// ever read, never displayed back verbatim, so garbage or foul language
// typed there has no visible effect beyond possibly matching (or not
// matching) a credential below -- see labelLooksHeld. location IS echoed,
// into the outreach templates and the job-board search links, since it's
// meant to personalize an outbound message the visitor will read and
// edit before sending; it's inserted as plain text (job-board links
// additionally run it through encodeURIComponent), never interpreted.
export type ActionPlanIntake = {
  category: string;
  careerId?: string;
  status: ApplicationStatus;
  location: string;
  hoursPerWeek: number;
  timelineWeeks: number;
  // Free-text, comma or newline separated -- matched against each
  // credential's own short name (see extractCoreLabel/labelLooksHeld)
  // rather than forced into a fixed checklist, since real credential
  // names vary (an "OSHA 10" card might get typed "osha-10" or "OSHA
  // ten"). Deliberately tolerant of anything, including nonsense or
  // profanity: worst case a credential is marked "still need" that the
  // visitor actually has, never a crash and never the input echoed back.
  certsHeld: string;
};

export type GeneratedDayItem = {
  // Stable identity for this step within its plan, built from what the
  // step IS (its authored title, or the lesson/software/exam it points
  // at, plus a round number for a repeating step) rather than from its
  // position in the list. Checked-off progress is saved under this key
  // (see ActionPlanBuilder's toggleDay), so changing hours per week or
  // the timeline -- which reshuffles positions and adds or removes
  // rounds -- no longer moves a checkmark onto a different step.
  key: string;
  dayStart: number;
  dayEnd: number;
  title: string;
  detail: string;
  startDate: Date;
  endDate: Date;
  // Set only for a skill-building item woven in from the visitor's own
  // matched lessons/software/exam prep (see buildSkillItems below) --
  // every authored skeleton item (paperwork, outreach, certification,
  // the capstone) leaves this undefined. Lets the result screen link
  // straight to the source page and show a small "Lesson"/"Software"/
  // "Exam Prep" tag, instead of every day-by-day item reading as plain
  // text.
  kind?: "lesson" | "software" | "examPrep" | "program" | "concept" | "career" | "guide";
  href?: string;
  // Set on a lesson step only: the lesson's slug, which is also the id
  // its own "Mark complete" button saves under -- lets the result screen
  // show a lesson step as done once the lesson itself has been completed
  // anywhere on the site.
  lessonSlug?: string;
  // Site pages (and sections of this plan) this step links to. Always
  // present, possibly empty.
  resources: PlanResource[];
};

export type GeneratedQualification = {
  label: string;
  have: boolean;
};

export type GeneratedPlan = {
  category: string;
  careerTitle?: string;
  status: ApplicationStatus;
  // A one-line, personalized framing sentence -- see buildHeadline below.
  // Not authored per category: computed purely from the visitor's own
  // inputs (hours/week, timeline, status, location), so it scales
  // automatically as those inputs change rather than needing new copy
  // written for every combination.
  headline: string;
  overview: string;
  // How many calendar days the plan spans, start to finish.
  totalDays: number;
  // The chosen career's own page and this category's Get Hired guide --
  // linked from the result screen's header and toolkit.
  careerHref?: string;
  getHiredHref?: string;
  // Every Exam Prep guide tied to this career/category, primary first.
  exams: ExamRef[];
  // Software profiles matched to this career/category.
  software: { software: SoftwareRef; href: string }[];
  qualifications: GeneratedQualification[];
  courses: { lesson: LessonRef; href: string }[];
  resumeBullets: string[];
  resumeGuideHref?: string;
  // A few concepts worth understanding deeply beyond the minimum courses
  // above, to help someone who wants to stand out, not just meet the bar.
  goFurther: { concept: ConceptRef; href: string }[];
  // The full concept pool goFurther was sliced from (not capped at 4) --
  // used to auto-link jargon that shows up in the day-by-day task text
  // back to its concept page (see components/GlossaryText.tsx), so a
  // term doesn't need to be one of the 4 featured "Go further" picks to
  // still get linked where it actually appears.
  glossaryConcepts: ConceptRef[];
  // Real training programs (apprenticeships, trade schools, certificate
  // courses) tied to this career, or a category-wide fallback -- same
  // "specific career wins, else category-wide" precedence as courses/
  // goFurther above.
  programs: { program: ProgramRef; href: string }[];
  interviewPrepHref?: string;
  examPrepHref?: string;
  entryPay?: CareerRef["entryPay"];
  isEntryRole?: boolean;
  days: GeneratedDayItem[];
  targetEmployerTypes: string[];
  whereToLook: string[];
  jobBoardLinks: { label: string; href: string }[];
  recruiterOutreach: {
    tips: string[];
    emailTemplate: string;
    linkedinTemplate: string;
    followUpTemplate: string;
  };
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// The pace every skeleton is authored at: a steady, engaged search with
// real hours to give it each week.
const REFERENCE_HOURS_PER_WEEK = 10;

// Bounds on how much the one-time early items (paperwork, resume, etc.)
// can stretch when someone has fewer hours per week than the reference
// pace. Deliberately narrow -- the "basic stuff" is meant to stay near
// the start of the plan no matter how long the overall timeline runs,
// the recurring items below are what actually absorb a longer timeline.
const PACE_SCALE_MIN = 0.5;
const PACE_SCALE_MAX = 2;

// Bounds on how much faster or slower than the reference pace a
// recurring item (another outreach round, another certification) repeats.
const DENSITY_FACTOR_MIN = 0.2;
const DENSITY_FACTOR_MAX = 3;

type RecurringKind = "outreach" | "certification";

// How often each kind of recurring item repeats at the reference pace
// (densityFactor === 1), the floor that cadence can shrink to even at a
// very high hours/week answer, and a sane cap on how many rounds a single
// plan will ever show -- outreach is cheap and fast so it repeats often;
// pursuing another certification realistically takes longer each time,
// so it repeats on a longer cycle and caps lower.
const RECURRING_CADENCE: Record<RecurringKind, { referenceDays: number; minDays: number; maxInstances: number }> = {
  outreach: { referenceDays: 3, minDays: 2, maxInstances: 8 },
  certification: { referenceDays: 7, minDays: 4, maxInstances: 4 },
};

function addDays(base: Date, days: number): Date {
  return new Date(base.getTime() + days * MS_PER_DAY);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// How many calendar days the whole plan should span. An explicit target
// timeline wins outright, that's the visitor naming an actual deadline.
// Otherwise pace alone decides: fewer hours per week than the reference
// pace spreads the same amount of work over more days.
function computeTotalDays(referenceSpanDays: number, intake: ActionPlanIntake): number {
  if (intake.timelineWeeks > 0) {
    return Math.max(1, intake.timelineWeeks * 7);
  }
  const hours = Math.max(intake.hoursPerWeek, 1);
  return Math.max(referenceSpanDays, Math.round(referenceSpanDays * (REFERENCE_HOURS_PER_WEEK / hours)));
}

// How much longer the one-time early items take when someone has fewer
// hours per week than the reference pace, bounded (see PACE_SCALE_*) so
// they stay clustered near the start of the plan rather than stretching
// across whatever the full timeline ends up being.
function computePaceScale(hoursPerWeek: number): number {
  const hours = Math.max(hoursPerWeek, 1);
  return clamp(REFERENCE_HOURS_PER_WEEK / hours, PACE_SCALE_MIN, PACE_SCALE_MAX);
}

// How much more or less often a recurring item repeats than the
// reference pace. More hours per week than the reference pace means
// shorter gaps between rounds -- literally more tasks on the schedule;
// fewer hours per week means longer gaps and fewer tasks overall. This
// is deliberately a *different* number from computePaceScale: the early
// one-time items are bounded tightly so "the basic stuff" never drifts
// far from day one, while recurring items are the piece meant to flex
// the most with both hours/week and how long the timeline runs.
function computeDensityFactor(hoursPerWeek: number): number {
  const hours = Math.max(hoursPerWeek, 1);
  return clamp(hours / REFERENCE_HOURS_PER_WEEK, DENSITY_FACTOR_MIN, DENSITY_FACTOR_MAX);
}

type RawDay = {
  // Becomes GeneratedDayItem.key once de-duplicated (see finalizeKeys).
  keyBase: string;
  dayStart: number;
  dayEnd: number;
  title: string;
  detail: string;
  kind?: GeneratedDayItem["kind"];
  href?: string;
  lessonSlug?: string;
  resources?: PlanResource[];
  // Sorts ahead of everything else on the same day -- the "start here"
  // orientation step.
  first?: boolean;
  // Internal-only tie-break for the final sort below -- never reaches the
  // public GeneratedDayItem shape (stripped out right after sorting).
  // Guarantees the anchorEnd capstone renders last among same-day items
  // instead of landing wherever an otherwise-equal sort happens to place
  // it relative to another item that lands on the plan's final day.
  anchorEnd?: boolean;
};

// Expands one authored "recurring" item into however many repeat rounds
// fit the visitor's timeline and pace. Always produces at least one round
// (clamped to the end of the plan if the authored start would otherwise
// fall past it) -- a plan with no time left for anything else should
// still carry at least one reminder to keep reaching out or keep an eye
// on certifications, never silently drop the theme entirely. Titles get a
// "(round N of M)" suffix once there's more than one, so repeats read as
// a cadence instead of looking like a duplicate-content bug.
function expandRecurringItem(
  item: ActionPlan["dayByDay"][number],
  paceScale: number,
  densityFactor: number,
  totalDays: number
): RawDay[] {
  const kind: RecurringKind = item.recurringKind === "certification" ? "certification" : "outreach";
  const cadence = RECURRING_CADENCE[kind];
  const baseCadenceDays = Math.max(cadence.minDays, Math.round(cadence.referenceDays / densityFactor));
  const scaledSpan = Math.max(1, Math.round((item.dayEnd - item.dayStart + 1) * paceScale));
  const firstStart = Math.min(totalDays, Math.max(1, Math.round(item.dayStart * paceScale)));

  // How many rounds the pace-based cadence would naturally produce
  // between firstStart and the end of the plan, capped at maxInstances.
  // When effort (hours/week) is the limiting factor, this comes in below
  // maxInstances and the natural cadence below is left alone. When a
  // long timeline means the natural cadence would reach maxInstances
  // well before totalDays, that used to leave a long dead gap before the
  // anchorEnd capstone -- instead, spread the capped round count evenly
  // across the remaining plan so the last round lands near the end.
  const naturalCount = Math.max(1, Math.floor((totalDays - firstStart) / baseCadenceDays) + 1);
  const instanceCount = Math.min(cadence.maxInstances, naturalCount);
  const cadenceDays =
    instanceCount > 1 && naturalCount > cadence.maxInstances
      ? Math.max(cadence.minDays, Math.floor((totalDays - firstStart) / (instanceCount - 1)))
      : baseCadenceDays;

  const spans: { dayStart: number; dayEnd: number }[] = [];
  let cursor = firstStart;
  while (cursor <= totalDays && spans.length < instanceCount) {
    spans.push({ dayStart: cursor, dayEnd: Math.min(totalDays, cursor + scaledSpan - 1) });
    cursor += cadenceDays;
  }

  // Round 1 carries the full authored guidance. Later rounds are the
  // same job again, so they carry its first sentence and a pointer back
  // rather than the whole paragraph repeated up to eight times down the
  // page.
  const firstSentence = item.detail.split(/(?<=[.!?])\s+/)[0] ?? item.detail;
  const repeatDetail =
    firstSentence.length < item.detail.length ? `${firstSentence} Same playbook as round 1.` : item.detail;
  return spans.map((span, i) => ({
    keyBase: `${slugifyKey(item.title)}:r${i + 1}`,
    dayStart: span.dayStart,
    dayEnd: span.dayEnd,
    title: spans.length > 1 ? `${item.title} (round ${i + 1} of ${spans.length})` : item.title,
    detail: i === 0 ? item.detail : repeatDetail,
  }));
}

export type SkillItem = {
  kind: "lesson" | "software" | "examPrep" | "concept";
  keyBase: string;
  title: string;
  detail: string;
  href?: string;
  lessonSlug?: string;
  resources?: PlanResource[];
};

// How often a skill-building item (a lesson, a software profile, a round
// of exam-prep practice, a batch of vocabulary) lands on the calendar.
// Unlike outreach/certification, a skill-building round never repeats
// the same content twice -- once every matched item has had its turn the
// rotation simply stops, since "redo the lesson you already did" isn't a
// sensible task the way "send another round of outreach" is.
const SKILL_BUILDING_REFERENCE_DAYS = 4;
const SKILL_BUILDING_MIN_DAYS = 2;
// Where the first skill-building item lands, at the reference pace --
// after the very first paperwork/resume items, but early enough that
// learning starts alongside the job search rather than only once outreach
// is already underway.
const SKILL_BUILDING_FIRST_DAY = 3;
// How many concepts one "get the vocabulary down" step covers, and how
// many such steps a plan gets at most.
// Where the "look into a real program" step lands at the reference
// pace: alongside "build your target list", since for most trades the
// apprenticeship application is the job application.
const PROGRAM_STEP_DAY = 4;
const CONCEPTS_PER_BATCH = 3;

// How much site content a plan schedules, by how long it runs. A
// two-week sprint has room for a handful of learning steps; a plan
// that runs two or three months used to burn through the same handful
// in its first couple of weeks and then offer nothing but outreach
// reminders for the rest. Longer plans now draw more lessons, more
// vocabulary, and more software, spread across the calendar.
function skillBudget(totalDays: number): { lessons: number; software: number; conceptBatches: number } {
  if (totalDays <= 21) return { lessons: 4, software: 2, conceptBatches: 2 };
  if (totalDays <= 49) return { lessons: 6, software: 3, conceptBatches: 3 };
  return { lessons: 8, software: 4, conceptBatches: 4 };
}

// The order skill-building steps rotate in: L(esson), C(oncepts),
// S(oftware), E(xam practice). A slot whose queue is empty is skipped,
// and anything left once the pattern runs out is appended, so no
// matched item is ever dropped.
const SKILL_ROTATION = "LCLSELSLCLSLCLCLS";
// Skill-building steps finish by roughly this fraction of the plan:
// early enough that the learning lands before most interviews do, late
// enough that a long plan isn't front-loaded and then empty.
const SKILL_SPREAD_FRACTION = 0.65;

function joinTitles(titles: string[]): string {
  if (titles.length <= 1) return titles[0] ?? "";
  return `${titles.slice(0, -1).join(", ")} and ${titles[titles.length - 1]}`;
}

// Builds the ordered pool of skill-building items for one generated plan
// from the visitor's matched site content: lessons, software profiles,
// one exam-prep practice round, and batches of three concepts ("get the
// vocabulary down"), each capped by skillBudget for the plan's length.
// The result is in calendar order, interleaved on purpose (see
// SKILL_ROTATION) -- a lesson, then the terms that lesson leans on,
// then another lesson, then something concrete to click through -- so
// a short plan, which only reaches the first few slots, still gets a
// mix instead of four lessons in a row and nothing else.
function buildSkillItems(
  lessons: LessonRef[],
  software: SoftwareRef[],
  examTask: ExamRef | undefined,
  concepts: ConceptRef[],
  budget: { lessons: number; software: number; conceptBatches: number }
): SkillItem[] {
  const lessonItems: SkillItem[] = lessons.slice(0, budget.lessons).map((lesson) => ({
    kind: "lesson",
    keyBase: `lesson:${lesson.slug}`,
    title: `Complete the lesson: ${lesson.title}`,
    detail: `${lesson.minutes} min of real working knowledge, not just what it takes to get hired. Mark it complete on the lesson page and it checks off here too.`,
    href: `/lessons/${lesson.slug}`,
    lessonSlug: lesson.slug,
    resources: [{ label: lesson.title, href: `/lessons/${lesson.slug}`, kind: "lesson" }],
  }));
  const softwareItems: SkillItem[] = software.slice(0, budget.software).map((sw) => ({
    kind: "software",
    keyBase: `software:${sw.slug}`,
    title: `Get familiar with ${sw.title}`,
    detail: sw.whatItIs,
    href: `/software/${sw.slug}`,
    resources: [{ label: sw.title, href: `/software/${sw.slug}`, kind: "software" }],
  }));
  const examItems: SkillItem[] = examTask
    ? [
        {
          kind: "examPrep",
          keyBase: `exam:${examTask.href.split("/").pop() ?? "prep"}`,
          title: `Work through ${examTask.title} practice questions`,
          detail: "A few questions at a time keeps the material fresh without turning into a study marathon.",
          href: examTask.href,
          resources: [{ label: examTask.title, href: examTask.href, kind: "examPrep" }],
        },
      ]
    : [];
  const conceptItems: SkillItem[] = [];
  for (let b = 0; b < budget.conceptBatches; b++) {
    const batch = concepts.slice(b * CONCEPTS_PER_BATCH, (b + 1) * CONCEPTS_PER_BATCH);
    // A lone leftover term isn't worth its own day on the calendar.
    if (batch.length < 2) break;
    conceptItems.push({
      kind: "concept",
      keyBase: `concepts:${batch.map((c) => c.slug).join("+")}`,
      title: `Get the vocabulary down: ${joinTitles(batch.map((c) => c.title))}`,
      detail:
        b === 0
          ? "A couple of minutes each. Knowing these cold is the difference between following the conversation and nodding along."
          : "Three more terms that come up constantly once you're in the door. Read them now and they'll already sound familiar.",
      resources: batch.map((c) => ({ label: c.title, href: `/concepts/${c.slug}`, kind: "concept" as const })),
    });
  }

  const queues: Record<string, SkillItem[]> = { L: lessonItems, C: conceptItems, S: softwareItems, E: examItems };
  const ordered: SkillItem[] = [];
  for (const slot of SKILL_ROTATION) {
    const next = queues[slot].shift();
    if (next) ordered.push(next);
  }
  return [...ordered, ...queues.L, ...queues.C, ...queues.S, ...queues.E];
}

// Spreads the skill-building pool across the calendar at a cadence that
// scales with densityFactor, the same dial the outreach/certification
// rounds use -- more hours per week or a longer timeline means shorter
// gaps between items. Never repeats an item: once the pool is exhausted,
// the rotation simply stops (see buildSkillItems' comment for why).
// Always places at least the first item, clamped to the plan's last day,
// so a very tight plan still gets one learning task rather than none.
function expandSkillBuildingItems(
  items: SkillItem[],
  paceScale: number,
  densityFactor: number,
  totalDays: number
): RawDay[] {
  if (items.length === 0) return [];
  const firstDay = Math.min(totalDays, Math.max(1, Math.round(SKILL_BUILDING_FIRST_DAY * paceScale)));
  // The pace-based cadence, stretched when it would otherwise finish
  // every item long before the plan ends -- see SKILL_SPREAD_FRACTION.
  // Never tightened: a short plan still just schedules as many items as
  // fit and stops.
  const paceCadence = Math.max(SKILL_BUILDING_MIN_DAYS, Math.round(SKILL_BUILDING_REFERENCE_DAYS / densityFactor));
  const spreadCadence =
    items.length > 1 ? Math.floor((totalDays * SKILL_SPREAD_FRACTION - firstDay) / (items.length - 1)) : paceCadence;
  const cadenceDays = Math.max(paceCadence, spreadCadence);

  const result: RawDay[] = [];
  let cursor = firstDay;
  for (const item of items) {
    if (cursor > totalDays) break;
    result.push(skillToRawDay(item, cursor));
    cursor += cadenceDays;
  }
  if (result.length === 0) {
    result.push(skillToRawDay(items[0], totalDays));
  }
  return result;
}

function skillToRawDay(item: SkillItem, day: number): RawDay {
  return {
    keyBase: item.keyBase,
    dayStart: day,
    dayEnd: day,
    title: item.title,
    detail: item.detail,
    kind: item.kind,
    href: item.href,
    lessonSlug: item.lessonSlug,
    resources: item.resources,
  };
}

// Lowercase letters/digits and single dashes only, capped -- the
// position-independent part of a step's saved-progress key.
function slugifyKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// `specific` first, then anything from `fallback` not already in it, up
// to `max` -- a career with only one or two lessons of its own still
// gets a full set, instead of the old either/or (a career's own one
// lesson, or the category's, never both).
function fillFrom<T extends { id: string }>(specific: T[], fallback: T[], max: number): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of [...specific, ...fallback]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
    if (result.length >= max) break;
  }
  return result;
}

function dedupeResources(resources: PlanResource[]): PlanResource[] {
  const seen = new Set<string>();
  return resources.filter((r) => {
    if (seen.has(r.href)) return false;
    seen.add(r.href);
    return true;
  });
}

// Fills [Token] placeholders with a replacer *function*, not a plain
// string, on purpose. String.prototype.replace treats a string
// replacement specially: "$&", "$1", "$`" and so on are live tokens in
// that mini-syntax, so a visitor typing a location like "Earn $100, ask
// for Pat" would otherwise have its "$1" silently reinterpreted instead
// of inserted literally. A function replacer returns its value verbatim,
// no matter what punctuation it contains.
function fillTemplate(template: string, tokens: Record<string, string>): string {
  let result = template.trim();
  for (const [key, value] of Object.entries(tokens)) {
    if (!value) continue;
    result = result.replace(new RegExp(`\\[${key}\\]`, "gi"), () => value);
  }
  return result;
}

// How much weekly time someone has to give this, independent of how
// long the overall timeline runs -- "I have 3 hours a week" and "I have
// 3 hours a week for the next year" call for different vocabulary than
// "I have 35 hours a week for the next two weeks", even though a timeline
// dial alone can't tell those apart.
type EffortTier = "light" | "steady" | "intense";

function computeEffortTier(hoursPerWeek: number): EffortTier {
  if (hoursPerWeek <= 5) return "light";
  if (hoursPerWeek <= 15) return "steady";
  return "intense";
}

// How much runway the plan actually has, after totalDays is computed --
// a short plan reads as a sprint, a long one as a sustained build,
// whatever pace produced that length.
type HorizonTier = "sprint" | "build" | "marathon";

function computeHorizonTier(totalDays: number): HorizonTier {
  if (totalDays <= 14) return "sprint";
  if (totalDays <= 42) return "build";
  return "marathon";
}

const EFFORT_OPENING: Record<EffortTier, string> = {
  light: "A steady, no-pressure",
  steady: "A focused",
  intense: "An all-in",
};

const STATUS_VERB: Record<ApplicationStatus, string> = {
  browsing: "way to explore",
  applying: "push to land",
};

const HORIZON_CLOSE: Record<HorizonTier, (totalDays: number) => string> = {
  sprint: (d) => `fast: ${d} days, start to finish`,
  build: (d) => `over the next ${d} days`,
  marathon: (d) => `as a long-haul build: ${d} days, paced to last`,
};

// Builds the one-line headline shown at the top of a generated plan.
// Deliberately generic phrase-composition, not per-category copy: every
// word is chosen from hoursPerWeek (effort), the computed totalDays
// (horizon), status (verb), and the visitor's own location/trade --
// four independent inputs, so the sentence actually changes shape across
// the realistic range of answers instead of just restating the same
// template with different nouns swapped in.
function buildHeadline(
  trade: string,
  location: string,
  status: ApplicationStatus,
  hoursPerWeek: number,
  totalDays: number
): string {
  const effort = computeEffortTier(hoursPerWeek);
  const horizon = computeHorizonTier(totalDays);
  const locationPhrase = location.trim() ? ` in ${location.trim()}` : "";
  return (
    `${EFFORT_OPENING[effort]} ${STATUS_VERB[status]} ${trade} work${locationPhrase}, ` +
    `${HORIZON_CLOSE[horizon](totalDays)}.`
  );
}

export function buildActionPlan({
  skeleton,
  getHiredGuide,
  getHiredHref,
  resumeGuide,
  categorySlug,
  lessonsForCareer,
  categoryFallbackLessons = [],
  softwareForCareer = [],
  categoryFallbackSoftware = [],
  conceptsForCareer = [],
  categoryFallbackConcepts = [],
  programsForCareer = [],
  categoryFallbackPrograms = [],
  careerInterviewPrepHref,
  categoryInterviewPrepHref,
  examsForCareer = [],
  categoryExams = [],
  linkRefs = {},
  career,
  intake,
  startDate = new Date(),
}: {
  skeleton: ActionPlan;
  getHiredGuide?: GetHired;
  // This category's Get Hired guide page, for the "gethired" link token
  // and the orientation step.
  getHiredHref?: string;
  resumeGuide?: ResumeGuide;
  // The category's anchor on the career index (/careers#<slug>), for the
  // "careers" link token.
  categorySlug?: string;
  lessonsForCareer: LessonRef[];
  // Lessons for the category as a whole, in Learning Blueprint order.
  // Used on their own when no specific career was picked ("Not sure yet,
  // keep it general"), and to top up a career that has fewer than four
  // lessons of its own -- see fillFrom.
  categoryFallbackLessons?: LessonRef[];
  // Software tied to the chosen specific career, and a category-wide
  // fallback, same top-up rule as lessons. Woven into the day-by-day
  // skill-building rotation (see buildSkillItems), not just a side list.
  softwareForCareer?: SoftwareRef[];
  categoryFallbackSoftware?: SoftwareRef[];
  // Concepts tied to the chosen specific career (its own curated picks
  // first), and a category-wide fallback. The first few become dated
  // "get the vocabulary down" steps; the rest feed "Go further" and the
  // glossary auto-linking.
  conceptsForCareer?: ConceptRef[];
  categoryFallbackConcepts?: ConceptRef[];
  // Programs tied to the chosen specific career, or the category-wide
  // list when no career was picked. Deliberately either/or, NOT topped
  // up: a bricklayer apprenticeship is not a useful suggestion on an
  // electrician's plan.
  programsForCareer?: ProgramRef[];
  categoryFallbackPrograms?: ProgramRef[];
  // Hrefs for this career's (or, failing that, this category's)
  // Interview Prep guide, if one exists -- a specific career's own guide
  // wins over the category-wide one.
  careerInterviewPrepHref?: string;
  categoryInterviewPrepHref?: string;
  // Every Exam Prep guide tied to the chosen career (its own exam
  // first, then the others its career page links to), and the
  // category's exams as a fallback. The first one the visitor doesn't
  // already hold becomes the practice-question task; each "pursue
  // another certification" round then names the next one down the list.
  examsForCareer?: ExamRef[];
  categoryExams?: ExamRef[];
  // Title/href for every literal content id an authored step's `links`
  // names (see ActionPlanSchema), resolved once on the server so the
  // browser never needs the full content set.
  linkRefs?: Record<string, PlanResource>;
  career?: CareerRef;
  intake: ActionPlanIntake;
  startDate?: Date;
}): GeneratedPlan {
  const certsHeldTokens = tokenize(intake.certsHeld);

  // Defends the pure generator against a NaN/Infinity slipping through
  // from a future caller that skips the intake form's own clamping (not
  // reachable from the real UI today, since ActionPlanBuilder always
  // sends clamped numbers) -- every downstream day offset is computed
  // from these two fields, so a non-finite value here would otherwise
  // propagate silently into every scaled date on the plan instead of
  // falling back to something sane.
  const safeIntake: ActionPlanIntake = {
    ...intake,
    hoursPerWeek: Number.isFinite(intake.hoursPerWeek) ? intake.hoursPerWeek : REFERENCE_HOURS_PER_WEEK,
    timelineWeeks: Number.isFinite(intake.timelineWeeks) ? intake.timelineWeeks : 0,
  };

  // Three independent dials, on purpose: totalDays is how far out the
  // calendar runs (the visitor's stated timeline wins outright, hours/week
  // only sets the length when no timeline was given); paceScale is how
  // much longer the early one-time items take at fewer hours/week, kept
  // narrow so "the basic stuff" stays near day one; densityFactor is how
  // often a recurring item (another outreach round, another
  // certification) repeats, which is what actually makes "more hours" or
  // "a longer timeline" produce more tasks rather than just the same
  // tasks spread thinner.
  const referenceSpanDays = skeleton.dayByDay.reduce((max, item) => Math.max(max, item.dayEnd), 1);
  const totalDays = computeTotalDays(referenceSpanDays, safeIntake);
  const paceScale = computePaceScale(safeIntake.hoursPerWeek);
  const densityFactor = computeDensityFactor(safeIntake.hoursPerWeek);

  // ---- The visitor's matched site content -------------------------
  const trade = career?.title ?? skeleton.category;
  const budget = skillBudget(totalDays);
  // Category-wide lessons only ever top a plan up to four; past that, a
  // long plan draws on the career's own lessons alone. (An electrician
  // with a twelve-week plan gets more electrical lessons if they exist,
  // not a concrete-finishing lesson to fill the slot.)
  const lessonPool = fillFrom(
    lessonsForCareer.slice(0, budget.lessons),
    categoryFallbackLessons,
    career ? Math.max(4, Math.min(lessonsForCareer.length, budget.lessons)) : budget.lessons
  );
  // Software is either/or, like programs: a chosen career shows only
  // the software its own page names (a mason's plan shouldn't suggest
  // Bluebeam just because other trades use it); the category-wide list
  // is for "not sure yet, keep it general".
  const softwarePool = (career ? softwareForCareer : categoryFallbackSoftware).slice(0, budget.software);
  const conceptPool = fillFrom(conceptsForCareer, categoryFallbackConcepts, 40);
  const programPool = programsForCareer.length > 0 ? programsForCareer : categoryFallbackPrograms;
  const interviewPrepHref = careerInterviewPrepHref ?? categoryInterviewPrepHref;
  const careerHref = career ? `/careers/${career.slug}` : undefined;
  const careersIndexHref = categorySlug ? `/careers#${categorySlug}` : "/careers";

  // Exams: the career's own first, then the category's, minus anything
  // the visitor says they already hold -- no point scheduling OSHA 10
  // practice for someone who typed "OSHA 10" into the form.
  const seenExamHrefs = new Set<string>();
  const examPool: ExamRef[] = [];
  for (const exam of [...examsForCareer, ...categoryExams]) {
    if (seenExamHrefs.has(exam.href)) continue;
    seenExamHrefs.add(exam.href);
    // An entry-level role's plan only ever mentions credentials a
    // newcomer can earn now. A journeyman license takes years of
    // apprenticeship to sit for, so it's left off entirely -- not
    // scheduled, not practiced, not listed.
    if (career?.isEntryRole === true && exam.entryLevel === false) continue;
    examPool.push(exam);
  }
  const examsStillNeeded = examPool.filter(
    (exam) => certsHeldTokens.size === 0 || !labelLooksHeld(exam.title, certsHeldTokens)
  );
  const examTask = examsStillNeeded[0];
  // What the "pursue another certification" rounds name, one per round:
  // everything after the practice-task exam.
  const roundExams = examsStillNeeded.slice(examsStillNeeded.length > 1 ? 1 : 0);

  const hasOpeningsSection =
    skeleton.targetEmployerTypes.length > 0 || (getHiredGuide?.whereToLook.length ?? 0) > 0 || skeleton.jobBoardsUseful;

  // Turns one authored `links` entry into zero or more real links for
  // THIS visitor -- see ACTION_PLAN_LINK_TOKENS in lib/types.ts. A token
  // with nothing behind it (no Exam Prep guide for this category, say)
  // resolves to nothing rather than a dead link.
  function resolveLink(link: string): PlanResource[] {
    switch (link) {
      case "career":
        return careerHref
          ? [{ label: `${trade} career page`, href: careerHref, kind: "career" }]
          : [{ label: `${skeleton.category} careers`, href: careersIndexHref, kind: "career" }];
      case "careers":
        return [
          ...(careerHref ? [{ label: `${trade} career page`, href: careerHref, kind: "career" as const }] : []),
          { label: `All ${skeleton.category} careers`, href: careersIndexHref, kind: "career" },
        ];
      case "gethired":
        return getHiredHref ? [{ label: `${skeleton.category} Get Hired guide`, href: getHiredHref, kind: "guide" }] : [];
      case "resume":
        return resumeGuide ? [{ label: "Resume Guide", href: `/resumes/${resumeGuide.slug}`, kind: "guide" }] : [];
      case "interview":
        return interviewPrepHref ? [{ label: "Interview Prep guide", href: interviewPrepHref, kind: "guide" }] : [];
      case "exam":
        return examTask ? [{ label: examTask.title, href: examTask.href, kind: "examPrep" }] : [];
      case "programs":
        return programPool
          .slice(0, 2)
          .map((p): PlanResource => ({ label: p.title, href: `/programs/${p.slug}`, kind: "program" }));
      case "outreach":
        return [{ label: "Your outreach templates", href: "#outreach", kind: "section" }];
      case "openings":
        return hasOpeningsSection ? [{ label: "Where to find openings", href: "#openings", kind: "section" }] : [];
      default: {
        const ref = linkRefs[link];
        return ref ? [ref] : [];
      }
    }
  }
  const resolveLinks = (links: string[] | undefined): PlanResource[] =>
    dedupeResources((links ?? []).flatMap(resolveLink));

  const rawDays: RawDay[] = [];

  // Day one always opens on the site's own description of the job (or,
  // with no specific career picked, the category's Get Hired guide):
  // everything after it reads better with that context, and it's the
  // one step every visitor can finish in ten minutes.
  if (career && careerHref) {
    rawDays.push({
      keyBase: "start-here",
      dayStart: 1,
      dayEnd: 1,
      first: true,
      kind: "career",
      href: careerHref,
      title: `Start here: read the ${career.title} career page`,
      detail:
        "Pay, a typical day, the credentials that actually matter, and how people move up. Ten minutes here makes every step after it sharper.",
      resources: dedupeResources([
        { label: `${career.title} career page`, href: careerHref, kind: "career" },
        ...resolveLink("gethired"),
      ]),
    });
  } else if (getHiredHref) {
    rawDays.push({
      keyBase: "start-here",
      dayStart: 1,
      dayEnd: 1,
      first: true,
      kind: "guide",
      href: getHiredHref,
      title: `Start here: read the ${skeleton.category} Get Hired guide`,
      detail:
        "How hiring actually works in this part of the industry, who does the hiring, and what to have ready, before you spend time on anything else.",
      resources: dedupeResources([...resolveLink("gethired"), ...resolveLink("careers")]),
    });
  }

  for (const item of skeleton.dayByDay) {
    if (item.appliesWhen !== "both" && item.appliesWhen !== intake.status) continue;
    const authoredResources = resolveLinks(item.links);
    if (item.recurring) {
      const rounds = expandRecurringItem(item, paceScale, densityFactor, totalDays);
      rounds.forEach((round, i) => {
        // Each "pursue another certification" round names the next
        // credential down the visitor's own list, so four rounds read
        // as four different next steps instead of one sentence repeated.
        const exam = item.recurringKind === "certification" ? roundExams[i] : undefined;
        round.resources = dedupeResources([
          ...(exam ? [{ label: exam.title, href: exam.href, kind: "examPrep" as const }] : []),
          ...authoredResources,
        ]);
        if (exam) round.detail = `This round: ${exam.title}. ${round.detail}`;
      });
      rawDays.push(...rounds);
      continue;
    }
    if (item.anchorEnd) {
      // Always the plan's last step, whatever the timeline -- a capstone
      // like "review your responses and decide your next move" should
      // land at the very end whether the plan is 2 weeks or 10, not at a
      // position scaled from its authored day offset.
      const span = Math.max(1, Math.round((item.dayEnd - item.dayStart + 1) * paceScale));
      const scaledEnd = totalDays;
      const scaledStart = Math.max(1, scaledEnd - span + 1);
      rawDays.push({
        keyBase: slugifyKey(item.title),
        dayStart: scaledStart,
        dayEnd: scaledEnd,
        title: item.title,
        detail: item.detail,
        resources: authoredResources,
        anchorEnd: true,
      });
      continue;
    }
    const scaledStart = Math.min(totalDays, Math.max(1, Math.round(item.dayStart * paceScale)));
    const scaledEnd = Math.min(totalDays, Math.max(scaledStart, Math.round(item.dayEnd * paceScale)));
    // An authored step whose main (first) link is a lesson IS that
    // lesson's step: it carries the lesson's slug so completing the
    // lesson checks it off, and the lesson is left out of the
    // skill-building rotation below.
    const leadLesson = authoredResources[0]?.kind === "lesson" ? authoredResources[0] : undefined;
    rawDays.push({
      keyBase: slugifyKey(item.title),
      dayStart: scaledStart,
      dayEnd: scaledEnd,
      title: item.title,
      detail: item.detail,
      resources: authoredResources,
      ...(leadLesson ? { kind: "lesson" as const, href: leadLesson.href, lessonSlug: leadLesson.href.split("/").pop() } : {}),
    });
  }

  // A real program to look into, as a dated step rather than a link in
  // a side list -- for most trades the apprenticeship application IS the
  // job application, so it belongs on the calendar next to "build your
  // target list".
  if (programPool.length > 0) {
    const lead = programPool[0];
    const facts = [lead.organization, lead.durationNote, lead.costNote].filter(Boolean).join(" · ");
    const programDay = Math.min(totalDays, Math.max(1, Math.round(PROGRAM_STEP_DAY * paceScale)));
    rawDays.push({
      keyBase: career ? `program:${lead.slug}` : "program:browse",
      dayStart: programDay,
      dayEnd: programDay,
      kind: "program",
      href: career ? `/programs/${lead.slug}` : "/programs",
      title: career ? `Look into the ${lead.title}` : `Look at real training programs for ${skeleton.category}`,
      detail: career
        ? `${facts}. Read what it involves, then check the entry requirements and the next application window on the program's own site.${
            programPool.length > 1 ? ` ${programPool.length - 1} more option${programPool.length - 1 === 1 ? "" : "s"} for this career linked below.` : ""
          }`
        : "Apprenticeships, trade schools, and certificate programs you could actually enroll in. Compare what each one costs, how long it runs, and who it's for.",
      resources: dedupeResources([
        ...programPool.slice(0, 3).map((p): PlanResource => ({ label: p.title, href: `/programs/${p.slug}`, kind: "program" })),
        { label: "All programs", href: "/programs", kind: "program" },
      ]),
    });
  }

  // Weave in real site content as actual dated tasks, not just a side
  // "Courses to take" list -- a rotation through the visitor's matched
  // lessons, vocabulary, software, and exam-prep practice, on the same
  // pace dial (densityFactor) the outreach/certification rounds use.
  // A lesson an authored step already sends the visitor to as its main
  // link ("Watch a jobsite-safety lesson before you start applying")
  // isn't scheduled a second time as its own step.
  const lessonsAlreadyAssigned = new Set(
    rawDays.map((day) => day.lessonSlug).filter((slug): slug is string => Boolean(slug))
  );
  const skillItems = buildSkillItems(
    lessonPool.filter((lesson) => !lessonsAlreadyAssigned.has(lesson.slug)),
    softwarePool,
    examTask,
    conceptPool,
    budget
  );
  rawDays.push(...expandSkillBuildingItems(skillItems, paceScale, densityFactor, totalDays));

  // Final key = keyBase, with a counter only if two steps would
  // otherwise collide (two authored steps sharing a title).
  const usedKeys = new Map<string, number>();
  const days: GeneratedDayItem[] = rawDays
    .sort((a, b) => {
      // The anchorEnd capstone is guaranteed to render last, full stop,
      // not just win same-day ties -- a recurring item's own last round
      // can legitimately share or even edge past the capstone's start
      // day once cadence spreading (see expandRecurringItem) stretches
      // rounds across a long timeline, and the capstone should still
      // read as the plan's final step either way.
      if (a.anchorEnd !== b.anchorEnd) return a.anchorEnd ? 1 : -1;
      if (a.first !== b.first) return a.first ? -1 : 1;
      return a.dayStart - b.dayStart || a.dayEnd - b.dayEnd;
    })
    .map(({ anchorEnd, first, keyBase, resources, ...item }) => {
      const seen = usedKeys.get(keyBase) ?? 0;
      usedKeys.set(keyBase, seen + 1);
      return {
        ...item,
        key: seen === 0 ? keyBase : `${keyBase}~${seen + 1}`,
        resources: resources ?? [],
        startDate: addDays(startDate, item.dayStart - 1),
        endDate: addDays(startDate, item.dayEnd - 1),
      };
    });

  const qualifications: GeneratedQualification[] = (getHiredGuide?.credentialsToHaveReady ?? []).map(
    (label) => ({
      label,
      have: certsHeldTokens.size > 0 && labelLooksHeld(label, certsHeldTokens),
    })
  );

  const tokens = { Trade: trade, Location: intake.location.trim() };
  // "Go further" skips the concepts already scheduled as vocabulary
  // steps above, so the two lists don't repeat each other.
  const scheduledConceptCount = skillItems.filter((item) => item.kind === "concept").length * CONCEPTS_PER_BATCH;
  const goFurther = conceptPool
    .slice(scheduledConceptCount, scheduledConceptCount + 4)
    .map((concept) => ({ concept, href: `/concepts/${concept.slug}` }));

  const headline = buildHeadline(trade, intake.location, intake.status, safeIntake.hoursPerWeek, totalDays);

  return {
    category: skeleton.category,
    careerTitle: career?.title,
    status: intake.status,
    headline,
    overview: skeleton.overview,
    totalDays,
    careerHref,
    getHiredHref,
    exams: examPool,
    software: softwarePool.map((sw) => ({ software: sw, href: `/software/${sw.slug}` })),
    qualifications,
    courses: lessonPool.map((lesson) => ({ lesson, href: `/lessons/${lesson.slug}` })),
    resumeBullets: resumeGuide?.exampleBullets.slice(0, 5) ?? [],
    resumeGuideHref: resumeGuide ? `/resumes/${resumeGuide.slug}` : undefined,
    goFurther,
    glossaryConcepts: conceptPool,
    programs: programPool.slice(0, 3).map((program) => ({ program, href: `/programs/${program.slug}` })),
    interviewPrepHref,
    examPrepHref: examPool[0]?.href,
    entryPay: career?.entryPay,
    isEntryRole: career?.isEntryRole,
    days,
    targetEmployerTypes: skeleton.targetEmployerTypes,
    whereToLook: getHiredGuide?.whereToLook ?? [],
    jobBoardLinks: skeleton.jobBoardsUseful ? buildJobBoardLinks(trade, intake.location) : [],
    recruiterOutreach: {
      tips: skeleton.recruiterOutreach.tips,
      emailTemplate: fillTemplate(skeleton.recruiterOutreach.emailTemplate, tokens),
      linkedinTemplate: fillTemplate(skeleton.recruiterOutreach.linkedinTemplate, tokens),
      followUpTemplate: fillTemplate(skeleton.recruiterOutreach.followUpTemplate, tokens),
    },
  };
}

// Splits free text into a set of lowercase word tokens, digits kept
// (credential names lean on them, "OSHA 10"), everything else treated as
// a separator. Used for both the credential label and the visitor's own
// certsHeld text, so matching below is exact-token-against-exact-token,
// never one string being a substring of the other -- that's the piece
// that keeps a short, legitimate token like "ID" from matching against
// unrelated words that merely contain those letters ("avoid", "said").
function tokenize(text: string): Set<string> {
  // Defensive against anything other than a real string reaching here --
  // the current UI only ever hands this a string (a controlled textarea's
  // value is always one), but buildActionPlan is a plain exported
  // function, not fenced off from being called with bad input by some
  // future caller, so this guards the actual crash rather than relying on
  // the type annotation alone.
  const safeText = typeof text === "string" ? text : String(text ?? "");
  return new Set(
    safeText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1)
  );
}

// credentialsToHaveReady entries are written as a short name followed by
// an explanation ("A valid driver's license. Many jobsites are outside
// reliable public transit..."), the same style the Get Hired page's prose
// bullet list is written for. Matching against the *whole* sentence
// would mean a visitor has to type nearly the entire explanation before
// it counts as a match. This pulls out just the leading short-name
// clause, up to whichever of ", " / ". " / " and " / " or " / ": " comes
// first (scanned with any parenthetical content stripped out first, so a
// stray "or"/"," *inside* a parenthetical list like "(water damage, fire,
// or mold)" doesn't cut the clause early), and falls back to the full
// label if none of those appear.
function stripParens(label: string): string {
  return label.replace(/\([^)]*\)/g, " ");
}

function extractCoreLabel(label: string): string {
  const flat = stripParens(label);
  const delimiters = [", ", ". ", " and ", " or ", ": "];
  let cut = flat.length;
  for (const d of delimiters) {
    const i = flat.indexOf(d);
    if (i !== -1 && i < cut) cut = i;
  }
  return flat.slice(0, cut);
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "if", "any", "in", "on", "of", "to", "is",
  "for", "you", "your", "with", "have", "card", "valid", "whatever",
]);

// Generic nouns that describe *what kind of thing* a credential is
// rather than *which* credential it is -- every entry on the Get Hired
// page's credentialsToHaveReady list uses one of these, so leaving them
// in the "significant words" count means a visitor has to type the whole
// phrase ("Procore Certification") instead of just the distinguishing
// word ("Procore") before it registers as held.
const GENERIC_CREDENTIAL_WORDS = new Set([
  "certification", "certifications", "certificate", "certificates",
  "certified", "license", "licensed", "licensing", "licenses",
  "credential", "credentials", "credentialed", "admission", "admissions",
]);

function significantWords(text: string): string[] {
  return [...tokenize(text)].filter((w) => !STOPWORDS.has(w) && !GENERIC_CREDENTIAL_WORDS.has(w));
}

// Pulls out short, exact-identity phrases a visitor would realistically
// type for a credential -- its parenthetical short code ("(PE)", "(CPE)"),
// any bare all-caps acronym in the label ("OSHA", "NCCCO", "HAZWOPER",
// "CPA"), and an acronym immediately followed by a number ("OSHA 10") as
// one combined phrase. Each returned phrase is a list of lowercase
// tokens; labelLooksHeld treats a credential as held if *any single*
// phrase's tokens are all present in what the visitor typed, so "CCM or
// CCP" (two acronyms joined by "or" in the label) matches on either one.
function extractIdentityPhrases(label: string): string[][] {
  const phrases: string[][] = [];
  const seen = new Set<string>();
  const add = (text: string) => {
    const toks = [...tokenize(text)];
    if (toks.length === 0) return;
    const key = toks.join(" ");
    if (seen.has(key)) return;
    seen.add(key);
    phrases.push(toks);
  };

  const parenRe = /\(([^)]*)\)/g;
  let m: RegExpExecArray | null;
  while ((m = parenRe.exec(label))) {
    const inner = m[1].trim();
    // Only a short uppercase code counts as an identity phrase here -- a
    // parenthetical *list* like "(water damage, fire/smoke, or mold)"
    // describes variants, not the credential's own short name.
    if (/^[A-Z0-9]{2,8}([\s-][A-Z0-9]{1,8}){0,2}$/.test(inner)) add(inner);
  }

  const withoutParens = stripParens(label);
  const acronymRe = /\b[A-Z]{2,8}(?:-[A-Z0-9]{1,8})?\b/g;
  const bareAcronyms: { word: string; index: number }[] = [];
  while ((m = acronymRe.exec(withoutParens))) {
    bareAcronyms.push({ word: m[0], index: m.index });
    add(m[0]);
  }
  for (const { word, index } of bareAcronyms) {
    const rest = withoutParens.slice(index + word.length, index + word.length + 6);
    const numMatch = rest.match(/^\s+(\d{1,3})\b/);
    if (numMatch) add(`${word} ${numMatch[1]}`);
  }

  return phrases;
}

// A credential "counts" as held either when the visitor typed one of its
// short identity phrases outright (an acronym, a parenthetical code, an
// "OSHA 10"-style combo -- see extractIdentityPhrases), or, failing that,
// when most of its core clause's remaining significant words show up as
// exact tokens in what the visitor typed, scaled to that clause's length
// so a two-word core ("drivers", "license") needs both, not just one --
// a single shared word was enough to flag a credential as held under the
// old substring version, which is exactly the kind of false positive a
// visitor pasting unrelated or nonsense text could trigger by accident.
// Worst case either way is informational (one item shows the wrong
// checkmark), never a crash and never anything the visitor typed being
// shown back to them.
function labelLooksHeld(label: string, certsHeldTokens: Set<string>): boolean {
  // When a credential's name carries a number ("OSHA 10", "OSHA 30"),
  // only a phrase that includes the number counts -- the bare acronym
  // alone would mark OSHA 30 as held for someone who typed "OSHA 10".
  const phrases = extractIdentityPhrases(label);
  const numbered = phrases.filter((phrase) => phrase.some((t) => /\d/.test(t)));
  for (const phrase of numbered.length > 0 ? numbered : phrases) {
    if (phrase.every((t) => certsHeldTokens.has(t))) return true;
  }
  const words = significantWords(extractCoreLabel(label));
  if (words.length === 0) return false;
  const hits = words.filter((w) => certsHeldTokens.has(w)).length;
  const required = words.length === 1 ? 1 : Math.max(2, Math.ceil(words.length * 0.6));
  return hits >= required;
}

function buildJobBoardLinks(trade: string, location: string): { label: string; href: string }[] {
  const q = encodeURIComponent(trade);
  const l = encodeURIComponent(location.trim());
  return [
    { label: "Search Indeed", href: `https://www.indeed.com/jobs?q=${q}&l=${l}` },
    { label: "Search LinkedIn Jobs", href: `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${l}` },
    {
      label: "Search apprenticeship.gov",
      href: `https://www.apprenticeship.gov/apprenticeship-job-finder?occupation=${q}&location=${l}`,
    },
  ];
}
