import { z } from "zod";

// Shared fields every content type carries (see build-brief.md section 7).
const base = {
  id: z.string(),
  title: z.string(),
  tier: z.enum(["free", "premium"]).default("free"),
  relatedIds: z.array(z.string()).default([]),
  // Curated subset of relatedIds — the 10-15 most relevant connections,
  // meant to be a couple of careers plus a handful of concepts/software
  // for a career page, so "Explore next" reads as genuinely relevant
  // rather than a wall of every tangential link. Capped at 15 so it can
  // never regress into the problem it exists to solve. Optional/empty by
  // default: a content type that hasn't been curated yet just falls back
  // to showing its full relatedIds list (see RelatedLinks.tsx).
  recommendedIds: z.array(z.string()).max(15).default([]),
  // Optional SEO/meta field. Falls back to a type-specific field (tagline,
  // definition, etc.) at render time if left blank in the content file.
  metaDescription: z.string().optional(),
  // Optional hero/illustration image path, e.g. "/images/careers/pm.jpg".
  // Not required for MVP — reserved so adding images later is a content
  // change, not a schema change.
  image: z.string().optional(),
  // Optional "as of" date for anything that can go stale (costs, licensing
  // specifics). Rendered as a small disclaimer line when present.
  lastReviewed: z.string().optional(),
};

export const CareerSchema = z.object({
  ...base,
  type: z.literal("career"),
  // Free text on purpose, same reasoning as software's `category` — e.g.
  // "Field & Trades", "Project & Operations", "Insurance & Claims". Matches
  // the groupings in content-inventory.md so the site's career listing can
  // be organized the same way the content plan already is.
  category: z.string(),
  tagline: z.string(),
  whatIs: z.string(),
  whatTheyDo: z.array(z.string()).default([]),
  typicalDay: z
    .array(z.object({ time: z.string(), activity: z.string() }))
    .default([]),
  whereTheyWork: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  software: z.array(z.string()).default([]),
  education: z
    .object({
      required: z.string().optional(),
      preferred: z.string().optional(),
      helpful: z.string().optional(),
      notNecessary: z.string().optional(),
    })
    .optional(),
  progression: z.array(z.string()).default([]),
  hirerTypes: z.array(z.string()).default([]),
  // Pay at three career-stage milestones — entry level, 5 years in, and 20
  // years in — shown as a range timeline right under the career's "What is
  // a ___?" intro, the standard placement for every career page.
  // Career-only (not in `base`): pay doesn't apply to a Concept or a
  // Software profile. Optional and per-career; a career without this just
  // doesn't render the timeline yet. Always a range, never a single
  // number — BLS doesn't track pay by years of experience, so these bands
  // are estimates drawn from the national wage *distribution* for the
  // occupation (entry ~ lower percentiles, 5-year ~ around the median,
  // 20-year ~ upper percentiles), not a literal "at year 5 you'll earn
  // exactly X" claim. See components/PayTimeline.tsx for the disclaimer
  // that always ships alongside this data.
  payTimeline: z
    .object({
      unit: z.enum(["annual", "hourly"]).default("annual"),
      entry: z.object({ low: z.number(), high: z.number() }),
      fiveYear: z.object({ low: z.number(), high: z.number() }),
      twentyYear: z.object({ low: z.number(), high: z.number() }),
      // e.g. "U.S. Bureau of Labor Statistics, Occupational Employment and
      // Wage Statistics (OEWS)" — shown in the on-page disclaimer so the
      // numbers are never unsourced.
      source: z.string(),
      // The data vintage, e.g. "May 2025" — kept separate from `source` so
      // it can be checked/flagged for staleness without re-parsing a string.
      asOf: z.string(),
    })
    .optional(),
});

