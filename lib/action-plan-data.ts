// Shared data-assembly for the Action Plan feature: turns the site's raw
// content (careers, lessons, software, concepts, guides) into the
// per-category shape ActionPlanBuilder actually consumes. Pulled out of
// app/action-plan/page.tsx (2026-11-10) so the "my saved plans" list
// page (app/action-plan/my-plans/page.tsx) can regenerate a saved
// plan's full content -- day-by-day schedule, resume bullets, pay
// figures -- without duplicating this lookup, since both pages need
// the exact same category data to call buildActionPlan with.
import { getAllContent } from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { ActionPlan, GetHired, ResumeGuide } from "@/lib/types";
import {
  buildActionPlan,
  type ActionPlanIntake,
  type ApplicationStatus,
  type GeneratedPlan,
} from "@/lib/action-plan-generator";

export type SlimCareer = {
  id: string;
  title: string;
  slug: string;
  // Carried straight through from the career's own `entryPay`/`isEntryRole`
  // fields -- see ActionPlanBuilder's own comment on isEntryRole for why
  // this changes the "what you can expect to earn" copy.
  entryPay?: { low: number; high: number; unit: "annual" | "hourly"; source: string; asOf: string };
  isEntryRole?: boolean;
};
export type SlimLesson = { id: string; slug: string; title: string; minutes: number };
export type SlimConcept = { id: string; slug: string; title: string; definition: string };
export type SlimSoftware = { id: string; slug: string; title: string; whatItIs: string };

export type CategoryData = {
  category: string;
  careers: SlimCareer[];
  skeleton?: ActionPlan;
  getHiredGuide?: Pick<GetHired, "whereToLook" | "credentialsToHaveReady">;
  resumeGuide?: { slug: string; exampleBullets: string[] };
  lessonsByCareerId: Record<string, SlimLesson[]>;
  // Shown when no specific career is picked (or that career has no
  // lessons tied to it yet) -- a few lessons for the category as a
  // whole, so "Not sure yet, keep it general" still gets real course
  // suggestions instead of an empty section.
  fallbackLessons: SlimLesson[];
  // Same "specific career wins, else category-wide fallback" pattern as
  // lessons above, for software -- woven into the day-by-day
  // skill-building rotation, not just a side list.
  softwareByCareerId: Record<string, SlimSoftware[]>;
  fallbackSoftware: SlimSoftware[];
  conceptsByCareerId: Record<string, SlimConcept[]>;
  fallbackConcepts: SlimConcept[];
  interviewPrepHrefByCareerId: Record<string, string>;
  categoryInterviewPrepHref?: string;
  examPrepHrefByCareerId: Record<string, string>;
  categoryExamPrepHref?: string;
  // Same career-wins-else-category precedence as the href-only fields
  // above, but carrying each exam's own title too -- used to phrase the
  // skill-building rotation's exam-prep task, not just link to it.
  examPrepTaskByCareerId: Record<string, { title: string; href: string }>;
  categoryExamPrepTask?: { title: string; href: string };
};

