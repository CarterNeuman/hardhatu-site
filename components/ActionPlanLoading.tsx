"use client";

import { useEffect, useState } from "react";
import styles from "./ActionPlanLoading.module.css";

const DEFAULT_STEPS = [
  "Matching your trade",
  "Pulling your courses",
  "Lining up training programs",
  "Calculating your pay range",
  "Building your day-by-day calendar",
];

// Shown between submitting the intake form and the real result screen
// (ActionPlanBuilder.tsx) -- the parent picks a randomized duration (see
// BUILD_DURATION_MS_RANGE there) so this never takes the exact same
// amount of time twice, and swaps this component out for the real plan
// right at that duration. The checklist below is driven by its own
// timers scaled to `durationMs` so the last step always lands right as
// (never before) the parent's timer fires -- it should never visibly
// "finish" and then sit idle waiting for the real plan.
export function ActionPlanLoading({
  durationMs,
  steps = DEFAULT_STEPS,
}: {
  durationMs: number;
  steps?: string[];
}) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(0);
    const stepCount = steps.length;
    if (stepCount === 0) return;
    // Evenly space the steps across the duration, but only ever mark
    // the first (stepCount - 1) of them "done" on a timer -- the very
    // last step stays in its "active" (in-progress) state the whole
    // time, since the real plan swap-in (controlled by the parent) is
    // what actually finishes it, not a timer in here.
    const perStep = durationMs / stepCount;
    const timers = Array.from({ length: stepCount - 1 }, (_, i) =>
      setTimeout(() => setCompletedCount(i + 1), Math.round(perStep * (i + 1)))
    );
    return () => timers.forEach(clearTimeout);
  }, [durationMs, steps]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-7 px-6 py-20 text-center">
      <BlueprintCornerMark />

      <div>
        <p className="font-display text-2xl font-bold text-ink">Building your blueprint&hellip;</p>
        <p className="mt-1 text-sm text-steel">This usually takes just a few seconds.</p>
      </div>

      <ul className="flex w-full flex-col gap-2.5 text-left" aria-live="polite">
        {steps.map((step, i) => {
          const done = i < completedCount;
          const active = i === completedCount;
          return (
            <li key={step} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                  done ? "border-navy bg-navy" : active ? "border-amber" : "border-hairline"
                }`}
              >
                {done && <span className="block h-1.5 w-1.5 bg-paper" />}
                {active && !done && (
                  <span className={`block h-1.5 w-1.5 rounded-full bg-amber ${styles.pulseDot}`} />
                )}
              </span>
              <span
                className={
                  done
                    ? "text-sm text-steel"
                    : active
                      ? "text-sm font-semibold text-ink"
                      : "text-sm text-steel/50"
                }
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// A carpenter's framing square, drawn as a looping stroke animation
// (see ActionPlanLoading.module.css) -- on-brand with the site's
// blueprint/construction visual language rather than a generic spinner.
function BlueprintCornerMark() {
  const ticks = [28, 44, 60, 76, 92];
  return (
    <svg viewBox="0 0 120 120" width="72" height="72" aria-hidden="true" className={styles.mark}>
      <path className={styles.markLine} d="M12 108 L12 12 L108 12" />
      {ticks.map((pos) => (
        <line key={`v-${pos}`} className={styles.tick} x1={12} y1={pos} x2={22} y2={pos} />
      ))}
      {ticks.map((pos) => (
        <line key={`h-${pos}`} className={styles.tick} x1={pos} y1={108} x2={pos} y2={98} />
      ))}
    </svg>
  );
}
