"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconKind } from "./Icon";

// One flattened, pre-built search item per content type, computed server
// side in app/page.tsx (where getAllContent() already runs) and passed in
// as a plain prop. Kept intentionally generic (no Career/Concept/etc.
// union here) so this component never needs to know each type's real
// shape, just title/description/href/type the way ContentCard already
// treats every content type generically.
export type SearchItem = {
  id: string;
  title: string;
  description: string;
  type: IconKind;
  href: string;
};

const RESULT_LIMIT = 8;

const TYPE_LABEL: Partial<Record<IconKind, string>> = {
  career: "Career",
  concept: "Concept",
  lesson: "Lesson",
  software: "Software",
  exam: "Exam Prep",
  interview: "Interview Prep",
  phase: "Phase",
};

// The homepage's sitewide search, same substring-match mechanics as
// ConceptExplorer/CareerExplorer (plain client-side filter over an array
// the server already loaded, no API route, no search index to maintain),
// just spanning every content type at once instead of one, and shown as a
// floating dropdown under the hero's CTA buttons instead of an inline grid
// (see chat: 2026-10-16). A relevance score (title starts with the query,
// then title contains it, then description contains it) keeps the most
// likely match on top without needing a real search library.
export function SiteSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return items
      .map((item) => {
        const title = item.title.toLowerCase();
        let score = -1;
        if (title.startsWith(q)) score = 3;
        else if (title.includes(q)) score = 2;
        else if (item.description.toLowerCase().includes(q)) score = 1;
        return { item, score };
      })
      .filter((scored) => scored.score >= 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .map((scored) => scored.item);
  }, [items, q]);

  const visible = results.slice(0, RESULT_LIMIT);
  const showDropdown = open && q.length > 0;

  // Reset the keyboard-highlighted row whenever the result set changes, so
  // it never points past the end of a shorter new list.
  useEffect(() => {
    setActiveIndex(0);
  }, [q]);

  // Close on an outside click. Everything (input + dropdown panel) lives
  // inside one ref'd wrapper, so this only needs the single-subtree check,
  // not the two-ref dance the header's desktop/mobile nav needed.
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || visible.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, visible.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = visible[activeIndex];
      if (target) {
        setOpen(false);
        router.push(target.href);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={wrapperRef} className="relative mt-6 max-w-md">
      <label htmlFor="site-search" className="sr-only">
        Search the site
      </label>
      <div className="relative">
        <SearchGlyph className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search careers, concepts, lessons…"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="site-search-results"
          aria-autocomplete="list"
          className="w-full border border-hairline bg-white/70 py-3 pl-10 pr-3 text-sm text-ink placeholder:text-steel focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
        />
      </div>

      {showDropdown && (
        <div
          id="site-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[70vh] overflow-y-auto border border-hairline bg-paper shadow-lg"
        >
          {visible.length === 0 ? (
            <p className="p-4 text-sm text-steel">No matches for &ldquo;{query.trim()}&rdquo; yet. Try a different word.</p>
          ) : (
            <>
              <ul>
                {visible.map((item, i) => (
                  <li key={item.id} role="option" aria-selected={i === activeIndex}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex items-start gap-3 border-b border-hairline p-3 transition-colors last:border-b-0 ${
                        i === activeIndex ? "bg-amber-soft" : "hover:bg-white/60"
                      }`}
                    >
                      <Icon kind={item.type} size={18} className="mt-0.5 shrink-0 text-clay" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate font-display text-sm font-semibold text-ink">
                            {item.title}
                          </span>
                          <span className="shrink-0 border border-hairline px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-steel">
                            {TYPE_LABEL[item.type] ?? item.type}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-steel">{item.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > RESULT_LIMIT && (
                <p className="border-t border-hairline p-2.5 text-center text-xs text-steel">
                  {results.length - RESULT_LIMIT} more match{results.length - RESULT_LIMIT === 1 ? "" : "es"}, keep typing to narrow it down
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Small magnifying-glass glyph, same 1.5px thin-stroke "blueprint" language
// as every other icon on the site (Icon.tsx, the PathIcon*/BenefitIcon*
// set on this same homepage), kept local since nothing else needs it yet.
function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  );
}
