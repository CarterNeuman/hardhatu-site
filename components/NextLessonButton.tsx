"use client";

// Shown at the bottom of a Lesson page once it's marked complete --
// a one-click way to keep moving through the Learning Blueprint's
// recommended order (lib/lesson-order.ts) instead of having to go
// back to the Blueprint page to pick the next stop by hand. Reads
// `completed` from the same LessonCompletionProvider MarkCompleteButton
// uses, so it appears the instant the box is checked, no reload.
//
// `nextSlug`/`nextTitle` are computed server-side in the Lesson page
// (next entry in ORDERED_LESSON_SLUGS after the current lesson) and
// passed in as plain props -- a Server Component can't hand this
// Client Component a function, but a slug and a title are just data.
// If this is the last lesson in the order, nextSlug is null and
// nothing renders.
import Link from "next/link";
import { useLessonCompletionButton } from "@/components/LessonCompletion";

export function NextLessonButton({
  nextSlug,
  nextTitle,
}: {
  nextSlug: string | null;
  nextTitle: string | null;
}) {
  const { completed, isSignedIn } = useLessonCompletionButton();

  if (!isSignedIn || !completed || !nextSlug) return null;

  return (
    <Link
      href={`/lessons/${nextSlug}`}
      className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
    >
      Next lesson: {nextTitle} &rarr;
    </Link>
  );
}
