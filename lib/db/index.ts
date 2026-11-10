import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, sql as dsql } from "drizzle-orm";
import { userProgress, quizResults } from "@/lib/db/schema";

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

