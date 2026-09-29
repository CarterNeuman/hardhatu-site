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
}: {
  label: string;
  tone: "amber" | "clay" | "navy" | "steel";
  text: string;
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

  return (
    <div className={`mt-4 border ${toneClasses} px-4 py-3`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-steel">{label}</p>
      <div className="[&>div]:mt-1 [&>div]:space-y-2 [&_p]:text-sm">
        <Prose text={text} />
      </div>
    </div>
  );
}
