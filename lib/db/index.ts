import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, like, desc, sql as dsql } from "drizzle-orm";
import { userProgress, quizResults, actionPlans } from "@/lib/db/schema";

// Neon's HTTP driver (not a persistent TCP connection) -- the right choice
// for Vercel's serverless functions, which are short-lived and would
// otherwise exhaust a connection pool fast. DATABASE_URL comes from the
// Vercel Storage tab's Neon integration, which sets it automatically in
// Vercel; for local `npm run dev` it needs copying into .env.local by hand
// (see the project notes for exactly where to get it).
if (!process.env.DATABASE_URL) {
  // Thrown at request time, not at import/build time -- so a build
  // without the var set (there isn't one on Vercel once the Neon
  // integration is added) doesn't fail, only an actual request that hits
  // one of these functions without it configured does.
  console.warn("[db] DATABASE_URL is not set -- progress reads/writes will fail until it is.");
}

const sql = neon(process.env.DATABASE_URL || "");
export const db = drizzle(sql);

// Every row for one signed-in user. Used by GET /api/progress to tell the
// client what's already been marked done.
export async function getProgressForUser(userId: string) {
  return db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

// Mark one piece of content done for a user. Upsert, not insert: calling
// this again for something already marked done just refreshes updatedAt
// rather than erroring or duplicating, relying on the schema's unique
// constraint on (userId, contentType, contentId).
export async function upsertProgress(userId: string, contentType: string, contentId: string, status = "completed") {
  return db
    .insert(userProgress)
    .values({ userId, contentType, contentId, status })
    .onConflictDoUpdate({
      target: [userProgress.userId, userProgress.contentType, userProgress.contentId],
      set: { status, updatedAt: new Date() },
    })
    .returning();
}

// Un-mark one piece of content for a user (e.g. a lesson checkbox toggled
// back off). A no-op, not an error, if there was nothing to remove.
export async function deleteProgress(userId: string, contentType: string, contentId: string) {
  return db
    .delete(userProgress)
    .where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.contentType, contentType),
        eq(userProgress.contentId, contentId)
      )
    );
}

// Save one completed career-match quiz attempt for a signed-in user.
// Insert-only (no upsert): someone can retake the quiz and get a
// different result, and every attempt is a real data point worth keeping,
// not something to overwrite.
export async function saveQuizResult(userId: string, resultCategory: string, matchedCareerIds: string[]) {
  return db.insert(quizResults).values({ userId, resultCategory, matchedCareerIds }).returning();
}

// The most recent quiz attempt for one signed-in user, if any. Used by
// GET /api/quiz-results so a returning visitor sees the result they
// already earned instead of a blank quiz.
export async function getLatestQuizResult(userId: string) {
  const rows = await db
    .select()
    .from(quizResults)
    .where(eq(quizResults.userId, userId))
    .orderBy(desc(quizResults.createdAt))
    .limit(1);
  return rows[0];
}

// --- Aggregate/analytics queries, used by the internal /admin/analytics
// page. These intentionally return small, pre-aggregated result sets
// (never raw per-user rows) since the page is a dashboard, not an export.

// How many distinct signed-in users have any progress row at all. A
// rough "activated users" count, not the same as total signups (Clerk
// has no API call here to compare against).
export async function getActiveUserCount() {
  const rows = await db
    .select({ userId: userProgress.userId })
    .from(userProgress)
    .groupBy(userProgress.userId);
  return rows.length;
}

// Completion counts per piece of content, most-completed first. Powers
// the "what's actually being used" view -- GA4 only sees page views,
// this sees who finished something.
export async function getCompletionCounts(limit = 50) {
  return db
    .select({
      contentType: userProgress.contentType,
      contentId: userProgress.contentId,
      count: dsql<number>`count(distinct ${userProgress.userId})`.mapWith(Number),
    })
    .from(userProgress)
    .where(eq(userProgress.status, "completed"))
    .groupBy(userProgress.contentType, userProgress.contentId)
    .orderBy(dsql`count(distinct ${userProgress.userId}) desc`)
    .limit(limit);
}