export const ConceptSchema = z.object({
  ...base,
  type: z.literal("concept"),
  // Which of the 6 CONCEPT_CATEGORY_ORDER buckets this term belongs to (see
  // content-inventory.md) — e.g. "Project Process & Lifecycle", "Contracts
  // & Business". Required so every concept can be grouped in the Concepts
  // dropdown and index page the same way careers/interviews/exams already
  // are, rather than the whole glossary being one flat list.
  category: z.string(),
  definition: z.string(),
  whyItMatters: z.string().optional(),
  example: z.string().optional(),
  // The two fields that are supposed to make a concept page worth more than
  // a Google definition: which specific career actually lives inside this
  // concept day-to-day and why (not just "several careers relate to this" —
  // relatedIds already covers that), and a concrete, real scenario of what
  // goes wrong when it's skipped, misunderstood, or done carelessly.
  // Required (not optional) on purpose — every concept has to earn both, no
  // exceptions — and validate-content.mjs enforces the same.
  careerAngle: z.string(),
  whatGoesWrong: z.string(),
  // Only set for Materials & Systems concepts (CSI MasterFormat division).
  csiDivision: z.string().optional(),
  // Report fields — reserved for the future "report" feature, empty for now.
  materialProperties: z.string().optional(),
  constructionMethod: z.string().optional(),
  typicalCost: z
    .object({ range: z.string(), unit: z.string(), asOf: z.string() })
    .optional(),
  videoUrl: z.string().optional(),
});

export const PhaseSchema = z.object({
  ...base,
  type: z.literal("phase"),
  order: z.number(),
  whatHappens: z.string(),
  whoIsInvolved: z.array(z.string()).default([]),
  whatCanGoWrong: z.string().optional(),
  // Four "big picture" fields added so Phases teaches real industry
  // intuition, not just a summary of activities. All optional and meant to
  // be used selectively (see hardhatu-overview notes): not every phase will
  // have a strong fit for all four, e.g. Operations & Maintenance won't have
  // much of a costOfChangeCurve story since it's the cheapest phase to
  // change things in.
  // How expensive it is to change your mind during this phase, and why —
  // the single most useful mental model for understanding why front-loaded
  // phases (Design, Permitting) matter as much as they do.
  costOfChangeCurve: z.string().optional(),
  // A felt sense of pacing: how long this phase typically takes, what
  // stretches or compresses it. Prose, not a strict numeric duration, since
  // real ranges vary too much by project type/size to state as one figure.
  timeline: z.string().optional(),
  // One real misconception newcomers have about this phase, corrected.
  commonMisconception: z.string().optional(),
  // Where the strict textbook sequence this section implies breaks down in
  // real practice — overlap, fast-tracking, design-build, phases repeating
  // (e.g. renovation/restoration restarting a mini version of phases 1-8).
  nonLinearReality: z.string().optional(),
});

// One multiple-choice question — a lesson's inline check-in, and (below)
// the building block of a standalone exam-prep question bank. Exported
// since both use exactly the same shape.
export const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  answerIndex: z.number(),
  // Shown after an answer is picked, correct or not — the reasoning is the
  // actual point, not the click.
  explanation: z.string().optional(),
});

// One reading chunk, optionally capped with a check-in question. A lesson
// is an ordered list of these rather than one long block of text followed
// by a pile of questions at the end — a question every couple of minutes
// keeps a long lesson from reading as one unbroken wall of text, and gives
// a reader a reason to actually stop and check they followed the part they
// just read before moving on.
export const LessonSchema = z.object({
  ...base,
  type: z.literal("lesson"),
  minutes: z.number(),
  sections: z
    .array(
      z.object({
        content: z.string(),
        quiz: quizQuestionSchema.optional(),
      })
    )
    .min(1),
  keyTerms: z.array(z.string()).default([]),
  nextLessonId: z.string().optional(),
});

