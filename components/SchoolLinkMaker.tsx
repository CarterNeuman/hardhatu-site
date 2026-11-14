"use client";

import { useMemo, useState } from "react";

// Builds a tagged link for a school (utm_source = the school's name, slugged)
// so visits it brings in show up separately in analytics. Nothing is sent
// anywhere: the link is assembled in the browser.
const DESTINATIONS = [
  { path: "/quizzes/find-your-career", label: "Career quiz" },
  { path: "/", label: "Homepage" },
  { path: "/states/georgia", label: "Georgia field guide" },
  { path: "/counselors/parent-handout", label: "Parent handout" },
];

const SITE = "https://www.breakgroundu.com";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function SchoolLinkMaker() {
  const [school, setSchool] = useState("");
  const [dest, setDest] = useState(DESTINATIONS[0].path);
  const [copied, setCopied] = useState(false);

  const slug = slugify(school);
  const url = useMemo(() => {
    if (!slug) return "";
    const params = new URLSearchParams({ utm_source: slug, utm_medium: "counselor", utm_campaign: "school-link" });
    return `${SITE}${dest}?${params.toString()}`;
  }, [slug, dest]);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-5 rounded-lg border border-hairline bg-white p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">School name</span>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="e.g. Northview High School"
            className="mt-1 w-full rounded-sm border-2 border-hairline px-3 py-2 text-ink focus:border-navy focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Where should it go?</span>
          <select
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="mt-1 w-full rounded-sm border-2 border-hairline bg-white px-3 py-2 text-ink focus:border-navy focus:outline-none"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.path} value={d.path}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-ink">Your link</p>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
          <output aria-live="polite" className="block min-h-[42px] flex-1 break-all rounded-sm bg-[#FBF7EE] px-3 py-2 font-mono text-sm text-ink">
            {url || <span className="text-steel">Type your school&rsquo;s name to make a link.</span>}
          </output>
          <button
            type="button"
            onClick={copy}
            disabled={!url}
            className="rounded-sm bg-ink px-4 py-2 text-sm font-bold text-paper hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-steel">
          Tip: to turn it into a QR code for a poster or slide, open the link in Chrome and use Share, then Create QR code.
        </p>
      </div>
    </div>
  );
}
