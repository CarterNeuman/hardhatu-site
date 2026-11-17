"use client";

import { useState, useTransition } from "react";
import { setStatePreference } from "@/app/actions/set-state-preference";

// A small "what state are you in?" picker, used on the Career Quiz,
// Action Plan and College vs. Trades pages. Selecting a state calls the
// setStatePreference server action, which stores it as the sticky
// cookie the Explore menu's recommended state (and this picker's own
// pre-fill, via lib/state-detection.ts's getKnownStateCode) read back
// afterward. Each page renders this only behind SHOW_STATE_DETECTION --
// built now, turned on once the state guide rollout is far enough along
// (see claude/state-guides-rollout.md).
export function StateDetectionPicker({
  guides,
  initialCode,
  label = "What state are you in?",
  note,
  dark = false,
}: {
  guides: { code: string; name: string }[];
  initialCode?: string;
  label?: string;
  note?: string;
  // For placement on a dark background (the Action Plan's hero), since
  // the default styling assumes the site's usual light paper background.
  dark?: boolean;
}) {
  const [value, setValue] = useState(initialCode ?? "");
  const [, startTransition] = useTransition();

  return (
    <label className="block max-w-xs">
      <span className={`text-xs font-semibold uppercase tracking-wide ${dark ? "text-paper/70" : "text-steel"}`}>{label}</span>
      <select
        value={value}
        onChange={(e) => {
          const code = e.target.value;
          setValue(code);
          if (code) {
            startTransition(() => {
              void setStatePreference(code);
            });
          }
        }}
        className={
          dark
            ? "mt-1.5 block w-full border border-paper/40 bg-transparent px-3 py-2 text-sm font-semibold text-paper focus:border-amber-soft focus:outline-none"
            : "mt-1.5 block w-full border border-hairline bg-paper px-3 py-2 text-sm font-semibold text-ink focus:border-navy focus:outline-none"
        }
      >
        <option value="" className="text-ink">
          Choose a state
        </option>
        {guides.map((g) => (
          <option key={g.code} value={g.code} className="text-ink">
            {g.name}
          </option>
        ))}
      </select>
      {note && <span className={`mt-1 block text-xs leading-snug ${dark ? "text-paper/60" : "text-steel"}`}>{note}</span>}
    </label>
  );
}