// Software used on the job — a Procore, a Bluebeam, a PlanGrid. Kept as its
// own content type (not folded into Concepts) because it has its own shape:
// what it does, its key features, and — the actual point of this section —
// tutorial videos and deeper how-to material. That deeper material is meant
// to sit behind the paywall once one exists (see `tier`); the field already
// works today, it's just not enforced anywhere yet.
export const SoftwareSchema = z.object({
  ...base,
  type: z.literal("software"),
  // Free text on purpose rather than an enum — e.g. "Project management",
  // "Estimating", "Scheduling", "Design & BIM", "Accounting", "Field
  // management", "Safety". Easiest to widen as more software gets added.
  category: z.string(),
  whatItIs: z.string(), // one-line description, shown like a career's tagline
  whatItDoes: z.string(), // fuller explanation of what it's actually for
  keyFeatures: z.array(z.string()).default([]),
  // Concrete, real-world scenarios — not a features list restated. This is
  // the "useful functions" half of what makes this section worth paying for.
  commonUses: z.array(z.string()).default([]),
  // Empty for every profile today — the schema has room for these so adding
  // videos later is a content change, not a rebuild.
  tutorialVideos: z
    .array(z.object({ title: z.string(), url: z.string() }))
    .default([]),
  pricingModel: z.string().optional(), // e.g. "Subscription, per-user/month"
  website: z.string().optional(),
});

// A Get Hired guide: the site's one guide per career umbrella (the same 8
// categories as CAREER_CATEGORY_ORDER) walking someone through how hiring
// actually works in that part of the industry and what to do about it —
// replaces the old schema-only, never-built Pathway type. `category` is
// required (not optional like Interview Prep's) since this type is
// deliberately exactly 8 guides, one per umbrella, no general/career-
// specific variants planned.
export const GetHiredSchema = z
  .object({
    ...base,
    type: z.literal("gethired"),
    category: z.string(),
    tagline: z.string(),
    // True for a guide that's listed (so the section exists and is
    // navigable) before its real checklist content has been written —
    // the "skeleton" state, same pattern as ExamPrepSchema's comingSoon.
    // Once real content is ready, flip to false and the fields below are
    // enforced by the superRefine below.
    comingSoon: z.boolean().default(false),
    // Short narrative: what hiring actually looks like in this umbrella
    // (who hires, through what channel) before the step-by-step checklist.
    howHiringWorks: z.string().default(""),
    // The actual step-by-step checklist — the whole point of the page.
    // Ordered, same {label, detail} shape as Career's typicalDay.
    checklist: z
      .array(z.object({ step: z.string(), detail: z.string() }))
      .default([]),
    // Concrete channels — union halls, staffing agencies, job boards,
    // licensing bodies — free text since real specifics are local/regional
    // and shouldn't be overclaimed as one nationwide answer.
    whereToLook: z.array(z.string()).default([]),
    // Optional — certs/documents worth having ready (OSHA 10 card,
    // driver's license, portfolio, transcript). Not every umbrella needs
    // this, so it stays a plain array rather than a required field.
    credentialsToHaveReady: z.array(z.string()).default([]),
    // Concrete, specific pitfalls — same spirit as Concept's whatGoesWrong,
    // not generic "tailor your resume" advice.
    commonMistakes: z.array(z.string()).default([]),
    // One specific, doable-today action — rendered as its own callout so
    // the page always ends with something to actually go do.
    firstStepToday: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.comingSoon) return;
    if (!data.howHiringWorks) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "howHiringWorks is required once a get-hired guide is live (or set comingSoon: true)",
        path: ["howHiringWorks"],
      });
    }
    if (data.checklist.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "checklist needs at least 4 steps once live — a real checklist, not a token gesture (or set comingSoon: true)",
        path: ["checklist"],
      });
    }
    if (data.whereToLook.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "whereToLook needs at least 1 entry once live (or set comingSoon: true)",
        path: ["whereToLook"],
      });
    }
    if (data.commonMistakes.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "commonMistakes needs at least 1 entry once live (or set comingSoon: true)",
        path: ["commonMistakes"],
      });
    }
    if (!data.firstStepToday) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "firstStepToday is required once live (or set comingSoon: true)",
        path: ["firstStepToday"],
      });
    }
  });

// A resume-building guide. Kept general-purpose: `careerId` is optional
// because some guides will be construction-wide ("Construction Resume
// Basics") and some will be written for one specific career ("Electrician
// Apprenticeship Resume") — same as some Concepts apply industry-wide and
// some are trade-specific.
export const ResumeGuideSchema = z.object({
  ...base,
  type: z.literal("resume"),
  careerId: z.string().optional(),
  category: z.string().optional(),
  tagline: z.string(),
  sections: z
    .array(z.object({ heading: z.string(), content: z.string() }))
    .min(1),
  // Concrete, copy-and-adapt bullet points — the actual practical payoff
  // over generic "tailor your resume" advice.
  exampleBullets: z.array(z.string()).default([]),
});