// How many times each career category has won the quiz, most-matched
// first. The aggregate shape of "what are people actually interested
// in," safe to share with a partner/advertiser since it's category
// counts, never an individual's result.
export async function getQuizResultCounts() {
  return db
    .select({
      resultCategory: quizResults.resultCategory,
      count: dsql<number>`count(*)`.mapWith(Number),
    })
    .from(quizResults)
    .groupBy(quizResults.resultCategory)
    .orderBy(dsql`count(*) desc`);
}

// --- Saved Action Plan intakes (see actionPlans in lib/db/schema.ts for
// the identity/upsert rules). These mirror the shape ActionPlanBuilder's
// form already collects -- nothing new is invented here.

export type ActionPlanInput = {
  category: string;
  careerId: string; // "general" when no specific career was picked
  status: string; // "applying" | "browsing"
  location: string;
  hoursPerWeek: number;
  timelineWeeks: number;
  certsHeld: string;
};

// Every saved plan for one signed-in user, most recently touched first.
// Used by GET /api/action-plans (the "your saved plans" list) and by
// app/action-plan/page.tsx to decide whether to show the "view your
// saved plans" link at all.
export async function getActionPlansForUser(userId: string) {
  return db
    .select()
    .from(actionPlans)
    .where(eq(actionPlans.userId, userId))
    .orderBy(dsql`${actionPlans.updatedAt} desc`);
}

// One specific saved plan, if it exists -- used when a resume link
// (app/action-plan/page.tsx's ?plan=&career= params) names a category
// and career to jump straight back into.
export async function getActionPlan(userId: string, category: string, careerId: string) {
  const rows = await db
    .select()
    .from(actionPlans)
    .where(and(eq(actionPlans.userId, userId), eq(actionPlans.category, category), eq(actionPlans.careerId, careerId)));
  return rows[0];
}

// Save (or update) one plan. Upsert on (userId, category, careerId):
// building again for the same category+career is an edit to the
// existing plan, not a new one -- see the schema comment for why
// createdAt is deliberately left out of the update `set` below, so a
// returning visitor's day-by-day calendar stays pinned to when the
// plan was first built rather than jumping to "today" on every edit.
export async function upsertActionPlan(userId: string, input: ActionPlanInput) {
  const rows = await db
    .insert(actionPlans)
    .values({ userId, ...input })
    .onConflictDoUpdate({
      target: [actionPlans.userId, actionPlans.category, actionPlans.careerId],
      set: {
        status: input.status,
        location: input.location,
        hoursPerWeek: input.hoursPerWeek,
        timelineWeeks: input.timelineWeeks,
        certsHeld: input.certsHeld,
        updatedAt: new Date(),
      },
    })
    .returning();
  return rows[0];
}

// Remove one saved plan (the "delete" action on the saved-plans list),
// and -- just as important -- every day-by-day checkbox recorded
// against it in userProgress. Without this second delete, rebuilding
// the exact same category+career later would silently come back
// pre-checked from the plan that was supposedly just deleted, since
// those "actionPlanStep" rows share the same "<category>:<careerId>:"
// contentId prefix regardless of which actionPlans row created them
// (see the schema comment on actionPlans for that shared identity).
// A no-op, not an error, if there was nothing to remove either way.
export async function deleteActionPlan(userId: string, category: string, careerId: string) {
  const prefix = `${category}:${careerId}:`;
  await db
    .delete(userProgress)
    .where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.contentType, "actionPlanStep"),
        like(userProgress.contentId, `${prefix}%`)
      )
    );
  return db
    .delete(actionPlans)
    .where(and(eq(actionPlans.userId, userId), eq(actionPlans.category, category), eq(actionPlans.careerId, careerId)));
}
