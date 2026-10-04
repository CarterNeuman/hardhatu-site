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
export type CareerRef = { id: string; title: string; slug: string };

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
  dayStart: number;
  dayEnd: number;
  title: string;
  detail: string;
  startDate: Date;
  endDate: Date;
};

export type GeneratedQualification = {
  label: string;
  have: boolean;
};

export type GeneratedPlan = {
  category: string;
  careerTitle?: string;
  status: ApplicationStatus;
  overview: string;
  qualifications: GeneratedQualification[];
  courses: { lesson: LessonRef; href: string }[];
  resumeBullets: string[];
  resumeGuideHref?: string;
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

type RawDay = { dayStart: number; dayEnd: number; title: string; detail: string };

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
  const cadenceDays = Math.max(cadence.minDays, Math.round(cadence.referenceDays / densityFactor));
  const scaledSpan = Math.max(1, Math.round((item.dayEnd - item.dayStart + 1) * paceScale));
  const firstStart = Math.min(totalDays, Math.max(1, Math.round(item.dayStart * paceScale)));

  const spans: { dayStart: number; dayEnd: number }[] = [];
  let cursor = firstStart;
  while (cursor <= totalDays && spans.length < cadence.maxInstances) {
    spans.push({ dayStart: cursor, dayEnd: Math.min(totalDays, cursor + scaledSpan - 1) });
    cursor += cadenceDays;
  }

  return spans.map((span, i) => ({
    dayStart: span.dayStart,
    dayEnd: span.dayEnd,
    title: spans.length > 1 ? `${item.title} (round ${i + 1} of ${spans.length})` : item.title,
    detail: item.detail,
  }));
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

export function buildActionPlan({
  skeleton,
  getHiredGuide,
  resumeGuide,
  lessonsForCareer,
  categoryFallbackLessons = [],
  career,
  intake,
  startDate = new Date(),
}: {
  skeleton: ActionPlan;
  getHiredGuide?: GetHired;
  resumeGuide?: ResumeGuide;
  lessonsForCareer: LessonRef[];
  // Shown when no specific career was picked (or that career happens to
  // have no lessons tied to it yet) -- a few lessons for the category as
  // a whole, so "Not sure yet, keep it general" doesn't come back with an
  // empty Courses section. See app/action-plan/page.tsx for how this gets
  // built.
  categoryFallbackLessons?: LessonRef[];
  career?: CareerRef;
  intake: ActionPlanIntake;
  startDate?: Date;
}): GeneratedPlan {
  const certsHeldTokens = tokenize(intake.certsHeld);

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
  const totalDays = computeTotalDays(referenceSpanDays, intake);
  const paceScale = computePaceScale(intake.hoursPerWeek);
  const densityFactor = computeDensityFactor(intake.hoursPerWeek);

  const rawDays: RawDay[] = [];
  for (const item of skeleton.dayByDay) {
    if (item.appliesWhen !== "both" && item.appliesWhen !== intake.status) continue;
    if (item.recurring) {
      rawDays.push(...expandRecurringItem(item, paceScale, densityFactor, totalDays));
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
      rawDays.push({ dayStart: scaledStart, dayEnd: scaledEnd, title: item.title, detail: item.detail });
      continue;
    }
    const scaledStart = Math.min(totalDays, Math.max(1, Math.round(item.dayStart * paceScale)));
    const scaledEnd = Math.min(totalDays, Math.max(scaledStart, Math.round(item.dayEnd * paceScale)));
    rawDays.push({ dayStart: scaledStart, dayEnd: scaledEnd, title: item.title, detail: item.detail });
  }

  const days: GeneratedDayItem[] = rawDays
    .map((item) => ({
      ...item,
      startDate: addDays(startDate, item.dayStart - 1),
      endDate: addDays(startDate, item.dayEnd - 1),
    }))
    .sort((a, b) => a.dayStart - b.dayStart || a.dayEnd - b.dayEnd);

  const qualifications: GeneratedQualification[] = (getHiredGuide?.credentialsToHaveReady ?? []).map(
    (label) => ({
      label,
      have: certsHeldTokens.size > 0 && labelLooksHeld(label, certsHeldTokens),
    })
  );

  const trade = career?.title ?? skeleton.category;
  const tokens = { Trade: trade, Location: intake.location.trim() };
  const courses = lessonsForCareer.length > 0 ? lessonsForCareer : categoryFallbackLessons;

  return {
    category: skeleton.category,
    careerTitle: career?.title,
    status: intake.status,
    overview: skeleton.overview,
    qualifications,
    courses: courses.slice(0, 4).map((lesson) => ({ lesson, href: `/lessons/${lesson.slug}` })),
    resumeBullets: resumeGuide?.exampleBullets.slice(0, 5) ?? [],
    resumeGuideHref: resumeGuide ? `/resumes/${resumeGuide.slug}` : undefined,
    days,
    targetEmployerTypes: skeleton.targetEmployerTypes,
    whereToLook: getHiredGuide?.whereToLook ?? [],
    jobBoardLinks: buildJobBoardLinks(trade, intake.location),
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
// it counts as a match (a real false negative this caught during review).
// This pulls out just the leading short-name clause, up to whichever of
// ", " / ". " / " and " comes first, and falls back to the full label if
// none of those appear.
function extractCoreLabel(label: string): string {
  const delimiters = [", ", ". ", " and "];
  let cut = label.length;
  for (const d of delimiters) {
    const i = label.indexOf(d);
    if (i !== -1 && i < cut) cut = i;
  }
  return label.slice(0, cut);
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "if", "any", "in", "on", "of", "to", "is",
  "for", "you", "your", "with", "have", "card", "valid", "whatever",
]);

function significantWords(text: string): string[] {
  return [...tokenize(text)].filter((w) => !STOPWORDS.has(w));
}

// A credential "counts" as held only when most of its own significant
// words show up as exact tokens in what the visitor typed, scaled to the
// label's length so a two-word core ("drivers", "license") needs both,
// not just one -- a single shared word was enough to flag a credential
// as held under the old substring version, which is exactly the kind of
// false positive a visitor pasting unrelated or nonsense text could
// trigger by accident. Worst case either way is informational (one item
// shows the wrong checkmark), never a crash and never anything the
// visitor typed being shown back to them.
function labelLooksHeld(label: string, certsHeldTokens: Set<string>): boolean {
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