// An interview-prep guide — the natural sibling to a Resume Guide.
// `careerId`/`category` optional for the same reason as Resume Guide: some
// guides are general ("How Construction Interviews Work"), some are
// written for one specific career.
export const InterviewPrepSchema = z.object({
  ...base,
  type: z.literal("interview"),
  careerId: z.string().optional(),
  category: z.string().optional(),
  tagline: z.string(),
  questions: z
    .array(
      z.object({
        question: z.string(),
        // What the interviewer is actually screening for when they ask
        // this — the part generic interview advice usually skips.
        whatTheyreAssessing: z.string().optional(),
        strongAnswerTips: z.string().optional(),
      })
    )
    .min(1),
});

// A standalone practice-question bank for a real, named certification or
// exam (OSHA 10, an NCCER module test, a journeyman license exam) — as
// opposed to a Lesson's inline check-ins, which exist to break up reading,
// not to simulate a real test. Reuses quizQuestionSchema so both draw from
// the same question shape.
//
// These reference real third-party certifications by name, which is
// legally fine (nominative fair use — naming a real exam to say you offer
// unofficial prep for it doesn't require permission) as long as the page
// never implies affiliation or endorsement. `organization` + `officialUrl`
// exist specifically to support a clear non-affiliation disclaimer and a
// link to the real, authoritative source on every exam page — see
// components/ExamDisclaimer.tsx.
export const ExamPrepSchema = z
  .object({
    ...base,
    type: z.literal("exam"),
    // The real-world exam this prepares someone for, e.g. "OSHA 10",
    // "NCCER Core Curriculum", "Journeyman Electrician License".
    examName: z.string(),
    // The certifying body, e.g. "OSHA", "PMI", "NCCER" — shown in the
    // required non-affiliation disclaimer on the exam's page.
    organization: z.string().optional(),
    // Link to the certifying body's own page for this exam — registration,
    // official content outline, pricing. Always shown alongside the
    // disclaimer so a visitor never mistakes this page for the real thing.
    officialUrl: z.string().optional(),
    careerId: z.string().optional(),
    category: z.string().optional(),
    tagline: z.string(),
    // True for an exam guide that's listed (so people can see what prep is
    // planned) before any practice questions have been written yet — the
    // "skeleton" state. Once real content is ready, flip to false and the
    // 5-question minimum below is enforced.
    comingSoon: z.boolean().default(false),
    // Minimum 5 once live, so this is a real practice set and not a token
    // gesture — same reasoning as a Pathway's minimum 5 lessons. Defaults
    // to empty so a comingSoon placeholder file doesn't need a fake array.
    questions: z.array(quizQuestionSchema).default([]),
  })
  .superRefine((data, ctx) => {
    if (!data.comingSoon && data.questions.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "questions needs at least 5 once an exam guide is live, or set comingSoon: true while it's still a placeholder",
        path: ["questions"],
      });
    }
  });

// A printable/downloadable one-pager summarizing a cluster of concepts
// already in the glossary — e.g. "Division 03 Concrete Terms". Points at
// real concept ids rather than restating definitions, so it can't drift
// out of sync with the glossary entries it's summarizing.
export const CheatSheetSchema = z.object({
  ...base,
  type: z.literal("cheatsheet"),
  category: z.string().optional(), // e.g. a CSI division or concept bucket
  tagline: z.string(),
  conceptIds: z.array(z.string()).min(1),
  // Path to a generated/exported printable version, once one exists.
  downloadUrl: z.string().optional(),
});

// One answer option in a Career Match question — points toward whichever
// categories and/or specific careers picking it suggests. An option can
// point toward more than one of either; scoring (tallying points at quiz
// time) is a future display-layer concern, not something this shape needs
// to solve now.
const matchQuizOptionSchema = z.object({
  label: z.string(),
  pointsToCategories: z.array(z.string()).default([]),
  pointsToCareerIds: z.array(z.string()).default([]),
});

const matchQuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(matchQuizOptionSchema).min(2),
});

// The "what construction career is right for you?" quiz — the highest
// signal-to-effort item on the whole idea list, since most visitors arrive
// not knowing what they're looking for. Modeled as a real content type
// (not a one-off page) in case a more specific quiz makes sense later,
// e.g. one scoped to a single category.
export const CareerMatchQuizSchema = z.object({
  ...base,
  type: z.literal("quiz"),
  tagline: z.string(),
  questions: z.array(matchQuizQuestionSchema).min(3),
});

// A real apprenticeship, trade school, or certificate program someone
// could actually enroll in — the closest equivalent to NCCER's "Find a
// Center". Deliberately just a content type like any other (no accounts
// needed to browse a directory); keeping it accurate over time is a real
// content-maintenance commitment, but not a technical one.
export const ProgramSchema = z.object({
  ...base,
  type: z.literal("program"),
  // Free text — "Registered Apprenticeship", "Trade School", "Union
  // Program", "Certificate Program", "Online Course".
  programType: z.string(),
  careerIds: z.array(z.string()).default([]),
  organization: z.string(),
  location: z.string(), // city/state, or "Nationwide" / "Online"
  website: z.string().optional(),
  tagline: z.string(),
  whatToExpect: z.string().optional(),
  costNote: z.string().optional(), // e.g. "Paid apprenticeship — no tuition"
  durationNote: z.string().optional(), // e.g. "4 years, paid"
});

// Display order for grouping the career listing by category — matches
// content-inventory.md. Purely cosmetic: a career with a category not
// listed here still works fine, it just sorts after these.
export const CAREER_CATEGORY_ORDER = [
  "Field & Trades",
  "Project & Operations",
  "Preconstruction & Estimating",
  "Business",
  "Technology & Design",
  "Specialized Construction",
  "Insurance & Claims",
  "Consultants & Advisory",
];

// Display order for grouping the concept glossary by category — matches
// the 6 buckets in content-inventory.md (A through F). A concept with a
// category not listed here still works fine, it just sorts after these.
export const CONCEPT_CATEGORY_ORDER = [
  "Project Process & Lifecycle",
  "Contracts & Business",
  "Materials & Systems",
  "Insurance & Restoration",
  "Safety & Regulatory Compliance",
  "Technology, Data & Sustainability",
];

export type ContentType =
  | "career"
  | "concept"
  | "phase"
  | "lesson"
  | "software"
  | "gethired"
  | "resume"
  | "interview"
  | "exam"
  | "cheatsheet"
  | "quiz"
  | "program";

export type Career = z.infer<typeof CareerSchema> & { slug: string; body: string };
export type Concept = z.infer<typeof ConceptSchema> & { slug: string; body: string };
export type Phase = z.infer<typeof PhaseSchema> & { slug: string; body: string };
export type Lesson = z.infer<typeof LessonSchema> & { slug: string; body: string };
export type Software = z.infer<typeof SoftwareSchema> & { slug: string; body: string };
export type GetHired = z.infer<typeof GetHiredSchema> & { slug: string; body: string };
export type ResumeGuide = z.infer<typeof ResumeGuideSchema> & { slug: string; body: string };
export type InterviewPrep = z.infer<typeof InterviewPrepSchema> & { slug: string; body: string };
export type ExamPrep = z.infer<typeof ExamPrepSchema> & { slug: string; body: string };
export type CheatSheet = z.infer<typeof CheatSheetSchema> & { slug: string; body: string };
export type CareerMatchQuiz = z.infer<typeof CareerMatchQuizSchema> & { slug: string; body: string };
export type Program = z.infer<typeof ProgramSchema> & { slug: string; body: string };

export type AnyContent =
  | Career
  | Concept
  | Phase
  | Lesson
  | Software
  | GetHired
  | ResumeGuide
  | InterviewPrep
  | ExamPrep
  | CheatSheet
  | CareerMatchQuiz
  | Program;
