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

export type ActionPlanIntake = {
  category: string;
  careerId?: string;
  status: ApplicationStatus;
  location: string;
  hoursPerWeek: number;
  timelineWeeks: number;
  // Free-text, comma or newline separated -- matched loosely (case-
  // insensitive substring) against each credential's own text rather than
  // forced into a fixed checklist, since real credential names vary (an
  // "OSHA 10" card might get typed "osha-10" or "OSHA ten").
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

function fillTemplate(template: string, tokens: Record<string, string>): string {
  let result = template.trim();
  for (const [key, value] of Object.entries(tokens)) {
    if (!value) continue;
    result = result.replace(new RegExp(`\\[${key}\\]`, "gi"), value);
  }
  return result;
}

export function buildActionPlan({
  skeleton,
  getHiredGuide,
  resumeGuide,
  lessonsForCareer,
  career,
  intake,
  startDate = new Date(),
}: {
  skeleton: ActionPlan;
  getHiredGuide?: GetHired;
  resumeGuide?: ResumeGuide;
  lessonsForCareer: LessonRef[];
  career?: CareerRef;
  intake: ActionPlanIntake;
  startDate?: Date;
}): GeneratedPlan {
  const scale = computeScale(skeleton, intake);
  const certsHeldText = intake.certsHeld.toLowerCase();

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
      have: certsHeldText.length > 0 && labelLooksHeld(label, certsHeldText),
    })
  );

  const trade = career?.title ?? skeleton.category;
  const tokens = { Trade: trade, Location: intake.location };

  return {
    category: skeleton.category,
    careerTitle: career?.title,
    status: intake.status,
    overview: skeleton.overview,
    qualifications,
    courses: lessonsForCareer.slice(0, 4).map((lesson) => ({ lesson, href: `/lessons/${lesson.slug}` })),
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

// Loose match: a credential "counts" as held if a few of its own
// significant words show up in what the visitor typed. Intentionally
// forgiving (a false "have it" just means one fewer item to double check,
// not a broken plan) rather than a brittle exact-string match.
function labelLooksHeld(label: string, certsHeldText: string): boolean {
  const words = label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
  if (words.length === 0) return false;
  const hits = words.filter((w) => certsHeldText.includes(w)).length;
  return hits >= Math.max(1, Math.ceil(words.length * 0.4));
}

const STOPWORDS = new Set(["and", "the", "for", "you", "your", "with", "have", "card", "valid", "whatever"]);

function buildJobBoardLinks(trade: string, location: string): { label: string; href: string }[] {
  const q = encodeURIComponent(trade);
  const l = encodeURIComponent(location || "");
  return [
    { label: "Search Indeed", href: `https://www.indeed.com/jobs?q=${q}&l=${l}` },
    { label: "Search LinkedIn Jobs", href: `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${l}` },
    {
      label: "Search apprenticeship.gov",
      href: `https://www.apprenticeship.gov/apprenticeship-job-finder?occupation=${q}&location=${l}`,
    },
  ];
}
