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
    | typeof ProgramSchema;
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
  groupExamsByCategory,
  groupConceptsByCategory,
} from "./content-client";
