import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { ActionPlanBuilder, type CategoryData, type SlimCareer, type SlimLesson } from "@/components/ActionPlanBuilder";

// This page is intentionally not linked from the site nav (see the
// build-sequencing notes in the premium-action-plan-feasibility project
// doc): it's built and tested on its own branch, shared with friends via
// a Vercel preview-deployment link, before it ever gets a nav entry or
// an accounts/payments gate. Reachable by direct URL only for now.
export const metadata: Metadata = {
  title: "Action Plan (Preview)",
  description:
    "Build a personalized, day-by-day plan for getting hired in construction. In testing, not yet linked from the site.",
  robots: { index: false, follow: false },
};

export default function ActionPlanPage() {
  const { careers, getHiredGuides, resumes, lessons, actionPlans } = getAllContent();

  const dataByCategory: Record<string, CategoryData> = {};
  for (const category of CAREER_CATEGORY_ORDER) {
    const categoryCareers = careers.filter((c) => c.category === category);
    const careerRefs: SlimCareer[] = categoryCareers.map((c) => ({ id: c.id, title: c.title, slug: c.slug }));

    const lessonsByCareerId: Record<string, SlimLesson[]> = {};
    for (const career of categoryCareers) {
      lessonsByCareerId[career.id] = lessons
        .filter((l) => l.relatedIds.includes(career.id))
        .map((l): SlimLesson => ({ id: l.id, slug: l.slug, title: l.title, minutes: l.minutes }));
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

    const skeleton = actionPlans.find((a) => a.category === category);
    const getHiredGuide = getHiredGuides.find((g) => g.category === category);
    const resumeGuide = resumes.find((r) => r.category === category);

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
    };
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      {/* The print calendar (ActionPlanPrintCalendar) has its own
          print-only header with the logo and plan title -- this intro
          block is marketing copy and a "not yet public" preview notice,
          neither of which belongs on a printed physical schedule someone
          might hand to another person. */}
      <div className="print:hidden">
        <p className="text-xs font-semibold uppercase tracking-wide text-clay">In testing, not yet public</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink">Build your action plan</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Tell us where you are in the process and we'll put together a day-by-day plan: qualifications to
          line up, courses worth taking, resume bullets to borrow, who to actually apply to, and exactly how
          to reach out.
        </p>
        <p className="mt-2 text-sm text-steel">
          Nothing you enter here is saved to an account yet, this is an early preview. Build a plan, try the
          calendar download and the print view, and leave feedback on anything that feels off.
        </p>
      </div>

      <ActionPlanBuilder dataByCategory={dataByCategory} />
    </article>
  );
}
