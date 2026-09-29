import type { Metadata } from "next";
import { getAllContent, groupConceptsByCategory } from "@/lib/content";
import { ConceptExplorer } from "@/components/ConceptExplorer";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "The terms people actually use on a construction jobsite, plain definitions, why each one matters, and who feels it most.",
};

export default function ConceptsIndexPage() {
  const { concepts } = getAllContent();
  const groups = groupConceptsByCategory(concepts);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Concepts</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {concepts.length} terms so far across {groups.length} categories. This section is
        actively growing. Search by name, jump to a letter, or browse by category. Every concept
        links back to the careers, lessons, and phases where it actually shows up.
      </p>

      <ConceptExplorer groups={groups} />
    </div>
  );
}
