// Client-safe plan generation, split out of lib/action-plan-data.ts
// (2026-11-10 build-failure fix). That file also exports
// buildActionPlanDataByCategory(), which reads content off disk via
// lib/content.ts's `fs` calls -- fine for a Server Component, fatal if
// a client component (ActionPlanBuilder.tsx) imports anything from
// that same module, since bundling pulls `fs` into the browser build
// ("Module not found: Can't resolve 'fs'"). This file holds only the
// pure, dataByCategory-in/plan-out generation step, safe for both
// server and client callers -- `import type` for CategoryData keeps
// even the type link to action-plan-data.ts erased at build time.
import {
  buildActionPlan,
  type ActionPlanIntake,
  type ApplicationStatus,
  type GeneratedPlan,
} from "@/lib/action-plan-generator";
import type { GetHired, ResumeGuide } from "@/lib/types";
import type { CategoryData } from "@/lib/action-plan-data";

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
  const careerPrograms = car ? data.programsByCareerId[car] ?? [] : [];
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
    getHiredHref: data.getHiredHref,
    categorySlug: data.categorySlug,
    resumeGuide: data.resumeGuide as ResumeGuide | undefined,
    lessonsForCareer: lessons,
    categoryFallbackLessons: data.fallbackLessons,
    softwareForCareer: softwareItems,
    categoryFallbackSoftware: data.fallbackSoftware,
    conceptsForCareer: careerConcepts,
    categoryFallbackConcepts: data.fallbackConcepts,
    programsForCareer: careerPrograms,
    categoryFallbackPrograms: data.fallbackPrograms,
    careerInterviewPrepHref: car ? data.interviewPrepHrefByCareerId[car] : undefined,
    categoryInterviewPrepHref: data.categoryInterviewPrepHref,
    examsForCareer: car ? data.examsByCareerId[car] ?? [] : [],
    categoryExams: data.categoryExams,
    linkRefs: data.linkRefs,
    career,
    intake,
    ...(startDate ? { startDate } : {}),
  });
}

// How many of a plan's steps count as done for one account: every step
// whose saved-progress key (see GeneratedDayItem.key) has a row, plus
// any lesson step whose lesson was marked complete on its own page.
// Shared by the result screen's own counter and the two pages that list
// saved plans, so all three always agree. Rows saved under the old
// position-based ids (a bare number) match no key and are ignored.
export function countDoneSteps(
  plan: GeneratedPlan,
  category: string,
  careerId: string,
  progressRows: { contentType: string; contentId: string }[]
): number {
  const prefix = `${category}:${careerId || "general"}:`;
  const doneKeys = new Set<string>();
  const doneLessons = new Set<string>();
  for (const row of progressRows) {
    if (row.contentType === "lesson") doneLessons.add(row.contentId);
    else if (row.contentType === "actionPlanStep" && row.contentId.startsWith(prefix)) {
      doneKeys.add(row.contentId.slice(prefix.length));
    }
  }
  return plan.days.filter(
    (day) => doneKeys.has(day.key) || (day.lessonSlug !== undefined && doneLessons.has(day.lessonSlug))
  ).length;
}
