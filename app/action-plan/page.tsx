import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getActionPlansForUser } from "@/lib/db";
import { buildActionPlanDataByCategory } from "@/lib/action-plan-data";
import { BlueprintMark } from "@/components/BlueprintMark";
import { EmailGate } from "@/components/EmailGate";
import { ActionPlanBuilder, type InitialPlan, type PlanPrefill } from "@/components/ActionPlanBuilder";
import { CATEGORY_SLUG } from "@/lib/content-client";
import { BLUEPRINT_GRID } from "@/lib/blueprint-style";

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

  // The pitch for building a plan. Handed to ActionPlanBuilder as
  // `intro` rather than rendered here, so it shows above the form but
  // steps aside once a plan is on screen (the plan has its own header).
  const intro = (
    <div className="bg-ink text-paper print:hidden" style={BLUEPRINT_GRID}>
      <div className="px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex items-center gap-3">
          <BlueprintMark size={44} />
          <p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-soft"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Blueprint
          </p>
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] text-paper sm:text-6xl">
          Stop planning to start. <span className="text-amber-soft">Start.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/85">
          Answer six questions and get a dated, day-by-day plan for getting hired in construction: what to line
          up first, who to contact, what to say, and which lessons, guides, and training programs on this site
          to work through along the way.
        </p>
        <ul className="mt-8 hidden max-w-3xl grid-cols-3 gap-px bg-paper/15 sm:grid">
          {[
            { n: "01", title: "Dated steps", body: "Every task lands on a real day, paced to the hours you actually have." },
            { n: "02", title: "Built from this site", body: "Each step links to the lesson, guide, or program it refers to." },
            { n: "03", title: "Yours to keep", body: "Saved to your account. Add it to your calendar or print it." },
          ].map((item) => (
            <li key={item.n} className="bg-ink px-4 py-4">
              <p className="text-xs text-amber-soft" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {item.n}
              </p>
              <p className="mt-1 font-display text-xl font-bold text-paper">{item.title}</p>
              <p className="mt-1 text-sm leading-snug text-paper/75">{item.body}</p>
            </li>
          ))}
        </ul>
        {savedPlanCount > 0 && !initialPlan && (
          <Link
            href="/action-plan/my-plans"
            className="mt-6 inline-block border border-paper/40 px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-paper transition-colors hover:border-amber-soft hover:text-amber-soft"
          >
            Open your saved plan{savedPlanCount === 1 ? "" : "s"} ({savedPlanCount}) &rarr;
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <EmailGate source="action-plan" variant="immediate">
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <ActionPlanBuilder dataByCategory={dataByCategory} initialPlan={initialPlan} prefill={prefill} intro={intro} />
      </article>
    </EmailGate>
  );
}
