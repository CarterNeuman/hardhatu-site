import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

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
