import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  CareerSchema,
  ConceptSchema,
  PhaseSchema,
  LessonSchema,
  SoftwareSchema,
  GetHiredSchema,
  ResumeGuideSchema,
  InterviewPrepSchema,
  ExamPrepSchema,
  CheatSheetSchema,
  CareerMatchQuizSchema,
  ProgramSchema,
  ActionPlanSchema,
  type AnyContent,
  type Career,
  type Concept,
  type Phase,
  type Lesson,
  type Software,
  type GetHired,
  type ResumeGuide,
  type ContentType,
  type InterviewPrep,
  type ExamPrep,
  type CheatSheet,
  type CareerMatchQuiz,
  type Program,
  type ActionPlan,
} from "./types";
import { CONTENT_TYPE_DIR } from "./content-registry";

const CONTENT_DIR = path.join(process.cwd(), "content");

type TypeConfig = {
  dir: string;
  prefix: string;
  schema:
    | typeof CareerSchema
    | typeof ConceptSchema
    | typeof PhaseSchema
    | typeof LessonSchema
    | typeof SoftwareSchema
    | typeof GetHiredSchema
    | typeof ResumeGuideSchema
    | typeof InterviewPrepSchema
    | typeof ExamPrepSchema
    | typeof CheatSheetSchema
    | typeof CareerMatchQuizSchema
    | typeof ProgramSchema
    | typeof ActionPlanSchema;
};

// Every content type's folder name, id prefix, and validation schema.
// Adding another type later means adding one line here. Everything below
// Software is registered schema-only for now — no pages or content files
// yet — so each one loads, validates, and cross-links exactly like
// everything else the moment real content shows up in its folder.
export const TYPE_CONFIG: Record<ContentType, TypeConfig> = {
  career: { dir: CONTENT_TYPE_DIR.career, prefix: "career-", schema: CareerSchema },
  concept: { dir: CONTENT_TYPE_DIR.concept, prefix: "concept-", schema: ConceptSchema },
  phase: { dir: CONTENT_TYPE_DIR.phase, prefix: "phase-", schema: PhaseSchema },
  lesson: { dir: CONTENT_TYPE_DIR.lesson, prefix: "lesson-", schema: LessonSchema },
  software: { dir: CONTENT_TYPE_DIR.software, prefix: "software-", schema: SoftwareSchema },
  gethired: { dir: CONTENT_TYPE_DIR.gethired, prefix: "gethired-", schema: GetHiredSchema },
  resume: { dir: CONTENT_TYPE_DIR.resume, prefix: "resume-", schema: ResumeGuideSchema },
  interview: { dir: CONTENT_TYPE_DIR.interview, prefix: "interview-", schema: InterviewPrepSchema },
  exam: { dir: CONTENT_TYPE_DIR.exam, prefix: "exam-", schema: ExamPrepSchema },
  cheatsheet: { dir: CONTENT_TYPE_DIR.cheatsheet, prefix: "cheatsheet-", schema: CheatSheetSchema },
  quiz: { dir: CONTENT_TYPE_DIR.quiz, prefix: "quiz-", schema: CareerMatchQuizSchema },
  program: { dir: CONTENT_TYPE_DIR.program, prefix: "program-", schema: ProgramSchema },
  actionplan: { dir: CONTENT_TYPE_DIR.actionplan, prefix: "actionplan-", schema: ActionPlanSchema },
};

// The public URL slug reuses the id you already write in frontmatter
// (e.g. "career-project-manager") and just strips the type prefix
// ("project-manager"). No separate slug field to keep in sync.
function slugFromId(id: string, prefix: string): string {
  return id.startsWith(prefix) ? id.slice(prefix.length) : id;
}

function loadType<T extends AnyContent = AnyContent>(type: ContentType): T[] {
  const config = TYPE_CONFIG[type];
  const dirPath = path.join(CONTENT_DIR, config.dir);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dirPath, filename), "utf8");
      const { data, content } = matter(raw);
      const parsed = config.schema.parse({ ...data, type });
      const slug = slugFromId(parsed.id, config.prefix);
      return { ...parsed, slug, body: content.trim() } as T;
    });
}

type ContentStore = {
  careers: Career[];
  concepts: Concept[];
  phases: Phase[];
  lessons: Lesson[];
  software: Software[];
  getHiredGuides: GetHired[];
  resumes: ResumeGuide[];
  interviews: InterviewPrep[];
  exams: ExamPrep[];
  cheatsheets: CheatSheet[];
  quizzes: CareerMatchQuiz[];
  programs: Program[];
  actionPlans: ActionPlan[];
  all: AnyContent[];
  byId: Map<string, AnyContent>;
};

let cache: ContentStore | null = null;

