"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { urlFor, slugifyCategory } from "@/lib/content-client";
import type { Career, Concept, GetHired, InterviewPrep } from "@/lib/types";

// The "Solid Mark, Tile Badge" logo — a rounded navy tile holding a solid
// hardhat silhouette, its brim and rib lines etched in reverse, with an
// amber knob at the peak. Colors are fixed rather than currentColor since
// the mark is its own self-contained badge, unlike the old thin-stroke icon.
export function HardHatMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <rect x="2" y="2" width="196" height="196" rx="28" fill="#1F3F52" />
      <g transform="translate(30,47.5) scale(0.7)">
        <path
          d="M15,110 Q15,30 100,20 Q185,30 185,110 Q100,145 15,110 Z"
          fill="#EFEDE6"
          stroke="#EFEDE6"
          strokeWidth={3}
        />
        <path d="M45,100 Q100,122 155,100" fill="none" stroke="#1F3F52" strokeWidth={2.5} />
        <line x1="70" y1="38" x2="70" y2="103" stroke="#1F3F52" strokeWidth={2} />
        <line x1="100" y1="28" x2="100" y2="118" stroke="#1F3F52" strokeWidth={2} />
        <line x1="130" y1="38" x2="130" y2="103" stroke="#1F3F52" strokeWidth={2} />
        <circle cx="100" cy="20" r="6" fill="#B67F1E" />
      </g>
    </svg>
  );
}

type CareerGroup = { category: string; items: Career[] };
type InterviewGroup = { category: string; items: InterviewPrep[] };
type ConceptGroup = { category: string; items: Concept[] };

const CATEGORY_SLUG: Record<string, string> = {
  "Field & Trades": "field-trades",
  "Project & Operations": "project-operations",
  "Preconstruction & Estimating": "preconstruction-estimating",
  Business: "business",
  "Technology & Design": "technology-design",
  "Specialized Construction": "specialized-construction",
  "Insurance & Claims": "insurance-claims",
  "Consultants & Advisory": "consultants-advisory",
};

type MenuKey = "careers" | "concepts" | "gethired" | "interviews";

