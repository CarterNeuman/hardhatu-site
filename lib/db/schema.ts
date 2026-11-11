import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";

// The one table Phase 2 needs: a row per (user, piece of content) marking
// it done. Deliberately generic rather than one table per content type --
// "lesson", "actionPlanStep", or anything added later all fit the same
// shape, so a new content type never needs a schema change here.
//
// contentId is the content's own slug/id (e.g. a lesson's slug, or an
// Action Plan step's generated id) -- whatever the calling code already
// uses to identify that piece of content, not a new id invented here.
//
// The unique constraint on (userId, contentType, contentId) is what makes
// "mark complete" idempotent: re-marking the same thing complete updates
// the existing row's updatedAt instead of creating a duplicate. See
// lib/db/index.ts's upsertProgress for how that's used.
export const userProgress = pgTable(
  "user_progress",
  {
    id: serial("id").primaryKey(),
    // Clerk's user id (e.g. "user_2abc..."), never anything else -- this
    // table has no separate notion of "user," Clerk is the source of
    // truth for who someone is.
    userId: text("user_id").notNull(),
    contentType: text("content_type").notNull(), // "lesson" | "actionPlanStep" | ...
    contentId: text("content_id").notNull(),
    status: text("status").notNull().default("completed"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userContentUnique: unique("user_progress_user_content_unique").on(
      table.userId,
      table.contentType,
      table.contentId
    ),
  })
);

export type UserProgressRow = typeof userProgress.$inferSelect;

// One row per completed career-match quiz attempt. Separate from
// userProgress (that table tracks "done/not done" on existing content,
// this captures what the quiz actually told the person) -- the richest
// first-party signal the site collects, since it's a stated career
// interest tied to a real identity, not just a page view.
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  // The winning CAREER_CATEGORY_ORDER string, e.g. "Field & Trades".
  resultCategory: text("result_category").notNull(),
  // Up to MAX_MATCHES career ids the quiz surfaced on the result screen,
  // highest-scored first.
  matchedCareerIds: text("matched_career_ids").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type QuizResultRow = typeof quizResults.$inferSelect;

// One row per saved Action Plan "intake" -- the form answers that
// produce a Blueprint (buildActionPlan in lib/action-plan-generator.ts
// is a pure function of these plus the site's content), not the
// generated plan itself. The generated plan is never stored: it's
// cheap to regenerate from these inputs, and regenerating also means a
// resumed plan always reflects the site's current content (a career's
// pay figures updating, say) rather than a stale snapshot.
//
// Unique on (userId, category, careerId) -- that triple is this site's
// existing notion of "which plan," the same identity the day-by-day
// checkboxes already use for their user_progress contentId
// ("<category>:<careerId>:<dayIndex>", see ActionPlanBuilder). Building
// again for the same category+career upserts in place (an edit, not a
// new plan); a different category or career is a genuinely different
// plan and gets its own row, which is what lets one user save more
// than one Blueprint (e.g. Electrician and HVAC Technician side by
// side) -- see getActionPlansForUser in lib/db/index.ts.
//
// careerId is "general" (never an empty string) when no specific
// career was picked, matching the same convention the progress
// contentId already uses -- see upsertActionPlan.
//
// createdAt is deliberately excluded from upsertActionPlan's update
// set, so it stays pinned to when the plan was first built even after
// later edits -- the day-by-day calendar is generated starting from
// this date (see ActionPlanBuilder's resume effect), so a returning
// visitor's schedule reads as "day 6 of 14," not restarted from today.
export const actionPlans = pgTable(
  "action_plans",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    category: text("category").notNull(),
    careerId: text("career_id").notNull().default("general"),
    status: text("status").notNull().default("applying"), // "applying" | "browsing"
    location: text("location").notNull().default(""),
    hoursPerWeek: integer("hours_per_week").notNull().default(10),
    timelineWeeks: integer("timeline_weeks").notNull().default(2),
    certsHeld: text("certs_held").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userCategoryCareerUnique: unique("action_plans_user_category_career_unique").on(
      table.userId,
      table.category,
      table.careerId
    ),
  })
);

export type ActionPlanRow = typeof actionPlans.$inferSelect;
