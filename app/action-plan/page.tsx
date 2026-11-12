import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getActionPlansForUser } from "@/lib/db";
import { buildActionPlanDataByCategory } from "@/lib/action-plan-data";
import { BlueprintMark } from "@/components/BlueprintMark";
import { EmailGate } from "@/components/EmailGate";
import { ActionPlanBuilder, type InitialPlan, type PlanPrefill } from "@/components/ActionPlanBuilder";
import { CATEGORY_SLUG } from "@/lib/content-client";

// Linked from the site header's "Take Your First Step" entry (see the
// build-sequencing notes in the premium-action-plan-feasibility project
// doc). Gated behind sign-in (2026-11-10, part of the site-wide gating
// pass) via EmailGate below.
//
// Signed-in visitors can resume a saved plan two ways:
//  - Landing here with no query params shows the normal intake form,
//    plus a "view your saved plans" link if they have any (see
//    app/action-plan/my-plans/page.tsx).
//  - Landing here with ?plan=<category>&career=<careerId> (the link
//    the saved-plans list page sends them to) looks up that specific
//    saved plan server-side and skips the form entirely, handing
//    ActionPlanBuilder an `initialPlan` to render immediately -- see
//    its resume effect.
export const metadata: Metadata = {
  title: "Blueprint",
  description:
    "A free, personalized day-by-day plan for getting hired in construction: credentials to line up, who to apply to, and what to say.",
};

export default async function ActionPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; career?: string; category?: string; role?: string }>;
}) {
  const { plan: resumeCategory, career: resumeCareerId, category: prefillSlug, role: prefillRole } = await searchParams;
  const dataByCategory = buildActionPlanDataByCategory();

  // ?category=<slug>&role=<career slug>: the head start every "Build a
  // Blueprint" link elsewhere on the site sends (career pages, the
  // job-hunt strip on guides, the quiz result). Only ever pre-selects
  // the two dropdowns on the blank form -- both values are matched
  // against real categories/careers here, so anything unrecognized is
  // simply ignored, and a saved-plan link (?plan=) still wins.
  let prefill: PlanPrefill | undefined;
  const prefillCategory = Object.keys(CATEGORY_SLUG).find((name) => CATEGORY_SLUG[name] === prefillSlug);
  if (prefillCategory && dataByCategory[prefillCategory]) {
    const role = dataByCategory[prefillCategory].careers.find((c) => c.slug === prefillRole);
    prefill = { category: prefillCategory, careerId: role?.id ?? "" };
  }

  const { userId } = await auth();
  let initialPlan: InitialPlan | undefined;
  let savedPlanCount = 0;

  if (userId) {
    const savedPlans = await getActionPlansForUser(userId);
    savedPlanCount = savedPlans.length;

    if (resumeCategory) {
      const wantedCareerId = resumeCareerId || "general";
      const match = savedPlans.find((p) => p.category === resumeCategory && p.careerId === wantedCareerId);
      if (match) {
        initialPlan = {
          category: match.category,
          careerId: match.careerId,
          status: match.status === "browsing" ? "browsing" : "applying",
          location: match.location,
          hoursPerWeek: match.hoursPerWeek,
          timelineWeeks: match.timelineWeeks,
          certsHeld: match.certsHeld,
          createdAt: match.createdAt.toISOString(),
        };
      }
    }
  }

  return (
    <EmailGate source="action-plan" variant="immediate">
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
          Free with a quick sign-in. Download it as a calendar file, or print it and keep it in the truck.
        </p>
        {savedPlanCount > 0 && !initialPlan && (
          <Link
            href="/action-plan/my-plans"
            className="mt-3 inline-block border border-navy px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-paper"
          >
            View your saved plan{savedPlanCount === 1 ? "" : "s"} ({savedPlanCount})
          </Link>
        )}
      </div>

      <ActionPlanBuilder dataByCategory={dataByCategory} initialPlan={initialPlan} prefill={prefill} />
    </article>
    </EmailGate>
  );
}
