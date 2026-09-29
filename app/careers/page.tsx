import type { Metadata } from "next";
import { getAllContent, groupCareersByCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ContentCard } from "@/components/ContentCard";
import { CATEGORY_SLUG } from "@/components/Header";
import { slugifyCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Browse every construction career on HardHatU, grouped by category, from field trades to insurance claims to consulting.",
};

export default function CareersIndexPage() {
  const { careers } = getAllContent();
  const groups = groupCareersByCategory(careers);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Careers</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {careers.length} careers across {groups.length} categories, from the jobsite to the
        office to the insurance side of the industry. Pick a category below, or a specific role
        if you already know what you're after.
      </p>

      {groups.map((group) => (
        <CategorySection
          key={group.category}
          id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
          title={group.category}
          count={group.items.length}
        >
          {group.items.map((career) => (
            <ContentCard key={career.id} item={career} description={career.tagline} />
          ))}
        </CategorySection>
      ))}
    </div>
  );
}
