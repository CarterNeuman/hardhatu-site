import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getActionPlansForUser, getProgressForUser } from "@/lib/db";
import { buildActionPlanDataByCategory } from "@/lib/action-plan-data";
import { generateActionPlan, countDoneSteps } from "@/lib/action-plan-generate";
import { BlueprintMark } from "@/components/BlueprintMark";
import { DeletePlanButton } from "@/components/DeletePlanButton";

// The "come back to what you already built" page -- every saved Action
// Plan for the signed-in visitor, linked from app/action-plan/page.tsx's
// "View your saved plans" line. Only makes sense signed in (there's
// nothing to preview for a signed-out visitor), so this redirects
// rather than using EmailGate's blur-and-prompt treatment -- same
// pattern as /admin/analytics.
export const metadata: Metadata = {
  title: "Your Saved Plans",
  description: "Every Blueprint you've built, picked back up right where you left off.",
};

function formatCreatedDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function MyActionPlansPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/action-plan");
  }

  const [savedPlans, progressRows] = await Promise.all([
    getActionPlansForUser(userId),
    getProgressForUser(userId),
  ]);
  const dataByCategory = buildActionPlanDataByCategory();

  const plans = savedPlans.map((row) => {
    const categoryData = dataByCategory[row.category];
    const career = row.careerId !== "general" ? categoryData?.careers.find((c) => c.id === row.careerId) : undefined;
    const generated = generateActionPlan(
      dataByCategory,
      row.category,
      row.careerId,
      {
        status: row.status === "browsing" ? "browsing" : "applying",
        location: row.location,
        hoursPerWeek: row.hoursPerWeek,
        timelineWeeks: row.timelineWeeks,
        certsHeld: row.certsHeld,
      },
      row.createdAt
    );
    const totalDays = generated !== "coming-soon" ? generated.days.length : undefined;
    // Counted against the plan's real steps (see countDoneSteps): a
    // checkmark only counts if the step it belongs to is still in the
    // plan, and a lesson step counts once its lesson is complete -- the
    // same rule the Blueprint's own progress ring uses, so the two can
    // never disagree (or read "15 of 12 done" after a timeline edit).
    const doneCount =
      generated !== "coming-soon" ? countDoneSteps(generated, row.category, row.careerId, progressRows) : 0;

    return {
      row,
      careerTitle: career?.title,
      doneCount,
      totalDays,
      unavailable: generated === "coming-soon",
    };
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center gap-3">
        <BlueprintMark size={40} />
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy">Blueprint</p>
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink">Your Saved Plans</h1>
      <p className="mt-2 text-sm leading-relaxed text-steel">
        Pick up any plan right where you left off. Your answers and your checked-off days are both
        saved.
      </p>

      {plans.length === 0 ? (
        <div className="mt-8 border border-hairline bg-amber-soft/40 p-6">
          <p className="font-display text-xl font-bold text-ink">You haven't built a plan yet</p>
          <p className="mt-2 text-sm leading-relaxed text-steel">
            Build your first Blueprint and it'll show up here automatically, ready to pick back up next
            time.
          </p>
          <Link
            href="/action-plan"
            className="mt-4 inline-block bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink"
          >
            Build a plan
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {plans.map(({ row, careerTitle, doneCount, totalDays, unavailable }) => {
            const title = careerTitle ?? `${row.category} (general)`;
            const resumeHref = `/action-plan?plan=${encodeURIComponent(row.category)}&career=${encodeURIComponent(row.careerId)}`;
            return (
              <div key={`${row.category}:${row.careerId}`} className="border border-hairline bg-white/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-steel">{row.category}</p>
                    <p className="font-display text-xl font-bold text-ink">{title}</p>
                    <p className="mt-1 text-xs text-steel">
                      {row.status === "browsing" ? "Just looking" : "Actively applying"} &middot; Started{" "}
                      {formatCreatedDate(row.createdAt)}
                    </p>
                  </div>
                  {typeof totalDays === "number" && (
                    <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-navy">
                      {doneCount} of {totalDays} days done
                    </p>
                  )}
                </div>

                {unavailable && (
                  <p className="mt-3 text-sm italic text-steel">
                    This category's plan isn't published yet. Your answers are still saved, and this'll
                    work again once it is.
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {!unavailable && (
                    <Link
                      href={resumeHref}
                      className="border border-ink px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      Open your plan &rarr;
                    </Link>
                  )}
                  <DeletePlanButton category={row.category} careerId={row.careerId} label={title} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
