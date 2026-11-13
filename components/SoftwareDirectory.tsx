"use client";

import { useMemo, useState } from "react";
import { SoftwareDeskIntro, type SoftwarePreviewGroup } from "@/components/SoftwareDeskIntro";
import { SoftwareScreenTile } from "@/components/SoftwareScreenTile";
import type { Software } from "@/lib/types";

// Matches against everything a person might actually type -- not just the
// title, but the body copy, since "what does this do" is exactly what the
// search is for (a search for "lien" should surface Levelset and GCPay even
// though neither word is in their titles). keyFeatures/commonUses are
// joined in too since those are often where the one distinguishing word
// ("telematics", "prequalification") actually lives.
function matches(tool: Software, query: string): boolean {
  if (!query) return true;
  const haystack = [
    tool.title,
    tool.category,
    tool.whatItIs,
    tool.whatItDoes,
    ...tool.keyFeatures,
    ...tool.commonUses,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function SoftwareDirectory({
  software,
  categories,
  preview,
}: {
  software: Software[];
  categories: string[];
  preview: SoftwarePreviewGroup[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => software.filter((tool) => matches(tool, query)), [software, query]);
  const visibleCategories = useMemo(
    () => categories.filter((category) => filtered.some((tool) => tool.category === category)),
    [categories, filtered]
  );

  return (
    <div>
      <div className="relative mt-8 max-w-md">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel"
        >
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search software by name, feature, or use..."
          aria-label="Search software"
          className="w-full border border-hairline bg-white/60 py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-steel focus:border-navy focus:outline-none"
        />
      </div>

      <p className="mt-3 text-sm text-steel">
        {filtered.length === software.length
          ? `${software.length} tool${software.length === 1 ? "" : "s"} so far`
          : `${filtered.length} of ${software.length} tool${software.length === 1 ? "" : "s"} match`}
      </p>

      {query && filtered.length === 0 ? (
        <p className="mt-8 border border-dashed border-hairline p-6 text-sm text-steel">
          No software matches &ldquo;{query}&rdquo; yet.{" "}
          <button
            type="button"
            onClick={() => setQuery("")}
            className="font-semibold text-navy hover:underline"
          >
            Clear search
          </button>
        </p>
      ) : (
        <div className="mt-8">
          <SoftwareDeskIntro preview={preview}>
            <div className="flex flex-col gap-8">
              {visibleCategories.map((category) => (
                <div key={category}>
                  <h2 className="mb-4 font-display text-xl font-bold text-amber-soft sm:text-2xl">
                    {category}
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered
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
      )}
    </div>
  );
}
