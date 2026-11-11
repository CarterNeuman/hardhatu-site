import type { Metadata } from "next";
import { getAllContent, groupExamsByCategory, slugifyCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ExamPatchCard, type PatchAccent } from "@/components/ExamPatchCard";
import { CATEGORY_SLUG } from "@/lib/content-client";

export const metadata: Metadata = {
  title: "Get Qualified",
  description:
    "Independent study material for real construction certifications: OSHA-10/30, the PMP, CCM, LEED Green Associate, and more.",
};

// One accent color per category section, cycling through a fixed 4-color
// set so neighboring categories never collide. Order follows the order
// groupExamsByCategory already produces (known categories first, in
// CAREER_CATEGORY_ORDER, then any leftover "General" bucket last).
const ACCENT_ORDER: PatchAccent[] = ["navy", "clay", "amber", "steel"];

export default function ExamsIndexPage() {
  const { exams } = getAllContent();
  const groups = groupExamsByCategory(exams);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Get Qualified</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {exams.length} certifications: unofficial, independent study material tied to the real
        exams the industry actually asks for, grouped by the career category they matter most to.
        Certifications marked <span className="font-semibold text-ink">Entry Level</span> have no
        prior work-experience requirement to sit the exam.
      </p>

      {groups.map((group, groupIndex) => {
        const accent = ACCENT_ORDER[groupIndex % ACCENT_ORDER.length];

        return (
          <CategorySection
            key={group.category}
            id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
            title={group.category}
            count={group.items.length}
          >
            {group.items.map((exam) => (
              <ExamPatchCard
                key={exam.id}
                exam={exam}
                accent={accent}
                entryLevel={exam.tier === "free"}
              />
            ))}
          </CategorySection>
        );
      })}
    </div>
  );
}
