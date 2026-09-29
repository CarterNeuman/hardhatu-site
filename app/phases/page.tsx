import type { Metadata } from "next";
import { getAllContent, stripWikiLinks } from "@/lib/content";
import { ContentCard } from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "Process Phases",
  description: "How a construction project actually moves from start to finish, phase by phase.",
};

export default function PhasesIndexPage() {
  const { phases } = getAllContent();
  const ordered = [...phases].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Process Phases</h1>
      <p className="mt-3 max-w-2xl text-steel">
        Every construction project moves through the same broad sequence of phases, from an
        idea taking shape to the finished building's eventual end of life. Each phase page below
        covers what actually happens during it, who's involved, and what makes it different from
        the phases on either side of it.
      </p>
      <p className="mt-2 max-w-2xl text-steel">
        {phases.length} phase{phases.length === 1 ? "" : "s"} mapped so far, in the order a real
        project moves through them.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((phase) => (
          <ContentCard
            key={phase.id}
            item={phase}
            description={stripWikiLinks(phase.whatHappens).slice(0, 160)}
          />
        ))}
      </div>
    </div>
  );
}
