import type { Metadata } from "next";
import { getAllContent, groupInterviewsByCategory, slugifyCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ContentCard } from "@/components/ContentCard";
import { CATEGORY_SLUG } from "@/components/Header";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "General interview basics plus a detailed guide for every construction career category: what recruiters actually ask and how to answer.",
};

export default function InterviewsIndexPage() {
  const { interviews } = getAllContent();
  const groups = groupInterviewsByCategory(interviews);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Interview Prep</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {interviews.length} guides: general basics for any construction interview, plus a
        detailed guide for every career category covering the specific roles inside it.
      </p>

      {groups.map((group) => (
        <CategorySection
          key={group.category}
          id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
          title={group.category}
          count={group.items.length}
        >
          {group.items.map((interview) => (
            <ContentCard key={interview.id} item={interview} description={interview.tagline} />
          ))}
        </CategorySection>
      ))}
    </div>
  );
}
