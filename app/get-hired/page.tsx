import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { ContentCard } from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "How to Actually Get Hired",
  description:
    "A real step-by-step checklist for getting hired in construction, one guide per career umbrella, covering how hiring actually works, where to actually look, and what to do today.",
};

export default function GetHiredIndexPage() {
  const { getHiredGuides } = getAllContent();
  const ordered = [...getHiredGuides].sort(
    (a, b) => CAREER_CATEGORY_ORDER.indexOf(a.category) - CAREER_CATEGORY_ORDER.indexOf(b.category)
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">How to Actually Get Hired</h1>
      <p className="mt-3 max-w-2xl text-steel">
        Getting hired in construction doesn't look the same everywhere. A trade apprenticeship,
        an office role, and a licensed profession all hire through different channels. Pick your
        umbrella below for a real, specific checklist instead of generic job-search advice.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((guide) => (
          <ContentCard
            key={guide.id}
            item={guide}
            description={guide.comingSoon ? "Coming soon." : guide.tagline}
          />
        ))}
      </div>
    </div>
  );
}
