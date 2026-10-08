import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import {
  ActionPlanBuilder,
  type CategoryData,
  type SlimCareer,
  type SlimLesson,
  type SlimConcept,
} from "@/components/ActionPlanBuilder";

// Linked from the site header's "Take Your First Step" entry (see the
// build-sequencing notes in the premium-action-plan-feasibility project
// doc). No accounts/payments gate yet -- the generator is a pure,
// client-side function with nothing saved between visits (see
// ActionPlanBuilder's own comment for that tradeoff).
export const metadata: Metadata = {
  title: "Action Plan",
  description:
    "Build a personalized, day-by-day plan for getting hired in construction.",
};

export default function ActionPlanPage() {
  const { careers, getHiredGuides, resumes, lessons, concepts, interviews, exams, actionPlans } = getAllContent();

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
      conceptsByCareerId,
      fallbackConcepts,
      interviewPrepHrefByCareerId,
      categoryInterviewPrepHref: categoryInterviewPrepHref ? `/interviews/${categoryInterviewPrepHref.slug}` : undefined,
      examPrepHrefByCareerId,
      categoryExamPrepHref: categoryExamPrepHref ? `/exams/${categoryExamPrepHref.slug}` : undefined,
    };
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      {/* The print calendar (ActionPlanPrintCalendar) has its own
          print-only header with the logo and plan title -- this intro
          block is marketing copy that doesn't belong on a printed
          physical schedule someone might hand to another person. */}
      <div className="print:hidden">
        <h1 className="font-display text-4xl font-bold text-ink">Build your Action Plan</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Tell us where you are in the process and we'll put together a day-by-day plan: qualifications to
          line up, courses worth taking, resume bullets to use for inspiration, who to actually apply to, and exactly how
          to reach out.
        </p>
        <p className="mt-2 text-sm text-steel">
          Nothing you enter here is saved yet, accounts aren't live yet. Download the calendar (.ics) or print
          your schedule if you want to keep a copy.
        </p>
      </div>

      <ActionPlanBuilder dataByCategory={dataByCategory} />
    </article>
  );
}
