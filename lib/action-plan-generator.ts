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
// real hours to give it each week. A visitor who said they have fewer
// hours available gets the same steps stretched over more calendar days
// rather than content being cut -- nothing on the list gets skipped just
// because someone has less time, it just takes longer to get through.
const REFERENCE_HOURS_PER_WEEK = 10;

function addDays(base: Date, days: number): Date {
  return new Date(base.getTime() + days * MS_PER_DAY);
}

// Scales the skeleton's authored day offsets to fit how much time the
// visitor actually has. If they gave a target timeline, that wins (the
// plan is stretched or compressed to land on that many weeks). Otherwise
// pace alone decides: fewer hours per week than the reference pace spreads
// the same steps over more days.
function computeScale(skeleton: ActionPlan, intake: ActionPlanIntake): number {
  const referenceSpanDays = skeleton.dayByDay.reduce((max, item) => Math.max(max, item.dayEnd), 1);
  if (intake.timelineWeeks > 0) {
    return (intake.timelineWeeks * 7) / referenceSpanDays;
  }
  const hours = Math.max(intake.hoursPerWeek, 1);
  return REFERENCE_HOURS_PER_WEEK / hours;
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
  const scale = computeScale(skeleton, intake);
  const certsHeldTokens = tokenize(intake.certsHeld);

  const days: GeneratedDayItem[] = skeleton.dayByDay
    .filter((item) => item.appliesWhen === "both" || item.appliesWhen === intake.status)
    .map((item) => {
      const scaledStart = Math.max(1, Math.round(item.dayStart * scale));
      const scaledEnd = Math.max(scaledStart, Math.round(item.dayEnd * scale));
      return {
        dayStart: scaledStart,
        dayEnd: scaledEnd,
        title: item.title,
        detail: item.detail,
        startDate: addDays(startDate, scaledStart - 1),
        endDate: addDays(startDate, scaledEnd - 1),
      };
    })
    .sort((a, b) => a.dayStart - b.dayStart);

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
