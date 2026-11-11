import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { SoftwareDeskIntro, type SoftwarePreviewGroup } from "@/components/SoftwareDeskIntro";
import { SoftwareScreenTile } from "@/components/SoftwareScreenTile";

export const metadata: Metadata = {
  title: "Software",
  description: "The software construction teams actually run projects on, explained plainly.",
};

export default function SoftwareIndexPage() {
  const { software } = getAllContent();

  // Grouped by the free-text `category` field (Estimating, Scheduling,
  // Design & BIM, etc.) so the screen reads like icons organized into
  // folders rather than one undifferentiated grid — alphabetical since
  // there's no fixed category order for software the way there is for the
  // 8 career categories.
  const categories = Array.from(new Set(software.map((tool) => tool.category))).sort((a, b) =>
    a.localeCompare(b)
  );

  // Same grouping, reduced to just names, for the intro's tiny on-screen
  // preview (SoftwareDeskIntro renders this small and grows it with the
  // zoom — see that component for why it needs real names, not
  // placeholders).
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

      <div className="mt-8">
        <SoftwareDeskIntro preview={preview}>
          <div className="flex flex-col gap-8">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="mb-4 font-display text-xl font-bold text-amber-soft sm:text-2xl">
                  {category}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {software
                    .filter((tool) => tool.category === category)
                    .map((tool) => (
                      <SoftwareScreenTile key={tool.id} tool={tool} description={tool.whatItIs} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </SoftwareDeskIntro>
      </div>
    </div>
  );
}
