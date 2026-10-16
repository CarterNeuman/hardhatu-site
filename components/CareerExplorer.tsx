"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "./ContentCard";
import { CategorySection } from "./CategorySection";
import { CATEGORY_SLUG } from "./Header";
import { slugifyCategory } from "@/lib/content-client";
import type { Career } from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// The careers index's search + A-Z filter, the same pattern ConceptExplorer
// already uses for the concept glossary (see chat: added so Careers gets
// the same browsing experience as Concepts, 2026-10-16). Runs entirely
// client-side against the careers already loaded by the server page, no
// API route, no index to build. CATEGORY_SLUG (not the generic
// slugifyCategory) is used for section ids so the header's existing
// Careers dropdown links (/careers#<slug>) keep landing on the right
// section; slugifyCategory is only a fallback for a category that
// somehow isn't in that map.
export function CareerExplorer({
  groups,
}: {
  groups: { category: string; items: Career[] }[];
}) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const all = useMemo(
    () => groups.flatMap((g) => g.items).sort((a, b) => a.title.localeCompare(b.title)),
    [groups]
  );

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const career of all) {
      const first = career.title.trim()[0];
      if (first) set.add(first.toUpperCase());
    }
    return set;
  }, [all]);

  const isFiltering = query.trim().length > 0 || letter !== null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((career) => {
      if (letter && career.title.trim()[0]?.toUpperCase() !== letter) return false;
      if (q && !career.title.toLowerCase().includes(q) && !career.tagline.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [all, query, letter]);

  return (
    <div>
      <div className="mt-6 border border-hairline bg-white/40 p-4">
        <label htmlFor="career-search" className="sr-only">
          Search careers
        </label>
        <input
          id="career-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search careers by name or role…"
          className="w-full border border-hairline bg-paper px-3 py-2 text-sm text-ink placeholder:text-steel focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
        />
        <div className="mt-3 flex flex-wrap gap-1">
          <button
            onClick={() => setLetter(null)}
            className={`border px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              letter === null
                ? "border-navy bg-navy text-paper"
                : "border-hairline text-steel hover:border-navy hover:text-navy"
            }`}
          >
            All
          </button>
          {ALPHABET.map((L) => {
            const has = availableLetters.has(L);
            const active = letter === L;
            return (
              <button
                key={L}
                disabled={!has}
                onClick={() => setLetter(active ? null : L)}
                aria-pressed={active}
                className={`h-7 w-7 border text-xs font-semibold transition-colors ${
                  active
                    ? "border-navy bg-navy text-paper"
                    : has
                      ? "border-hairline text-ink hover:border-navy hover:text-navy"
                      : "border-hairline text-hairline"
                }`}
              >
                {L}
              </button>
            );
          })}
        </div>
      </div>

      {isFiltering ? (
        <div className="mt-8">
          <p className="text-sm text-steel">
            {filtered.length} match{filtered.length === 1 ? "" : "es"}
          </p>
          {filtered.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((career) => (
                <ContentCard key={career.id} item={career} description={career.tagline} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-steel">
              No careers match yet. Try a different search term or letter.
            </p>
          )}
        </div>
      ) : (
        groups.map((group) => (
          <CategorySection
            key={group.category}
            id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
            title={group.category}
            count={group.items.length}
            collapsible
          >
            {group.items.map((career) => (
              <ContentCard key={career.id} item={career} description={career.tagline} />
            ))}
          </CategorySection>
        ))
      )}
    </div>
  );
}
