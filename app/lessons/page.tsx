import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { LessonsBlueprint } from "@/components/LessonsBlueprint";
import { ContentCard } from "@/components/ContentCard";
import { stripWikiLinks } from "@/lib/content";
import styles from "@/components/LessonsBlueprint.module.css";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Real construction scenarios with check-in questions along the way, not one wall of text and a quiz at the end.",
};

export default function LessonsIndexPage() {
  const { lessons } = getAllContent();

  return (
    <div>
      <section className={styles.exhibit}>
        <div className="mx-auto max-w-[1180px] px-5 py-9 sm:py-14">
          <p className={styles.eyebrow}>Lessons</p>
          <h1
            className={`${styles.heading} mt-3 font-display text-4xl font-bold sm:text-5xl`}
            style={{ textWrap: "balance" }}
          >
            The Learning Blueprint
          </h1>
          <p className={`${styles.intro} mt-4 text-base leading-relaxed sm:text-lg`}>
            Every lesson, plotted as a stop on one winding road, unrolled down a single
            blueprint sheet. The road runs in learning order, weaving back and forth as
            it climbs, with <strong>8 themed branches</strong> forking off to the side for
            extra lessons along the way. Scroll down to walk the whole path, or hover any
            stop for a preview.
          </p>

          <div className={styles.topRow}>
            <span className={styles.hint}>
              Swipe or scroll to explore
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M12 3v17M6 14l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className="mt-6">
            <LessonsBlueprint lessons={lessons} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <details className="group">
          <summary className="cursor-pointer font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            Browse all {lessons.length} lessons as a list
          </summary>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => {
              const firstParagraph = stripWikiLinks(lesson.sections[0]?.content ?? "")
                .split(/\n\s*\n/)[0]
                ?.trim();
              return (
                <ContentCard
                  key={lesson.id}
                  item={lesson}
                  description={`${lesson.minutes} min: ${firstParagraph ?? ""}`}
                />
              );
            })}
          </div>
        </details>
      </section>
    </div>
  );
}
