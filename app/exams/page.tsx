import type { Metadata } from "next";
import { getAllContent, groupExamsByCategory, slugifyCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ExamPatchCard } from "@/components/ExamPatchCard";
import { CATEGORY_SLUG } from "@/lib/content-client";

export const metadata: Metadata = {
  title: "Get Qualified",
  description:
    "Independent study material for real construction certifications: OSHA-10/30, the PMP, CCM, LEED Green Associate, and more.",
};

export default function ExamsIndexPage() {
  const { exams } = getAllContent();
  const groups = groupExamsByCategory(exams);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-start gap-3">
        <HardHatIcon />
        <div>
          <h1 className="font-display text-4xl font-bold text-ink">Get Qualified</h1>
          <p className="mt-3 max-w-2xl text-steel">
            {exams.length} certifications: unofficial, independent study material tied to the
            real exams the industry actually asks for, grouped by the career category they matter
            most to. Certifications marked{" "}
            <span className="font-semibold text-ink">Entry Level</span> have no prior
            work-experience requirement to sit the exam.
          </p>
        </div>
      </div>

      {/* Caution-tape divider — the page's one construction-art flourish */}
      <div
        className="mt-8 h-3 w-full border-y border-ink/10"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, #8C6217 0 14px, #1C2B33 14px 28px)",
        }}
        aria-hidden="true"
      />

      {groups.map((group) => (
        <CategorySection
          key={group.category}
          id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
          title={group.category}
          count={group.items.length}
        >
          {group.items.map((exam) => (
            <ExamPatchCard key={exam.id} exam={exam} entryLevel={exam.tier === "free"} />
          ))}
        </CategorySection>
      ))}
    </div>
  );
}

// Decorative hard hat glyph next to the page title — the site's thin-stroke
// icon style, kept local to this page since it's a one-off flourish rather
// than a reusable content-type icon (Icon.tsx covers those).
function HardHatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={32}
      height={32}
      aria-hidden="true"
      focusable="false"
      className="mt-1 shrink-0 text-clay"
    >
      <path
        d="M4 17c0-5 3.6-8.5 8-8.5s8 3.5 8 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={2.5} y={17} width={19} height={2.6} rx={0} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <line x1={12} y1={8.5} x2={12} y2={5.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}
