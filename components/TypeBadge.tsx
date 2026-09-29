import { Icon } from "./Icon";

const TYPE_META: Record<string, { label: string; className: string }> = {
  career: { label: "Career", className: "text-navy" },
  concept: { label: "Concept", className: "text-amber" },
  phase: { label: "Process phase", className: "text-steel" },
  lesson: { label: "Lesson", className: "text-clay" },
  software: { label: "Software", className: "text-navy" },
  pathway: { label: "Pathway", className: "text-clay" },
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
}: {
  type:
    | "career"
    | "concept"
    | "phase"
    | "lesson"
    | "software"
    | "pathway"
    | "resume"
    | "interview"
    | "exam"
    | "cheatsheet"
    | "quiz"
    | "program";
  tier?: "free" | "premium";
}) {
  const meta = TYPE_META[type];
  return (
    <div className="flex items-center gap-2">
      <div className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${meta.className}`}>
        <Icon kind={type} size={14} />
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
