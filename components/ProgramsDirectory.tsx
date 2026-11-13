"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { ProgramTypeBadge } from "@/components/ProgramTypeBadge";
import type { Program } from "@/lib/types";

// Display order for the type-grouped sections below. A programType not
// listed here (there will be more as the directory grows) still shows,
// just sorted after these -- same "known order first, everything else
// still visible" convention as CAREER_CATEGORY_ORDER/CONCEPT_CATEGORY_ORDER
// in lib/types.ts, just kept local here since programType is free text,
// not a fixed enum, and nothing else needs this grouping yet.
const PROGRAM_TYPE_ORDER = [
  "Registered Apprenticeship",
  "Union Program",
  "Trade School",
  "Certificate Program",
  "Online Course",
  "Licensure Pathway",
];

// A Program enriched, server-side, with the career categories it links
// to (derived from careerIds -> each career's own category field, since
// Program has no native category of its own). Carried down so the search
// box below can match "insurance" or "estimating" against a program even
// when neither word appears in its title, org, or tagline.
export type SearchableProgram = Program & { categories: string[] };

function groupByType(programs: SearchableProgram[]): { type: string; items: SearchableProgram[] }[] {
  const groups = new Map<string, SearchableProgram[]>();
  for (const program of programs) {
    const list = groups.get(program.programType) ?? [];
    list.push(program);
    groups.set(program.programType, list);
  }
  return Array.from(groups.entries())
    .map(([type, items]) => ({ type, items }))
    .sort((a, b) => {
      const ai = PROGRAM_TYPE_ORDER.indexOf(a.type);
      const bi = PROGRAM_TYPE_ORDER.indexOf(b.type);
      if (ai === -1 && bi === -1) return a.type.localeCompare(b.type);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

function matches(program: SearchableProgram, query: string): boolean {
  if (!query) return true;
  const haystack = [
    program.title,
    program.organization,
    program.tagline,
    program.programType,
    program.location,
    ...program.categories,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

// A single program listing card. Richer than the generic ContentCard used
// elsewhere -- programs carry enough directory-specific metadata (type,
// org, location, cost, duration) that a plain title+description card
// undersells how different these are from one another. Kept local to this
// directory rather than folded into ContentCard, since no other listing
// page needs a programType badge or a cost/duration row.
function ProgramCard({ program }: { program: SearchableProgram }) {
  return (
    <Link
      href={urlFor(program)}
      className="group flex flex-col gap-3 border border-hairline bg-white/40 p-4 transition-colors hover:border-navy hover:bg-white/70"
    >
      <div className="flex items-start justify-between gap-2">
        <ProgramTypeBadge programType={program.programType} />
        <span className="text-right text-[0.68rem] font-semibold uppercase tracking-wide text-steel">
          {program.location}
        </span>
      </div>

      <div>
        <h3 className="break-words font-display text-lg font-semibold leading-snug text-ink group-hover:text-navy">
          {program.title}
        </h3>
        <p className="mt-0.5 text-sm font-semibold text-clay">{program.organization}</p>
      </div>

      <p className="line-clamp-3 text-sm leading-snug text-steel">{program.tagline}</p>

      {(program.costNote || program.durationNote) && (
        <ul className="mt-auto flex flex-col gap-1 border-t border-hairline pt-3 text-xs text-steel">
          {program.durationNote && (
            <li className="flex gap-1.5">
              <span className="font-semibold uppercase tracking-wide text-ink">Duration</span>
              {program.durationNote}
            </li>
          )}
          {program.costNote && (
            <li className="flex gap-1.5">
              <span className="font-semibold uppercase tracking-wide text-ink">Cost</span>
              {program.costNote}
            </li>
          )}
        </ul>
      )}

      <span className="mt-1 text-sm font-semibold text-navy">View program &rarr;</span>
    </Link>
  );
}

export function ProgramsDirectory({ programs }: { programs: SearchableProgram[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => programs.filter((p) => matches(p, query)), [programs, query]);
  const grouped = useMemo(() => groupByType(filtered), [filtered]);

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
          placeholder="Search programs by name, org, type, or field..."
          aria-label="Search programs"
          className="w-full border border-hairline bg-white/60 py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-steel focus:border-navy focus:outline-none"
        />
      </div>

      <p className="mt-3 text-sm text-steel">
        {filtered.length === programs.length
          ? `${programs.length} program${programs.length === 1 ? "" : "s"} so far`
          : `${filtered.length} of ${programs.length} program${programs.length === 1 ? "" : "s"} match`}
      </p>

      {grouped.length === 0 ? (
        <p className="mt-8 border border-dashed border-hairline p-6 text-sm text-steel">
          No programs match &ldquo;{query}&rdquo; yet.{" "}
          <button
            type="button"
            onClick={() => setQuery("")}
            className="font-semibold text-navy hover:underline"
          >
            Clear search
          </button>
        </p>
      ) : (
        <div className="mt-8 space-y-12">
          {grouped.map((group) => (
            <section key={group.type}>
              <h2 className="font-display text-xl font-bold text-ink">{group.type}</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
