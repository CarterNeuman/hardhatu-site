import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { ContentCard } from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "Software",
  description: "The software construction teams actually run projects on, explained plainly.",
};

export default function SoftwareIndexPage() {
  const { software } = getAllContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Software</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {software.length} tool{software.length === 1 ? "" : "s"} so far: the software that
        actually shows up in job postings and day-to-day work, not a generic feature comparison.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {software.map((tool) => (
          <ContentCard key={tool.id} item={tool} description={tool.whatItIs} />
        ))}
      </div>
    </div>
  );
}
