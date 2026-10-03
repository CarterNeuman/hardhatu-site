import { Prose } from "./Prose";

// A visually distinct box for the two fields every concept is required to
// have (see ConceptSchema.careerAngle / whatGoesWrong): "amber" reads as
// informational (who this matters to), "clay" reads as cautionary (where
// it goes wrong) — matching how those two colors are already used
// elsewhere on the site (amber = concept/informational, clay = warning,
// e.g. the wrong-answer state in LessonQuiz). Text runs through Prose so a
// career or concept mentioned inline (e.g. "a [[career-project-manager]]
// lives inside this daily") is a real clickable link, not just a name-drop.
export function Callout({
  label,
  tone,
  text,
  highlight,
}: {
  label: string;
  tone: "amber" | "clay" | "navy" | "steel";
  text: string;
  // An optional short, punchy statement rendered large and bold above the
  // body text, with a heavier accent border of its own — the "stand out
  // more than the usual Callout" treatment (first used on the electrician
  // ownerPayNote, where no sourced dollar figure exists but the upside/risk
  // claim itself is worth leading with). Omit it and a Callout renders
  // exactly as before.
  highlight?: string;
}) {
  const toneClasses = {
    amber: "border-amber/40 bg-amber-soft/40",
    clay: "border-clay/40 bg-clay/[0.06]",
    // navy: the "big picture" / industry-insight tone, used on Phases for
    // the cost-of-change-curve callout — informational but weightier than
    // amber, matching navy's use elsewhere as the site's primary brand color.
    navy: "border-navy/40 bg-navy/[0.05]",
    // steel: a neutral "in practice, here's the nuance" tone, used on Phases
    // for the non-linear-reality callout — deliberately less alarming than
    // clay (which reads as a warning) since this isn't something going
    // wrong, just the textbook model being more flexible than it looks.
    steel: "border-steel/40 bg-steel/[0.06]",
  }[tone];

  // Solid-color pairing for the highlight's left accent + text, one step
  // bolder than the soft tinted toneClasses above (which stay as the
  // container's own border/background either way).
  const highlightAccent = {
    amber: "border-amber text-amber",
    clay: "border-clay text-clay",
    navy: "border-navy text-navy",
    steel: "border-steel text-steel",
  }[tone];

  return (
    <div className={`mt-4 border ${highlight ? "border-2" : ""} ${toneClasses} px-4 py-3`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-steel">{label}</p>
      {highlight && (
        <p
          className={`mt-2 border-l-4 ${highlightAccent} pl-3 font-display text-xl font-bold leading-snug sm:text-2xl`}
        >
          {highlight}
        </p>
      )}
      <div className="[&>div]:mt-1 [&>div]:space-y-2 [&_p]:text-sm">
        <Prose text={text} />
      </div>
    </div>
  );
}
