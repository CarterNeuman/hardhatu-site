import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { BlueprintMark } from "@/components/BlueprintMark";
import {
  ActionPlanBuilder,
  type CategoryData,
  type SlimCareer,
  type SlimLesson,
  type SlimConcept,
  type SlimSoftware,
} from "@/components/ActionPlanBuilder";

// Linked from the site header's "Take Your First Step" entry (see the
// build-sequencing notes in the premium-action-plan-feasibility project
// doc). No accounts/payments gate yet -- the generator is a pure,
// client-side function with nothing saved between visits (see
// ActionPlanBuilder's own comment for that tradeoff).
export const metadata: Metadata = {
  title: "Blueprint",
  description:
    "A free, personalized day-by-day plan for getting hired in construction: credentials to line up, who to apply to, and what to say.",
};

export default function ActionPlanPage() {
  const { careers, getHiredGuides, resumes, lessons, concepts, software, interviews, exams, actionPlans } = getAllContent();

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

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      {/* The print calendar (ActionPlanPrintCalendar) has its own
          print-only header with the logo and plan title -- this intro
          block is marketing copy that doesn't belong on a printed
          physical schedule someone might hand to another person. */}
      <div className="print:hidden">
        <div className="flex items-center gap-3">
          <BlueprintMark size={40} />
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy">Blueprint</p>
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">Stop planning to start. Start.</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Tell us where you're at and get a real day-by-day plan back, not just advice: credentials to line
          up, exactly who to apply to, what to say when you reach out, and real lessons worked right into
          the calendar.
        </p>
        <p className="mt-2 text-sm text-steel">
          Free, no account needed yet. Download it as a calendar file, or print it and keep it in the truck.
        </p>
      </div>

      <ActionPlanBuilder dataByCategory={dataByCategory} />
    </article>
  );
}
