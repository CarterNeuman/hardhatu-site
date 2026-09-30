import { Icon } from "./Icon";

const TYPE_META: Record<string, { label: string; className: string }> = {
  career: { label: "Career", className: "text-navy" },
  concept: { label: "Concept", className: "text-amber" },
  phase: { label: "Process phase", className: "text-steel" },
  lesson: { label: "Lesson", className: "text-clay" },
  software: { label: "Software", className: "text-navy" },
  gethired: { label: "Get Hired Guide", className: "text-clay" },
  resume: { label: "Resume Guide", className: "text-steel" },
  interview: { label: "Interview Prep", className: "text-navy" },
  exam: { label: "Exam Prep", className: "text-amber" },
  cheatsheet: { label: "Cheat Sheet", className: "text-clay" },
  quiz: { label: "Career Match Quiz", className: "text-steel" },
  program: { label: "Program Finder", className: "text-navy" },
};

export function TypeBadge({
  type,
  tier,
  size = "sm",
}: {
  type:
    | "career"
    | "concept"
    | "phase"
    | "lesson"
    | "software"
    | "gethired"
    | "resume"
    | "interview"
    | "exam"
    | "cheatsheet"
    | "quiz"
    | "program";
  tier?: "free" | "premium";
  // "lg" is a deliberately larger reading of the same badge, used where
  // the type label doubles as the page's own section eyebrow (e.g. the
  // Get Hired detail page) rather than a small aside next to a title.
  size?: "sm" | "lg";
}) {
  const meta = TYPE_META[type];
  const iconSize = size === "lg" ? 18 : 14;
  const textClass = size === "lg" ? "text-sm" : "text-xs";
  return (
    <div className="flex items-center gap-2">
      <div className={`inline-flex items-center gap-1.5 ${textClass} font-semibold uppercase tracking-wide ${meta.className}`}>
        <Icon kind={type} size={iconSize} />
        {meta.label}
      </div>
      {tier === "premium" && (
        <span className="inline-block border border-amber bg-amber-soft/50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
          Premium
        </span>
      )}
    </div>
  );
}