export function Header({
  careerGroups,
  interviewGroups,
  conceptGroups,
  getHiredGuides,
  careerCount,
  interviewCount,
  conceptCount,
}: {
  careerGroups: CareerGroup[];
  interviewGroups: InterviewGroup[];
  conceptGroups: ConceptGroup[];
  getHiredGuides: GetHired[];
  careerCount: number;
  interviewCount: number;
  conceptCount: number;
}) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  // Close any open dropdown on an outside click, and on Escape. Checks
  // both the desktop nav and the mobile panel refs — otherwise a click
  // inside the mobile panel (which sits outside navRef) would close the
  // very dropdown it just opened, since both state updates land in the
  // same batched tick.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      const insideDesktop = navRef.current?.contains(target);
      const insideMobile = mobileNavRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setOpenMenu(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (menu: MenuKey) => setOpenMenu((current) => (current === menu ? null : menu));

  // Single-page sections that don't need their own dropdown. Order after
  // Lessons: Phases, Software, Career Quiz, then the Get Hired dropdown,
  // then the Interview Prep dropdown, then Get Qualified last.
  const midLinks = [
    { href: "/phases", label: "Phases" },
    { href: "/software", label: "Software" },
    { href: "/quizzes/find-your-career", label: "Career Quiz" },
  ];
  const finalLinks = [{ href: "/exams", label: "Get Qualified" }];

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-display text-[1.8rem] font-bold tracking-tight text-ink">
          <HardHatMark size={35} />
          <span>
            hardhat<span className="text-amber">U</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
          <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button
              onClick={() => toggle("careers")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-[0.96rem] font-medium ${
                openMenu === "careers" ? "text-navy" : "text-ink hover:text-navy"
              }`}
              aria-expanded={openMenu === "careers"}
            >
              Careers
              <Caret open={openMenu === "careers"} />
            </button>
            {openMenu === "careers" && (
              <div
                className="absolute left-0 top-full grid min-w-[760px] grid-cols-4 gap-x-6 gap-y-4 border border-hairline bg-paper p-5 shadow-lg"
                onClick={() => setOpenMenu(null)}
              >
                {careerGroups.map((group) => (
                  <div key={group.category}>
                    <Link
                      href={`/careers#${CATEGORY_SLUG[group.category] ?? ""}`}
                      className="break-words text-[0.68rem] font-semibold uppercase tracking-wide text-clay hover:text-navy"
                    >
                      {group.category}
                    </Link>
                    <ul className="mt-2 flex flex-col divide-y divide-hairline/70">
                      {group.items.slice(0, 3).map((item) => (
                        <li key={item.id} className="py-1.5 first:pt-0 last:pb-0">
                          <Link
                            href={urlFor(item)}
                            className="line-clamp-3 break-words text-sm leading-snug text-ink hover:text-navy hover:underline"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-full border-t border-hairline pt-3 text-sm">
                  <Link href="/careers" className="font-semibold text-navy hover:underline">
                    Browse all {careerCount} careers across {careerGroups.length} categories →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button
              onClick={() => toggle("concepts")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-[0.96rem] font-medium ${
                openMenu === "concepts" ? "text-navy" : "text-ink hover:text-navy"
              }`}
              aria-expanded={openMenu === "concepts"}
            >
              Concepts
              <Caret open={openMenu === "concepts"} />
            </button>
            {openMenu === "concepts" && (
              <div
                className="absolute left-0 top-full grid min-w-[680px] grid-cols-3 gap-x-6 gap-y-4 border border-hairline bg-paper p-5 shadow-lg"
                onClick={() => setOpenMenu(null)}
              >
                {conceptGroups.map((group) => (
                  <div key={group.category}>
                    <Link
                      href={`/concepts#${slugifyCategory(group.category)}`}
                      className="break-words text-[0.68rem] font-semibold uppercase tracking-wide text-clay hover:text-navy"
                    >
                      {group.category}
                    </Link>
                    <ul className="mt-2 flex flex-col divide-y divide-hairline/70">
                      {group.items.slice(0, 3).map((item) => (
                        <li key={item.id} className="py-1.5 first:pt-0 last:pb-0">
                          <Link
                            href={urlFor(item)}
                            className="line-clamp-2 break-words text-sm leading-snug text-ink hover:text-navy hover:underline"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-full border-t border-hairline pt-3 text-sm">
                  <Link href="/concepts" className="font-semibold text-navy hover:underline">
                    Search all {conceptCount} concepts →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/lessons" className="px-3 py-2 text-[0.96rem] font-medium text-ink hover:text-navy">
            Lessons
          </Link>

          {midLinks.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2 text-[0.96rem] font-medium text-ink hover:text-navy">
              {link.label}
            </Link>
          ))}

          <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button
              onClick={() => toggle("gethired")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-[0.96rem] font-medium ${
                openMenu === "gethired" ? "text-navy" : "text-ink hover:text-navy"
              }`}
              aria-expanded={openMenu === "gethired"}
            >
              Get Hired
              <Caret open={openMenu === "gethired"} />
            </button>
            {openMenu === "gethired" && (
              <div
                className="absolute left-0 top-full grid min-w-[360px] grid-cols-2 gap-x-6 gap-y-2.5 border border-hairline bg-paper p-5 shadow-lg"
                onClick={() => setOpenMenu(null)}
              >
                {getHiredGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={urlFor(guide)}
                    className="break-words text-sm leading-snug text-ink hover:text-navy hover:underline"
                  >
                    {guide.category}
                  </Link>
                ))}
                <div className="col-span-full border-t border-hairline pt-3 text-sm">
                  <Link href="/get-hired" className="font-semibold text-navy hover:underline">
                    How hiring actually works, by category →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button
              onClick={() => toggle("interviews")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-[0.96rem] font-medium ${
                openMenu === "interviews" ? "text-navy" : "text-ink hover:text-navy"
              }`}
              aria-expanded={openMenu === "interviews"}
            >
              Interview Prep
              <Caret open={openMenu === "interviews"} />
            </button>
            {openMenu === "interviews" && (
              <div
                className="absolute right-0 top-full grid min-w-[520px] grid-cols-2 gap-x-6 gap-y-4 border border-hairline bg-paper p-5 shadow-lg"
                onClick={() => setOpenMenu(null)}
              >
                {interviewGroups.map((group) => (
                  <div key={group.category}>
                    <p className="break-words text-[0.68rem] font-semibold uppercase tracking-wide text-clay">
                      {group.category}
                    </p>
                    <ul className="mt-2 flex flex-col divide-y divide-hairline/70">
                      {group.items.map((item) => (
                        <li key={item.id} className="py-1.5 first:pt-0 last:pb-0">
                          <Link
                            href={urlFor(item)}
                            className="line-clamp-2 break-words text-sm leading-snug text-ink hover:text-navy hover:underline"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-full border-t border-hairline pt-3 text-sm">
                  <Link href="/interviews" className="font-semibold text-navy hover:underline">
                    All {interviewCount} interview guides →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {finalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2 text-[0.96rem] font-medium text-ink hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center gap-2 border border-ink px-3 py-1.5 text-[0.96rem] font-medium text-ink md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile panel — plain vertical list, dropdowns expand in normal
          flow (not absolutely positioned) so nothing overlaps. */}
      {mobileOpen && (
        <nav
          ref={mobileNavRef}
          className="max-h-[calc(100vh-56px)] overflow-y-auto border-t border-hairline bg-paper px-6 pb-4 md:hidden"
        >
          <MobileSection
            label="Careers"
            open={openMenu === "careers"}
            onToggle={() => toggle("careers")}
          >
            {careerGroups.map((group) => (
              <div key={group.category} className="mt-3 first:mt-0">
                <Link
                  href={`/careers#${CATEGORY_SLUG[group.category] ?? ""}`}
                  className="break-words text-[0.68rem] font-semibold uppercase tracking-wide text-clay"
                  onClick={() => setMobileOpen(false)}
                >
                  {group.category}
                </Link>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {group.items.slice(0, 3).map((item) => (
                    <li key={item.id}>
                      <Link href={urlFor(item)} className="break-words text-sm text-ink" onClick={() => setMobileOpen(false)}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/careers"
              className="mt-3 block text-sm font-semibold text-navy"
              onClick={() => setMobileOpen(false)}
            >
              Browse all {careerCount} careers →
            </Link>
          </MobileSection>

          <MobileSection
            label="Concepts"
            open={openMenu === "concepts"}
            onToggle={() => toggle("concepts")}
          >
            {conceptGroups.map((group) => (
              <div key={group.category} className="mt-3 first:mt-0">
                <Link
                  href={`/concepts#${slugifyCategory(group.category)}`}
                  className="break-words text-[0.68rem] font-semibold uppercase tracking-wide text-clay"
                  onClick={() => setMobileOpen(false)}
                >
                  {group.category}
                </Link>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {group.items.slice(0, 3).map((item) => (
                    <li key={item.id}>
                      <Link href={urlFor(item)} className="break-words text-sm text-ink" onClick={() => setMobileOpen(false)}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/concepts"
              className="mt-3 block text-sm font-semibold text-navy"
              onClick={() => setMobileOpen(false)}
            >
              Search all {conceptCount} concepts →
            </Link>
          </MobileSection>

          <Link
            href="/lessons"
            className="block border-t border-hairline py-3 text-[0.96rem] font-medium text-ink"
            onClick={() => setMobileOpen(false)}
          >
            Lessons
          </Link>

          {midLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-t border-hairline py-3 text-[0.96rem] font-medium text-ink"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <MobileSection
            label="Get Hired"
            open={openMenu === "gethired"}
            onToggle={() => toggle("gethired")}
          >
            <ul className="mt-1.5 flex flex-col gap-1.5">
              {getHiredGuides.map((guide) => (
                <li key={guide.id}>
                  <Link href={urlFor(guide)} className="break-words text-sm text-ink" onClick={() => setMobileOpen(false)}>
                    {guide.category}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/get-hired"
              className="mt-3 block text-sm font-semibold text-navy"
              onClick={() => setMobileOpen(false)}
            >
              How hiring actually works, by category →
            </Link>
          </MobileSection>

          <MobileSection
            label="Interview Prep"
            open={openMenu === "interviews"}
            onToggle={() => toggle("interviews")}
          >
            {interviewGroups.map((group) => (
              <div key={group.category} className="mt-3 first:mt-0">
                <p className="break-words text-[0.68rem] font-semibold uppercase tracking-wide text-clay">
                  {group.category}
                </p>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <Link href={urlFor(item)} className="break-words text-sm text-ink" onClick={() => setMobileOpen(false)}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/interviews"
              className="mt-3 block text-sm font-semibold text-navy"
              onClick={() => setMobileOpen(false)}
            >
              All {interviewCount} interview guides →
            </Link>
          </MobileSection>

          {finalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-t border-hairline py-3 text-[0.96rem] font-medium text-ink"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 4.5l3.5 3 3.5-3" />
    </svg>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-hairline">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-[0.96rem] font-medium text-ink"
        aria-expanded={open}
      >
        {label}
        <Caret open={open} />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

export { CATEGORY_SLUG };
