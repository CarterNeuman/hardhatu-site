import type { Metadata } from "next";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getActionPlansForUser, getLatestQuizResult, getProgressForUser } from "@/lib/db";
import { buildActionPlanDataByCategory } from "@/lib/action-plan-data";
import { generateActionPlan } from "@/lib/action-plan-generate";
import { getAllContent } from "@/lib/content";
import { ORDERED_LESSON_SLUGS } from "@/lib/lesson-order";
import { BlueprintMark } from "@/components/BlueprintMark";
import { EmailGate } from "@/components/EmailGate";
import { ManageAccountLink } from "@/components/ManageAccountLink";

// The signed-in "here's where you stand" hub: lessons done, last quiz
// result, and a short summary of saved Action Plans -- linked from the
// account menu (Header.tsx's UserButton) in place of the old standalone
// "Your Plans" entry. Saved plans still get their own full
// open/resume/delete page (app/action-plan/my-plans/page.tsx); this
// page only shows the first couple and links out to it, same
// dashboard-to-detail relationship as everywhere else on the site.
//
// Deliberately not folded into a Clerk "account" page: Clerk's own
// UserButton already covers real account settings (email, password,
// sessions) via openUserProfile() (see ManageAccountLink) -- no reason
// to rebuild that, and mixing settings with a progress dashboard would
// serve two different intents on one page.
export const metadata: Metadata = {
  title: "My Progress",
  description: "Lessons done, your last Career Match Quiz result, and your saved Action Plans.",
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function MyProgressPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <article className="mx-auto max-w-3xl px-6 py-10">
        <EmailGate source="my-progress" variant="immediate">
          <div className="flex items-center gap-3">
            <BlueprintMark size={40} />
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy">
              Your Progress
            </p>
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink">My Progress</h1>
          <p className="mt-2 text-sm leading-relaxed text-steel">
            Sign in to see your lessons, your last quiz result, and your saved Action Plans.
          </p>
        </EmailGate>
      </article>
    );
  }

  const user = await currentUser();
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress;

  const [progressRows, latestQuiz, savedPlans] = await Promise.all([
    getProgressForUser(userId),
    getLatestQuizResult(userId),
    getActionPlansForUser(userId),
  ]);

  const { lessons, careers } = getAllContent();

  // Lessons
  const doneLessonSlugs = new Set(
    progressRows.filter((p) => p.contentType === "lesson").map((p) => p.contentId)
  );
  const lessonsDone = doneLessonSlugs.size;
  const lessonBySlug = new Map(lessons.map((l) => [l.slug, l]));
  const nextSlug = ORDERED_LESSON_SLUGS.find(
    (slug) => lessonBySlug.has(slug) && !doneLessonSlugs.has(slug)
  );
  const nextLesson = nextSlug ? lessonBySlug.get(nextSlug) : undefined;

  // Quiz
  const matchedCareers = latestQuiz
    ? latestQuiz.matchedCareerIds
        .map((id) => careers.find((c) => c.id === id))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
        .slice(0, 3)
    : [];

  // Action Plans -- same per-plan computation as app/action-plan/my-plans,
  // just capped to the first few for this summary.
  const dataByCategory = buildActionPlanDataByCategory();
  const planSummaries = savedPlans.map((row) => {
    const categoryData = dataByCategory[row.category];
    const career =
      row.careerId !== "general" ? categoryData?.careers.find((c) => c.id === row.careerId) : undefined;
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
    const prefix = `${row.category}:${row.careerId}:`;
    const totalDays = generated !== "coming-soon" ? generated.days.length : undefined;
    const rawDoneCount = progressRows.filter(
      (p) => p.contentType === "actionPlanStep" && p.contentId.startsWith(prefix)
    ).length;
    const doneCount = typeof totalDays === "number" ? Math.min(rawDoneCount, totalDays) : rawDoneCount;
    return { row, careerTitle: career?.title, doneCount, totalDays, unavailable: generated === "coming-soon" };
  });
  const visiblePlans = planSummaries.slice(0, 2);
  const morePlansCount = planSummaries.length - visiblePlans.length;

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center gap-3">
        <BlueprintMark size={40} />
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy">
          Your Progress
        </p>
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink">Here&rsquo;s where you stand</h1>
      <p className="mt-2 text-sm leading-relaxed text-steel">
        Everything you&rsquo;ve built and finished in one place.
      </p>

      {/* Lessons */}
      <div className="mt-8 border border-hairline bg-white/60 p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-steel">Lessons</p>
          <Link href="/lessons" className="text-xs font-semibold text-amber hover:underline">
            View all lessons &rarr;
          </Link>
        </div>
        <p className="mt-3 font-display text-3xl font-bold text-navy">
          {lessonsDone} <span className="text-lg font-semibold text-steel">of {lessons.length} done</span>
        </p>
        <div className="mt-3 h-2 w-full bg-hairline">
          <div
            className="h-2 bg-navy"
            style={{ width: `${lessons.length > 0 ? Math.round((lessonsDone / lessons.length) * 100) : 0}%` }}
          />
        </div>

        {nextLesson ? (
          <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber">Up next</p>
              <p className="mt-1 text-sm font-semibold text-ink">{nextLesson.title}</p>
            </div>
            <Link
              href={`/lessons/${nextLesson.slug}`}
              className="bg-amber px-4 py-2 text-xs font-semibold text-paper transition-colors hover:bg-ink"
            >
              Continue &rarr;
            </Link>
          </div>
        ) : lessons.length > 0 ? (
          <p className="mt-5 border-t border-hairline pt-4 text-sm italic text-steel">
            All lessons done. Nice work.
          </p>
        ) : null}
      </div>

      {/* Quiz */}
      <div className="mt-6 border border-hairline bg-white/60 p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-steel">Career Match Quiz</p>
          <Link href="/quizzes/find-your-career" className="text-xs font-semibold text-amber hover:underline">
            Retake the quiz &rarr;
          </Link>
        </div>

        {latestQuiz ? (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="border border-amber bg-amber-soft px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-amber">
                {latestQuiz.resultCategory}
              </span>
              <span className="text-xs text-steel">Taken {formatDate(latestQuiz.createdAt)}</span>
            </div>
            {matchedCareers.length > 0 && (
              <>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-steel">
                  Your top matches
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {matchedCareers.map((career) => (
                    <Link
                      key={career.id}
                      href={`/careers/${career.slug}`}
                      className="border border-hairline bg-white px-3 py-1.5 text-sm font-semibold text-ink hover:border-navy"
                    >
                      {career.title}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p className="mt-3 text-sm italic text-steel">
            You haven&rsquo;t taken the quiz yet.{" "}
            <Link href="/quizzes/find-your-career" className="font-semibold text-amber hover:underline">
              Take it
            </Link>{" "}
            to see what fits.
          </p>
        )}
      </div>

      {/* Action Plans */}
      <div className="mt-6 border border-hairline bg-white/60 p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-steel">Action Plans</p>
          <Link href="/action-plan/my-plans" className="text-xs font-semibold text-amber hover:underline">
            Manage all plans &rarr;
          </Link>
        </div>

        {visiblePlans.length === 0 ? (
          <p className="mt-3 text-sm italic text-steel">
            You haven&rsquo;t built a plan yet.{" "}
            <Link href="/action-plan" className="font-semibold text-amber hover:underline">
              Build one
            </Link>
            .
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {visiblePlans.map(({ row, careerTitle, doneCount, totalDays, unavailable }) => {
              const title = careerTitle ?? `${row.category} (general)`;
              const resumeHref = `/action-plan?plan=${encodeURIComponent(row.category)}&career=${encodeURIComponent(row.careerId)}`;
              return (
                <div
                  key={`${row.category}:${row.careerId}`}
                  className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-steel">{row.category}</p>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    {unavailable && (
                      <p className="mt-1 text-xs italic text-steel">Not published yet &mdash; your answers are saved.</p>
                    )}
                  </div>
                  {typeof totalDays === "number" && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy">
                      {doneCount} of {totalDays} days done
                    </p>
                  )}
                  {!unavailable && (
                    <Link
                      href={resumeHref}
                      className="border border-ink px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      Open &rarr;
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {morePlansCount > 0 && (
          <p className="mt-3 text-xs text-steel">
            +{morePlansCount} more saved plan{morePlansCount === 1 ? "" : "s"} &mdash;{" "}
            <Link href="/action-plan/my-plans" className="font-semibold text-amber hover:underline">
              see all
            </Link>
          </p>
        )}
      </div>

      {/* Account */}
      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
        {email && <p className="text-xs text-steel">Signed in as {email}</p>}
        <ManageAccountLink />
      </div>
    </article>
  );
}
