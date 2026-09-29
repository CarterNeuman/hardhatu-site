import type { Metadata } from "next";
import { getAllContent, groupExamsByCategory, slugifyCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ContentCard } from "@/components/ContentCard";
import { CATEGORY_SLUG } from "@/components/Header";

export const metadata: Metadata = {
  title: "Exam Prep",
  description:
    "Independent study material for real construction certifications: OSHA-10/30, the PMP, CCM, LEED Green Associate, and more.",
};

export default function ExamsIndexPage() {
  const { exams } = getAllContent();
  const groups = groupExamsByCategory(exams);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Exam Prep</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {exams.length} certifications: unofficial, independent study material tied to the real
        exams the industry actually asks for, grouped by the career category they matter most to.
      </p>

      {groups.map((group) => (
        <CategorySection
          key={group.category}
          id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
          title={group.category}
          count={group.items.length}
        >
          {group.items.map((exam) => (
            <ContentCard key={exam.id} item={exam} description={exam.tagline} />
          ))}
        </CategorySection>
      ))}
    </div>
  );
}
