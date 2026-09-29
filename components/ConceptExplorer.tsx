"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "./ContentCard";
import { CategorySection } from "./CategorySection";
import { slugifyCategory } from "@/lib/content-client";
import type { Concept } from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// The concept glossary's search + A-Z filter — a stand-in for a real search
// engine until the glossary is big enough to need one (see chat: added
// ahead of the ~238-concept batch specifically so finding a term stays easy
// as the list grows). Everything runs client-side against the concepts
// already loaded by the server page — no API route, no index to build.
export function ConceptExplorer({
  groups,
}: {
  groups: { category: string; items: Concept[] }[];
}) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const all = useMemo(
    () => groups.flatMap((g) => g.items).sort((a, b) => a.title.localeCompare(b.title)),
    [groups]
  );

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const concept of all) {
      const first = concept.title.trim()[0];
      if (first) set.add(first.toUpperCase());
    }
    return set;
  }, [all]);

  const isFiltering = query.trim().length > 0 || letter !== null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((concept) => {
      if (letter && concept.title.trim()[0]?.toUpperCase() !== letter) return false;
      if (q && !concept.title.toLowerCase().includes(q) && !concept.definition.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [all, query, letter]);

  return (
    <div>
      <div className="mt-6 border border-hairline bg-white/40 p-4">
        <label htmlFor="concept-search" className="sr-only">
          Search concepts
        </label>
        <input
          id="concept-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts by name or definition…"
          className="w-full border border-hairline bg-paper px-3 py-2 text-sm text-ink placeholder:text-steel focus:border-navy focus:outline-none"
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
              {filtered.map((concept) => (
                <ContentCard key={concept.id} item={concept} description={concept.definition} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-steel">
              No concepts match yet. Try a different search term or letter.
            </p>
          )}
        </div>
      ) : (
        groups.map((group) => (
          <CategorySection
            key={group.category}
            id={slugifyCategory(group.category)}
            title={group.category}
            count={group.items.length}
          >
            {group.items.map((concept) => (
              <ContentCard key={concept.id} item={concept} description={concept.definition} />
            ))}
          </CategorySection>
        ))
      )}
    </div>
  );
}
