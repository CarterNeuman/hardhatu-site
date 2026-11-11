"use client";

// The actual "mark complete" toggle for a Lesson page, sitting at the
// bottom after the reader has gone through everything. Reads/writes
// through LessonCompletionProvider (components/LessonCompletion.tsx)
// rather than its own fetch, so toggling here updates the small
// "Completed" badge next to the title too, instantly, no reload --
// both pieces share one provider per lesson page. The Action Plan
// builder's day-by-day checkboxes talk to /api/progress directly (see
// ActionPlanBuilder) since they need a list of independent toggles,
// not one button tied to a single provider.
import { useLessonCompletionButton } from "@/components/LessonCompletion";

export function MarkCompleteButton() {
  const { completed, ready, pending, isSignedIn, toggle } = useLessonCompletionButton();

  if (!isSignedIn || !ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={completed}
      className={
        completed
          ? "inline-flex items-center gap-2 border border-navy bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors disabled:opacity-60"
          : "inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-60"
      }
    >
      <span
        className={
          completed
            ? "inline-block h-3 w-3 shrink-0 border border-paper bg-paper"
            : "inline-block h-3 w-3 shrink-0 border border-current"
        }
        aria-hidden="true"
      />
      {completed ? "Completed" : "Mark complete"}
    </button>
  );
}
