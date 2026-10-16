import type { Metadata } from "next";
import { getAllContent, groupCareersByCategory } from "@/lib/content";
import { CareerExplorer } from "@/components/CareerExplorer";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Browse every construction career on BreakGroundU, grouped by category, from field trades to insurance claims to consulting.",
};

export default function CareersIndexPage() {
  const { careers } = getAllContent();
  const groups = groupCareersByCategory(careers);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Careers</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {careers.length} careers across {groups.length} categories, from the jobsite to the
        office to the insurance side of the industry. Search by name, jump to a letter, or
        browse by category.
      </p>

      <CareerExplorer groups={groups} />
    </div>
  );
}