export function getAllContent(): ContentStore {
  if (cache) return cache;

  const careers = loadType<Career>("career");
  const concepts = loadType<Concept>("concept");
  const phases = loadType<Phase>("phase");
  const lessons = loadType<Lesson>("lesson");
  const software = loadType<Software>("software");
  const getHiredGuides = loadType<GetHired>("gethired");
  const resumes = loadType<ResumeGuide>("resume");
  const interviews = loadType<InterviewPrep>("interview");
  const exams = loadType<ExamPrep>("exam");
  const cheatsheets = loadType<CheatSheet>("cheatsheet");
  const quizzes = loadType<CareerMatchQuiz>("quiz");
  const programs = loadType<Program>("program");
  const actionPlans = loadType<ActionPlan>("actionplan");
  const all = [
    ...careers,
    ...concepts,
    ...phases,
    ...lessons,
    ...software,
    ...getHiredGuides,
    ...resumes,
    ...interviews,
    ...exams,
    ...cheatsheets,
    ...quizzes,
    ...programs,
    ...actionPlans,
  ];

  cache = {
    careers,
    concepts,
    phases,
    lessons,
    software,
    getHiredGuides,
    resumes,
    interviews,
    exams,
    cheatsheets,
    quizzes,
    programs,
    actionPlans,
    all,
    byId: new Map(all.map((node) => [node.id, node])),
  };
  return cache;
}

export function getBySlug(
  type: ContentType,
  slug: string
): AnyContent | undefined {
  const { all } = getAllContent();
  return all.find((node) => node.type === type && node.slug === slug);
}

export function getRelated(node: AnyContent): AnyContent[] {
  const { byId } = getAllContent();
  return node.relatedIds
    .map((id) => byId.get(id))
    .filter((n): n is AnyContent => Boolean(n));
}

// The curated subset of getRelated() — recommendedIds resolved to real
// content, meant to be the 10-15 items RelatedLinks shows up front. Empty
// for any content item that hasn't been curated yet, which RelatedLinks
// treats as "no curation yet, show the full related list instead".
export function getRecommended(node: AnyContent): AnyContent[] {
  const { byId } = getAllContent();
  return node.recommendedIds
    .map((id) => byId.get(id))
    .filter((n): n is AnyContent => Boolean(n));
}

// Reverse lookup: every Program whose careerIds includes this career --
// the inverse of Program.careerIds, same pattern as getRelated/getRecommended
// but keyed off a field rather than relatedIds. Used by the Career page's
// "Training & Programs" box and by the Programs finder's career filter.
// A career with no matching program (most of them, for now) just gets an
// empty array, which the Career page treats as "don't render the box" --
// same fallback-to-nothing convention as every other optional section.
export function getProgramsForCareer(careerId: string): Program[] {
  const { programs } = getAllContent();
  return programs.filter((p) => p.careerIds.includes(careerId));
}

// Reverse lookup for every page that ISN'T a career: any Program that
// names this item in its own relatedIds (a concept like
// concept-apprenticeship-program, an exam like exam-osha-10, a lesson, a
// Get Hired guide) or, for a career, in its careerIds. Lets those pages
// show a "Where to train" box without each one hand-listing programs in
// its own relatedIds -- with 20+ programs pointing at the same two or
// three concepts, hand-listing would bury the "Explore next" row.
export function getProgramsLinkedTo(id: string): Program[] {
  const { programs } = getAllContent();
  return programs.filter((p) => p.careerIds.includes(id) || p.relatedIds.includes(id));
}

// The three job-hunt guides for a career category, plus the general
// Get Hired guide as a fallback -- what components/JobHuntRail.tsx links
// together so Get Hired, Resume Guide, Interview Prep and the Blueprint
// each point at the other three. A career-specific interview guide (the
// Project Manager one) wins over the category-wide one.
export function getJobHuntGuides(category?: string, careerId?: string) {
  const { getHiredGuides, resumes, interviews } = getAllContent();
  const getHired =
    (category && getHiredGuides.find((g) => g.category === category && !g.comingSoon)) ||
    getHiredGuides.find((g) => g.id === "gethired-general");
  const resume = category ? resumes.find((r) => r.category === category) : undefined;
  const interview =
    (careerId && interviews.find((i) => i.careerId === careerId)) ||
    (category && interviews.find((i) => !i.careerId && i.category === category)) ||
    interviews.find((i) => i.id === "interview-construction-general");
  return { getHired, resume, interview };
}

// urlFor, slugifyCategory, stripWikiLinks, and the three groupXByCategory
// helpers are pure functions with no fs dependency — they live in
// content-client.ts so client components (Header.tsx) can import them
// directly without pulling this file's fs/path/gray-matter imports into
// the browser bundle. Re-exported here so every existing server-side
// "@/lib/content" import keeps working unchanged.
export {
  urlFor,
  slugifyCategory,
  stripWikiLinks,
  groupCareersByCategory,
  groupInterviewsByCategory,
  groupResumesByCategory,
  groupExamsByCategory,
  groupConceptsByCategory,
  matchSoftwareByName,
} from "./content-client";
