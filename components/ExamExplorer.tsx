"use client";

// The browsable part of the Get Qualified index: a level filter and
// category jump links over a grid of credential cards. The page's own
// theme is the wallet card -- most construction credentials (an OSHA 10
// card, an NCCCO card, a journeyman license) physically live in a
// wallet and get shown at the gate -- so each exam guide is drawn as
// one: issuer across the top, the credential's name, who it's for, and
// a lanyard slot. The data arrives already slimmed by the server page
// (app/exams/page.tsx); nothing here reads content off disk.
import { useState } from "react";
import Link from "next/link";

const MONO = { fontFamily: "'IBM Plex Mono', monospace" } as const;

export type ExamCard = {
  id: string;
  href: string;
  name: string;
  // Short issuer name for the card's top strip ("OSHA", "PMI").
  issuer: string;
  tagline: string;
  // No prior work experience needed to sit it.
  entryLevel: boolean;
  questionCount: number;
  comingSoon: boolean;
  // The one career this credential is written for, if any.
  careerTitle?: string;
};
export type ExamGroup = { category: string; anchor: string; exams: ExamCard[] };

type Level = "all" | "entry" | "experienced";
const LEVELS: { value: Level; label: string }[] = [
  { value: "all", label: "All" },
  { value: "entry", label: "No experience needed" },
  { value: "experienced", label: "Experience required" },
];

export function CredentialCard({ exam, onDark = false }: { exam: ExamCard; onDark?: boolean }) {
  return (
    <Link
      href={exam.href}
      className={`group relative flex h-full flex-col border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        onDark
          ? "border-paper/25 bg-paper text-ink hover:border-amber-soft focus-visible:outline-amber-soft"
          : "border-ink/15 bg-white/70 hover:border-navy hover:bg-white focus-visible:outline-navy"
      }`}
    >
      {/* Issuer strip, with the lanyard slot punched above the text. */}
      <div className={`px-4 pb-2 pt-1.5 ${exam.entryLevel ? "bg-navy" : "bg-ink"}`}>
        <span aria-hidden="true" className="mx-auto block h-1.5 w-9 rounded-full bg-paper/90" />
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-paper" style={MONO}>
            {exam.issuer}
          </p>
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-soft">
            {exam.entryLevel ? "Entry level" : "Experienced"}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="font-display text-xl font-bold leading-tight text-ink group-hover:text-navy">{exam.name}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm leading-snug text-steel">{exam.tagline}</p>

        <div className="mt-auto pt-4">
        <dl className="grid grid-cols-2 gap-x-3 border-t border-hairline text-xs">
          <div className="mt-3">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Practice</dt>
            <dd className="mt-0.5 font-medium text-ink">
              {exam.comingSoon ? "Coming soon" : `${exam.questionCount} questions`}
            </dd>
          </div>
          <div className="mt-3 min-w-0">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Built for</dt>
            <dd className="mt-0.5 truncate font-medium text-ink">{exam.careerTitle ?? "Any role"}</dd>
          </div>
        </dl>
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-navy">
          Open study guide <span aria-hidden="true">&rarr;</span>
        </p>
      </div>
    </Link>
  );
}

export function ExamExplorer({ groups }: { groups: ExamGroup[] }) {
  const [level, setLevel] = useState<Level>("all");
  const matches = (exam: ExamCard) =>
    level === "all" || (level === "entry" ? exam.entryLevel : !exam.entryLevel);
  const visibleGroups = groups
    .map((group) => ({ ...group, exams: group.exams.filter(matches) }))
    .filter((group) => group.exams.length > 0);
  const shownCount = visibleGroups.reduce((sum, group) => sum + group.exams.length, 0);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b-2 border-ink pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">Every credential</h2>
          <p className="mt-1 text-sm text-steel" aria-live="polite">
            Showing {shownCount} study guide{shownCount === 1 ? "" : "s"}, grouped by the kind of work they matter most to.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Filter by experience needed</legend>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="exam-level"
                  className="peer sr-only"
                  checked={level === option.value}
                  onChange={() => setLevel(option.value)}
                />
                <span className="block border border-steel/40 bg-white/70 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Jump links -- one per category that has anything under the
          current filter. */}
      <nav aria-label="Jump to a category" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {visibleGroups.map((group) => (
          <a
            key={group.anchor}
            href={`#${group.anchor}`}
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            {group.category}
            <span className="ml-1.5 text-xs font-normal text-steel" style={MONO}>
              {group.exams.length}
            </span>
          </a>
        ))}
      </nav>

      {visibleGroups.map((group) => (
        <section key={group.anchor} id={group.anchor} aria-labelledby={`${group.anchor}-heading`} className="scroll-mt-6 pt-10">
          <div className="flex items-baseline gap-3">
            <h3 id={`${group.anchor}-heading`} className="border-l-[3px] border-amber pl-3 font-display text-2xl font-bold text-ink">
              {group.category}
            </h3>
            <p className="text-xs text-steel" style={MONO}>
              {group.exams.length} guide{group.exams.length === 1 ? "" : "s"}
            </p>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.exams.map((exam) => (
              <li key={exam.id}>
                <CredentialCard exam={exam} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
