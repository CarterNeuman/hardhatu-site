"use client";

// The Blueprint intake form. Purely presentational: every value and
// setter lives in ActionPlanBuilder, which also owns submit. The one
// thing computed here is the live preview in the side panel -- the same
// pure generator the real plan uses (lib/action-plan-generate.ts), run
// against the answers as they change, so the panel's numbers are the
// plan's real numbers and not an estimate.
import { useMemo } from "react";
import type { ApplicationStatus } from "@/lib/action-plan-generator";
import { generateActionPlan } from "@/lib/action-plan-generate";
import type { CategoryData } from "@/lib/action-plan-data";
import { BLUEPRINT_GRID } from "@/lib/blueprint-style";

const MONO = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const HOURS_PRESETS: { value: number; label: string; note: string }[] = [
  { value: 5, label: "5", note: "A few evenings" },
  { value: 10, label: "10", note: "Steady" },
  { value: 20, label: "20", note: "Part-time job" },
  { value: 40, label: "40", note: "All in" },
];

const TIMELINE_PRESETS: { value: number; label: string }[] = [
  { value: 0, label: "Let the plan decide" },
  { value: 2, label: "2 weeks" },
  { value: 4, label: "4 weeks" },
  { value: 8, label: "8 weeks" },
  { value: 12, label: "12 weeks" },
];

const INPUT =
  "mt-2 block w-full border border-steel/40 bg-white/80 px-3.5 py-2.5 text-base text-ink placeholder:text-steel/70 focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy";

// "OSHA 10-Hour Construction" -> "OSHA 10", "PMP (Project Management
// Professional)" -> "PMP": the short name someone would actually type.
function shortCredentialName(title: string): string {
  return title.split(" (")[0].replace(/-Hour.*$/i, "").trim();
}

function Step({
  n,
  title,
  hint,
  children,
}: {
  n: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-t border-hairline py-7 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-4">
      <p className="pt-0.5 text-sm font-medium text-clay" style={MONO} aria-hidden="true">
        {n}
      </p>
      <div className="min-w-0">
        <p className="font-display text-2xl font-bold leading-tight text-ink">{title}</p>
        {hint && <p className="mt-1 text-sm leading-snug text-steel">{hint}</p>}
        {children}
      </div>
    </div>
  );
}

// A radio rendered as a selectable tile. The real <input> stays in the
// DOM (visually hidden) so keyboard arrows, focus and screen-reader
// semantics are the browser's own.
function ChoiceTile({
  name,
  checked,
  onChange,
  title,
  note,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note?: string;
}) {
  return (
    <label className="block cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-full flex-col justify-center border border-steel/40 bg-white/70 px-3.5 py-3 text-ink transition-colors hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy">
        <span className="font-display text-base font-bold leading-tight sm:text-lg">{title}</span>
        {note && <span className="mt-0.5 text-xs leading-snug opacity-75">{note}</span>}
      </span>
    </label>
  );
}

function PresetChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
        active ? "border-navy bg-navy text-paper" : "border-steel/40 bg-white/70 text-ink hover:border-navy"
      }`}
    >
      {children}
    </button>
  );
}

export function ActionPlanForm({
  dataByCategory,
  categories,
  category,
  onCategoryChange,
  careerId,
  onCareerChange,
  status,
  onStatusChange,
  location,
  onLocationChange,
  hoursPerWeek,
  onHoursChange,
  timelineWeeks,
  onTimelineChange,
  certsHeld,
  onCertsChange,
  onSubmit,
}: {
  dataByCategory: Record<string, CategoryData>;
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
  careerId: string;
  onCareerChange: (careerId: string) => void;
  status: ApplicationStatus;
  onStatusChange: (status: ApplicationStatus) => void;
  location: string;
  onLocationChange: (location: string) => void;
  hoursPerWeek: number;
  onHoursChange: (hours: number) => void;
  timelineWeeks: number;
  onTimelineChange: (weeks: number) => void;
  certsHeld: string;
  onCertsChange: (certs: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const categoryData = dataByCategory[category];
  const careerOptions = categoryData?.careers ?? [];
  const career = careerOptions.find((c) => c.id === careerId);

  const preview = useMemo(
    () => generateActionPlan(dataByCategory, category, careerId, { status, location, hoursPerWeek, timelineWeeks, certsHeld }),
    [dataByCategory, category, careerId, status, location, hoursPerWeek, timelineWeeks, certsHeld]
  );
  const previewSiteLinks = useMemo(() => {
    if (preview === "coming-soon") return 0;
    const hrefs = new Set<string>();
    for (const day of preview.days) for (const r of day.resources) if (!r.href.startsWith("#")) hrefs.add(r.href);
    return hrefs.size;
  }, [preview]);

  // Credentials worth offering as one-tap additions: the Exam Prep
  // guides tied to this career (or category), by their short names.
  const credentialSuggestions = useMemo(() => {
    const exams = (careerId ? categoryData?.examsByCareerId[careerId] : undefined) ?? categoryData?.categoryExams ?? [];
    const names = exams.filter((e) => e.entryLevel !== false).map((e) => shortCredentialName(e.title));
    return [...new Set([...names, "Driver's license"])].slice(0, 5);
  }, [categoryData, careerId]);

  function addCredential(name: string) {
    if (certsHeld.toLowerCase().includes(name.toLowerCase())) return;
    onCertsChange(certsHeld.trim() ? `${certsHeld.trim().replace(/,\s*$/, "")}, ${name}` : name);
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <Step n="01" title="What kind of work are you after?" hint="Pick the part of the industry. You can narrow it to one role next.">
          <fieldset className="mt-3">
            <legend className="sr-only">Career category</legend>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => {
                const comingSoon = dataByCategory[c]?.skeleton?.comingSoon !== false;
                const count = dataByCategory[c]?.careers.length ?? 0;
                return (
                  <ChoiceTile
                    key={c}
                    name="ap-category"
                    checked={category === c}
                    onChange={() => onCategoryChange(c)}
                    title={c}
                    note={comingSoon ? "Plan coming soon" : `${count} career${count === 1 ? "" : "s"}`}
                  />
                );
              })}
            </div>
          </fieldset>
        </Step>

        {careerOptions.length > 0 && (
          <Step n="02" title="Any specific role?" hint="Optional. A specific role gets its own lessons, programs, exams, and pay range.">
            <label htmlFor="ap-career" className="sr-only">
              Specific career (optional)
            </label>
            <select id="ap-career" value={careerId} onChange={(e) => onCareerChange(e.target.value)} className={INPUT}>
              <option value="">Not sure yet, keep it general</option>
              {careerOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </Step>
        )}

        <Step n="03" title="Where are you right now?">
          <fieldset className="mt-3">
            <legend className="sr-only">Where are you in the process?</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <ChoiceTile
                name="ap-status"
                checked={status === "browsing"}
                onChange={() => onStatusChange("browsing")}
                title="Just looking"
                note="Figuring out whether this is for me"
              />
              <ChoiceTile
                name="ap-status"
                checked={status === "applying"}
                onChange={() => onStatusChange("applying")}
                title="Actively applying"
                note="I want interviews on the calendar"
              />
            </div>
          </fieldset>
        </Step>

        <Step n="04" title="Where are you looking?" hint="Used for your outreach templates and job-board searches.">
          <label htmlFor="ap-location" className="sr-only">
            Location
          </label>
          <input
            id="ap-location"
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="City, State"
            maxLength={100}
            autoComplete="address-level2"
            className={INPUT}
          />
        </Step>

        <Step n="05" title="Set your pace" hint="More hours or a longer runway means more steps, not the same steps spread thinner.">
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="ap-hours" className="text-sm font-semibold text-ink">
                Hours per week you can give this
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {HOURS_PRESETS.map((p) => (
                  <PresetChip key={p.value} active={hoursPerWeek === p.value} onClick={() => onHoursChange(p.value)}>
                    {p.label}
                    <span className="ml-1.5 text-xs opacity-75">{p.note}</span>
                  </PresetChip>
                ))}
              </div>
              <input
                id="ap-hours"
                type="number"
                min={1}
                max={60}
                required
                // Shown blank (not "0") while the field is empty, so clearing
                // it to type a new number doesn't leave a stuck leading zero.
                value={hoursPerWeek === 0 ? "" : hoursPerWeek}
                onChange={(e) => onHoursChange(Number(e.target.value))}
                className={`${INPUT} max-w-[9rem]`}
              />
            </div>
            <div>
              <label htmlFor="ap-timeline" className="text-sm font-semibold text-ink">
                Target timeline, in weeks
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {TIMELINE_PRESETS.map((p) => (
                  <PresetChip key={p.value} active={timelineWeeks === p.value} onClick={() => onTimelineChange(p.value)}>
                    {p.label}
                  </PresetChip>
                ))}
              </div>
              <input
                id="ap-timeline"
                type="number"
                min={0}
                max={52}
                value={timelineWeeks}
                onChange={(e) => onTimelineChange(Number(e.target.value))}
                className={`${INPUT} max-w-[9rem]`}
              />
              <p className="mt-1.5 text-xs text-steel">0 lets the plan set its own length from your hours per week.</p>
            </div>
          </div>
        </Step>

        <Step n="06" title="What do you already have?" hint="Certifications, licenses, or experience. Anything you list is skipped or checked off in your plan.">
          <label htmlFor="ap-certs" className="sr-only">
            Certifications or experience you already have
          </label>
          <textarea
            id="ap-certs"
            value={certsHeld}
            onChange={(e) => onCertsChange(e.target.value)}
            placeholder="e.g. OSHA 10, valid driver's license"
            rows={2}
            maxLength={500}
            className={INPUT}
          />
          {credentialSuggestions.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-steel">Quick add:</span>
              {credentialSuggestions.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => addCredential(name)}
                  className="border border-hairline bg-white/60 px-2 py-1 text-xs font-medium text-navy transition-colors hover:border-navy"
                >
                  + {name}
                </button>
              ))}
            </div>
          )}
        </Step>

      </div>

      {/* Live preview. aria-live so a screen-reader user hears the plan's
          size change as they answer, without it interrupting typing. */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="bg-ink text-paper" style={BLUEPRINT_GRID}>
          <div className="px-5 py-5" aria-live="polite">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-soft" style={MONO}>
              Your Blueprint so far
            </p>
            <p className="mt-2 font-display text-3xl font-bold leading-tight text-paper">{career?.title ?? category}</p>
            {preview === "coming-soon" ? (
              <p className="mt-3 text-sm leading-relaxed text-paper/80">
                This category&rsquo;s plan isn&rsquo;t written yet. Its Get Hired guide covers the same ground in
                checklist form.
              </p>
            ) : (
              <>
                <dl className="mt-4 grid grid-cols-3 gap-px bg-paper/15 text-center">
                  {[
                    { label: "days", value: preview.totalDays },
                    { label: "steps", value: preview.days.length },
                    { label: "site links", value: previewSiteLinks },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-ink px-1 py-3">
                      <dd className="font-display text-3xl font-bold leading-none text-paper">{stat.value}</dd>
                      <dt className="mt-1 text-[10px] uppercase tracking-[0.14em] text-paper/70">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/70">It opens with</p>
                <ol className="mt-2 flex flex-col gap-2">
                  {preview.days.slice(0, 3).map((day, i) => (
                    <li key={day.key} className="flex gap-2.5 text-sm leading-snug text-paper/90">
                      <span className="text-amber-soft" style={MONO}>
                        {i + 1}
                      </span>
                      <span>{day.title}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
          <button
            type="submit"
            className="block w-full bg-amber-soft px-5 py-4 font-display text-xl font-bold uppercase tracking-wide text-ink transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Build my Blueprint &rarr;
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-steel">
          Saved to your account automatically. Add it to your calendar or print it once it&rsquo;s built.
        </p>
      </aside>
    </form>
  );
}
