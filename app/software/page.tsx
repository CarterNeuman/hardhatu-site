import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { SoftwareDirectory } from "@/components/SoftwareDirectory";
import type { SoftwarePreviewGroup } from "@/components/SoftwareDeskIntro";

export const metadata: Metadata = {
  title: "Software",
  description: "The software construction teams actually run projects on, explained plainly.",
};

export default function SoftwareIndexPage() {
  const { software } = getAllContent();

  // Grouped by the free-text `category` field (Estimating, Scheduling,
  // Design & BIM, etc.) so the screen reads like icons organized into
  // folders rather than one undifferentiated grid -- alphabetical since
  // there's no fixed category order for software the way there is for the
  // 8 career categories.
  const categories = Array.from(new Set(software.map((tool) => tool.category))).sort((a, b) =>
    a.localeCompare(b)
  );

  // Same grouping, reduced to just names, for the intro's tiny on-screen
  // preview (SoftwareDeskIntro renders this small and grows it with the
  // zoom -- see that component for why it needs real names, not
  // placeholders). Always built from the full, unfiltered list -- the
  // one-time intro animation plays before anyone's had a chance to search.
  const preview: SoftwarePreviewGroup[] = categories.map((category) => ({
    category,
    tools: software.filter((tool) => tool.category === category).map((tool) => tool.title),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Software</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {software.length} tool{software.length === 1 ? "" : "s"} so far: the software that
        actually shows up in job postings and day-to-day work, not a generic feature comparison.
      </p>

      <SoftwareDirectory software={software} categories={categories} preview={preview} />
    </div>
  );
}