export function buildActionPlanDataByCategory(): Record<string, CategoryData> {
  const { careers, getHiredGuides, resumes, lessons, concepts, software, interviews, exams, actionPlans } =
    getAllContent();

  const dataByCategory: Record<string, CategoryData> = {};
  for (const category of CAREER_CATEGORY_ORDER) {
    const categoryCareers = careers.filter((c) => c.category === category);
    const careerRefs: SlimCareer[] = categoryCareers.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      // Entry-level pay, carried through for the Action Plan's "what to
      // expect to earn" note -- same already-sourced payTimeline.entry
      // the career page's own Pay expectations chart uses, never new or
      // separately-researched figures. Undefined for a career with no
      // payTimeline yet; the section just doesn't render (see
      // ActionPlanBuilder).
      entryPay: c.payTimeline
        ? {
            low: c.payTimeline.entry.low,
            high: c.payTimeline.entry.high,
            unit: c.payTimeline.unit,
            source: c.payTimeline.source,
            asOf: c.payTimeline.asOf,
          }
        : undefined,
      isEntryRole: c.isEntryRole,
    }));

    const lessonsByCareerId: Record<string, SlimLesson[]> = {};
    for (const career of categoryCareers) {
      lessonsByCareerId[career.id] = lessons
        .filter((l) => l.relatedIds.includes(career.id))
        .map((l): SlimLesson => ({ id: l.id, slug: l.slug, title: l.title, minutes: l.minutes }));
    }

    // Concepts tied to each specific career in this category -- same
    // "Go further" / glossary-source pool, keyed the same way lessons
    // are so the component can pick the right one once a career is
    // chosen. Concepts already carry relatedIds back to the careers they
    // cover (the same field Lessons use), so this reuses that link
    // rather than authoring any new per-career mapping.
    const conceptsByCareerId: Record<string, SlimConcept[]> = {};
    for (const career of categoryCareers) {
      conceptsByCareerId[career.id] = concepts
        .filter((c) => c.relatedIds.includes(career.id))
        .map((c): SlimConcept => ({ id: c.id, slug: c.slug, title: c.title, definition: c.definition }));
    }

    // Shown when a visitor picks "Not sure yet, keep it general" (no
    // specific career) -- any lesson tied to at least one career in this
    // category, deduped, so that path still gets real course
    // suggestions instead of an empty section.
    const categoryCareerIds = new Set(categoryCareers.map((c) => c.id));
    const seenLessonIds = new Set<string>();
    const fallbackLessons: SlimLesson[] = [];
    for (const l of lessons) {
      if (seenLessonIds.has(l.id)) continue;
      if (!l.relatedIds.some((id) => categoryCareerIds.has(id))) continue;
      seenLessonIds.add(l.id);
      fallbackLessons.push({ id: l.id, slug: l.slug, title: l.title, minutes: l.minutes });
      if (fallbackLessons.length >= 8) break;
    }

    // Software tied to each specific career in this category -- reuses
    // the career's own already-authored `software` id list (the same one
    // its own career page's Software section renders), not a new
    // per-career mapping authored just for this feature.
    const softwareByCareerId: Record<string, SlimSoftware[]> = {};
    for (const career of categoryCareers) {
      softwareByCareerId[career.id] = career.software
        .map((id) => software.find((s) => s.id === id))
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
        .map((s): SlimSoftware => ({ id: s.id, slug: s.slug, title: s.title, whatItIs: s.whatItIs }));
    }

    // Category-wide fallback, same "Not sure yet, keep it general"
    // purpose as fallbackLessons/fallbackConcepts -- any software tied
    // to at least one career in this category, deduped.
    const seenSoftwareIds = new Set<string>();
    const fallbackSoftware: SlimSoftware[] = [];
    outer: for (const career of categoryCareers) {
      for (const id of career.software) {
        if (seenSoftwareIds.has(id)) continue;
        const s = software.find((sw) => sw.id === id);
        if (!s) continue;
        seenSoftwareIds.add(id);
        fallbackSoftware.push({ id: s.id, slug: s.slug, title: s.title, whatItIs: s.whatItIs });
        if (fallbackSoftware.length >= 6) break outer;
      }
    }

    // Same category-wide fallback, for concepts.
    const seenConceptIds = new Set<string>();
    const fallbackConcepts: SlimConcept[] = [];
    for (const c of concepts) {
      if (seenConceptIds.has(c.id)) continue;
      if (!c.relatedIds.some((id) => categoryCareerIds.has(id))) continue;
      seenConceptIds.add(c.id);
      fallbackConcepts.push({ id: c.id, slug: c.slug, title: c.title, definition: c.definition });
      if (fallbackConcepts.length >= 8) break;
    }

    const skeleton = actionPlans.find((a) => a.category === category);
    const getHiredGuide = getHiredGuides.find((g) => g.category === category);
    const resumeGuide = resumes.find((r) => r.category === category);

    // Interview Prep / Exam Prep guides, resolved per career where one
    // exists (e.g. project-manager's own interview guide, or a career-
    // specific exam like the journeyman electrician license), with a
    // category-wide guide as the fallback. Exam coverage especially is
    // uneven across careers -- several categories have none at all yet
    // -- so categoryExamPrepHref is often undefined, which is fine, the
    // section just doesn't render for that category (see
    // ActionPlanBuilder).
    const interviewPrepHrefByCareerId: Record<string, string> = {};
    for (const i of interviews) {
      if (i.careerId) interviewPrepHrefByCareerId[i.careerId] = `/interviews/${i.slug}`;
    }
    const categoryInterviewPrepHref = interviews.find((i) => !i.careerId && i.category === category);

    const examPrepHrefByCareerId: Record<string, string> = {};
    for (const e of exams) {
      if (e.careerId) examPrepHrefByCareerId[e.careerId] = `/exams/${e.slug}`;
    }
    const categoryExamPrepHref = exams.find((e) => !e.careerId && e.category === category);

    // Same career-wins-else-category precedence as the href-only maps
    // above, but carrying each exam's own title too -- needed to phrase
    // a real calendar task ("Work through OSHA 10 practice questions"),
    // not just link to it. Reuses the same exam lookups, no new data.
    const examPrepTaskByCareerId: Record<string, { title: string; href: string }> = {};
    for (const e of exams) {
      if (e.careerId) examPrepTaskByCareerId[e.careerId] = { title: e.title, href: `/exams/${e.slug}` };
    }
    const categoryExamPrepTask = categoryExamPrepHref
      ? { title: categoryExamPrepHref.title, href: `/exams/${categoryExamPrepHref.slug}` }
      : undefined;

    dataByCategory[category] = {
      category,
      careers: careerRefs,
      skeleton,
      getHiredGuide: getHiredGuide
        ? { whereToLook: getHiredGuide.whereToLook, credentialsToHaveReady: getHiredGuide.credentialsToHaveReady }
        : undefined,
      resumeGuide: resumeGuide ? { slug: resumeGuide.slug, exampleBullets: resumeGuide.exampleBullets } : undefined,
      lessonsByCareerId,
      fallbackLessons,
      softwareByCareerId,
      fallbackSoftware,
      conceptsByCareerId,
      fallbackConcepts,
      interviewPrepHrefByCareerId,
      categoryInterviewPrepHref: categoryInterviewPrepHref ? `/interviews/${categoryInterviewPrepHref.slug}` : undefined,
      examPrepHrefByCareerId,
      categoryExamPrepHref: categoryExamPrepHref ? `/exams/${categoryExamPrepHref.slug}` : undefined,
      examPrepTaskByCareerId,
      categoryExamPrepTask,
    };
  }


  return dataByCategory;
}

