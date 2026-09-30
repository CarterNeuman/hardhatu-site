import type { Metadata } from "next";
import { getAllContent, groupResumesByCategory, slugifyCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ContentCard } from "@/components/ContentCard";
import { CATEGORY_SLUG } from "@/components/Header";

export const metadata: Metadata = {
  title: "Resume Guide",
  description:
    "A resume guide for every construction career category: what recruiters actually look for, how to structure it, and what to leave off.",
};

export default function ResumesIndexPage() {
  const { resumes } = getAllContent();
  const groups = groupResumesByCategory(resumes);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Resume Guide</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {resumes.length} guides, one for each career category, covering what actually gets a
        resume noticed in that part of the industry and what tends to work against it.
      </p>

      {groups.map((group) => (
        <CategorySection
          key={group.category}
          id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
          title={group.category}
          count={group.items.length}
        >
          {group.items.map((resume) => (
            <ContentCard key={resume.id} item={resume} description={resume.tagline} />
          ))}
        </CategorySection>
      ))}
    </div>
  );
}
