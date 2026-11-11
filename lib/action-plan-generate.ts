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