// The one generation step shared by ActionPlanBuilder (building a fresh
// plan, or resuming a saved one on mount) and the "your saved plans"
// list page (app/action-plan/my-plans/page.tsx, which regenerates each
// saved plan just far enough to show its day count and career title).
// Pulled out here rather than left duplicated in both places.
//
// careerId accepts either "" or "general" for "no specific career" --
// whichever convention the caller already has on hand (ActionPlanBuilder
// uses "", the database/API route uses "general"), so neither has to
// convert before calling this.
export function generateActionPlan(
  dataByCategory: Record<string, CategoryData>,
  category: string,
  careerId: string,
  fields: {
    status: ApplicationStatus;
    location: string;
    hoursPerWeek: number;
    timelineWeeks: number;
    certsHeld: string;
  },
  startDate?: Date
): GeneratedPlan | "coming-soon" {
  const car = careerId === "general" ? "" : careerId;
  const data = dataByCategory[category];
  if (!data?.skeleton || data.skeleton.comingSoon) return "coming-soon";

  const career = data.careers.find((c) => c.id === car);
  const lessons = car ? data.lessonsByCareerId[car] ?? [] : [];
  const softwareItems = car ? data.softwareByCareerId[car] ?? [] : [];
  const careerConcepts = car ? data.conceptsByCareerId[car] ?? [] : [];
  const intake: ActionPlanIntake = {
    category,
    careerId: car || undefined,
    status: fields.status,
    location: fields.location.trim(),
    hoursPerWeek: Math.max(1, fields.hoursPerWeek || 10),
    timelineWeeks: Math.max(0, fields.timelineWeeks || 0),
    certsHeld: fields.certsHeld,
  };

  return buildActionPlan({
    skeleton: data.skeleton,
    getHiredGuide: data.getHiredGuide as GetHired | undefined,
    resumeGuide: data.resumeGuide as ResumeGuide | undefined,
    lessonsForCareer: lessons,
    categoryFallbackLessons: data.fallbackLessons,
    softwareForCareer: softwareItems,
    categoryFallbackSoftware: data.fallbackSoftware,
    conceptsForCareer: careerConcepts,
    categoryFallbackConcepts: data.fallbackConcepts,
    careerInterviewPrepHref: car ? data.interviewPrepHrefByCareerId[car] : undefined,
    categoryInterviewPrepHref: data.categoryInterviewPrepHref,
    careerExamPrepHref: car ? data.examPrepHrefByCareerId[car] : undefined,
    categoryExamPrepHref: data.categoryExamPrepHref,
    careerExamPrepTask: car ? data.examPrepTaskByCareerId[car] : undefined,
    categoryExamPrepTask: data.categoryExamPrepTask,
    career,
    intake,
    ...(startDate ? { startDate } : {}),
  });
}
