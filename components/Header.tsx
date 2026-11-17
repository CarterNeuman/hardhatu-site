"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Icon, type IconKind } from "@/components/Icon";
import { urlFor, CATEGORY_SLUG } from "@/lib/content-client";
import type { Career, Concept, GetHired } from "@/lib/types";

// The "Solid Mark, Tile Badge" logo: a rounded navy tile holding a
// shovel breaking a cracked ground line, amber handle, amber knob where
// it meets the blade. Colors are fixed rather than currentColor since
// the mark is its own self-contained badge, unlike the old thin-stroke icon.
// (Component name kept as HardHatMark to avoid touching its import sites;
// it no longer draws a hard hat.)
export function HardHatMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <rect x="2" y="2" width="196" height="196" rx="28" fill="#1F3F52" />
      <polygon points="20,130 82,130 70,137 86,144 20,144" fill="#EFEDE6" />
      <polygon points="180,130 118,130 130,137 114,144 180,144" fill="#EFEDE6" />
      <g transform="translate(-6,-6)">
        <g transform="translate(100,100) scale(0.95) rotate(-25) translate(-100,-100)">
          <line x1="100" y1="35" x2="100" y2="118" stroke="#B67F1E" strokeWidth={10} strokeLinecap="round" />
          <path d="M78,105 L122,105 L114,142 A6,6 0 0 1 108,148 L92,148 A6,6 0 0 1 86,142 Z" fill="#EFEDE6" />
          <line x1="100" y1="112" x2="100" y2="140" stroke="#1F3F52" strokeWidth={2} />
          <circle cx="100" cy="100" r="7" fill="#B67F1E" />
        </g>
      </g>
    </svg>
  );
}

// Header is a client component rendered by the root layout, so whatever
// it's handed is serialized into EVERY page on the site. app/layout.tsx
// slims everything down before passing it in.
export type NavCareer = Pick<Career, "id" | "type" | "slug" | "title">;
export type NavConcept = Pick<Concept, "id" | "type" | "slug" | "title">;
export type NavGuide = Pick<GetHired, "id" | "type" | "slug" | "category">;
export type NavStateGuide = { slug: string; name: string };
type CareerGroup = { category: string; items: NavCareer[] };

// Site structure "Option A" (header brainstorm, 2026-11-13): the five
// pages that matter most sit in the bar as plain, always-visible links
// ("Start here"), and everything else lives in one Explore panel that
// shows every page at once in four columns. Nothing is two levels deep.
// On phones and tablets the same five become a fixed bottom tab bar (see
// MobileTabBar) and the Menu button opens the Explore list.
// URLs never changed in this redesign, only where links sit.
const START_HERE: { href: string; label: string; tab: string; icon: IconKind; match: string[] }[] = [
  { href: "/quizzes/find-your-career", label: "Career Quiz", tab: "Career Quiz", icon: "quiz", match: ["/quizzes"] },
  { href: "/lessons", label: "Lessons", tab: "Lessons", icon: "lesson", match: ["/lessons"] },
  { href: "/action-plan", label: "Action Plan", tab: "Action Plan", icon: "actionplan", match: ["/action-plan"] },
  { href: "/programs", label: "Find a Program", tab: "Programs", icon: "program", match: ["/programs"] },
  { href: "/student-loan-roi", label: "College vs. Trades", tab: "College vs Trades", icon: "roi", match: ["/student-loan-roi"] },
];

const isActive = (pathname: string, match: string[]) => match.some((m) => pathname === m || pathname.startsWith(`${m}/`));

export function Header({
  careerGroups,
  getHiredGuides,
  stateGuides,
  careerCount,
  conceptCount,
}: {
  careerGroups: CareerGroup[];
  getHiredGuides: NavGuide[];
  stateGuides: NavStateGuide[];
  careerCount: number;
  conceptCount: number;
}) {
  const pathname = usePathname() ?? "/";
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  // Close the Explore panel on an outside click or Escape, and close
  // everything when the page changes.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!exploreRef.current?.contains(e.target as Node)) setExploreOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setExploreOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  useEffect(() => {
    setExploreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const generalGuide = getHiredGuides.find((g) => g.id === "gethired-general");
  const columns = buildColumns({ careerGroups, careerCount, conceptCount, generalGuide, stateGuides });

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 xl:gap-4 xl:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 font-display text-[1.7rem] font-bold tracking-tight text-ink lg:text-[1.45rem] xl:text-[1.7rem]">
            <HardHatMark size={32} />
            <span>
              breakground<span className="text-amber">U</span>
            </span>
          </Link>

          {/* Desktop: the Start-here row, then Explore. */}
          <nav aria-label="Main" className="hidden flex-1 items-center justify-end gap-0.5 lg:flex">
            <span className="mr-2 hidden text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-steel xl:inline">Start here</span>
            {START_HERE.map((item) => {
              const active = isActive(pathname, item.match);
              const plan = item.href === "/action-plan";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    plan
                      ? `mx-1 whitespace-nowrap border px-2.5 py-1.5 text-[0.9rem] xl:px-3 font-semibold transition-colors ${
                          active ? "border-clay bg-clay text-paper" : "border-amber bg-amber text-paper hover:border-clay hover:bg-clay"
                        }`
                      : `whitespace-nowrap border-b-2 px-2 py-1.5 text-[0.92rem] xl:px-2.5 xl:text-[0.95rem] font-semibold transition-colors ${
                          active ? "border-amber text-navy" : "border-transparent text-ink hover:text-navy"
                        }`
                  }
                >
                  {item.label}
                </Link>
              );
            })}

            <div ref={exploreRef} className="relative ml-1">
              <button
                type="button"
                onClick={() => setExploreOpen((v) => !v)}
                aria-expanded={exploreOpen}
                aria-controls="explore-panel"
                className={`inline-flex items-center gap-1.5 whitespace-nowrap border px-3 py-1.5 text-[0.95rem] font-semibold transition-colors ${
                  exploreOpen ? "border-navy bg-navy text-paper" : "border-ink/70 text-ink hover:border-navy hover:text-navy"
                }`}
              >
                Explore
                <Caret open={exploreOpen} />
              </button>
              {exploreOpen && (
                <div
                  id="explore-panel"
                  className="absolute right-0 top-full z-50 mt-2 w-[min(980px,calc(100vw-3rem))] border border-hairline bg-paper p-6 shadow-xl"
                >
                  <div className="grid grid-cols-4 gap-8">
                    {columns.map((col) => (
                      <ExploreColumn key={col.title} col={col} onNavigate={() => setExploreOpen(false)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Account, desktop only. Browsing never requires it; it only
              saves progress on Lessons and the Action Plan. */}
          <div className="hidden shrink-0 items-center lg:flex">
            <Show when="signed-out">
              <SignInButton>
                <button className="whitespace-nowrap px-2 py-2 text-[0.92rem] font-semibold text-ink hover:text-navy">Sign In</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link label="My Progress" labelIcon={<Icon kind="actionplan" size={16} />} href="/my-progress" />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
          </div>

          {/* Phones and tablets: Menu opens the Explore list. The five
              Start-here pages are in the bottom tab bar instead. */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center gap-2 border border-ink px-3 py-1.5 text-[0.96rem] font-medium text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-explore"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-explore"
            aria-label="Explore"
            className="max-h-[calc(100vh-60px-64px)] overflow-y-auto border-t border-hairline bg-paper px-6 pb-6 lg:hidden"
          >
            <div className="mt-4 flex items-center justify-between border border-hairline px-4 py-3">
              <Show when="signed-out">
                <SignInButton>
                  <button className="text-[0.96rem] font-semibold text-ink" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </button>
                </SignInButton>
                <span className="text-xs text-steel">Save your progress</span>
              </Show>
              <Show when="signed-in">
                <Link href="/my-progress" className="text-[0.96rem] font-semibold text-ink" onClick={() => setMobileOpen(false)}>
                  My Progress
                </Link>
                <UserButton />
              </Show>
            </div>
            <div className="mt-5 grid gap-7 sm:grid-cols-2">
              {columns.map((col) => (
                <ExploreColumn key={col.title} col={col} onNavigate={() => setMobileOpen(false)} />
              ))}
            </div>
          </nav>
        )}
      </header>

      <MobileTabBar pathname={pathname} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Explore: every page that isn't in the Start-here row, in four columns.

type ExploreLink = { href: string; label: string; note?: string; signedIn?: boolean };
type ExploreCol = { title: string; icon: IconKind; links: ExploreLink[] };

function buildColumns({
  careerGroups,
  careerCount,
  conceptCount,
  generalGuide,
  stateGuides,
}: {
  careerGroups: CareerGroup[];
  careerCount: number;
  conceptCount: number;
  generalGuide?: NavGuide;
  stateGuides: NavStateGuide[];
}): ExploreCol[] {
  return [
    {
      title: "Explore careers",
      icon: "career",
      links: [
        ...careerGroups.map((g) => ({ href: `/careers#${CATEGORY_SLUG[g.category] ?? ""}`, label: g.category })),
        { href: "/careers", label: `All ${careerCount} careers` },
        { href: "/concepts", label: "Concepts", note: `${conceptCount} construction terms, explained` },
        { href: "/phases", label: "Phases", note: "How a building goes up, start to finish" },
      ],
    },
    {
      title: "Get hired",
      icon: "gethired",
      links: [
        ...(generalGuide ? [{ href: urlFor(generalGuide), label: "How hiring works", note: "Start here if you're job hunting" }] : []),
        { href: "/get-hired", label: "Hiring guides by career path" },
        { href: "/resumes", label: "Resume Guide" },
        { href: "/interviews", label: "Interview Prep" },
        { href: "/exams", label: "Get Qualified", note: "Practice exams for real certifications" },
        { href: "/software", label: "Software", note: "The tools you'll use on the job" },
      ],
    },
    {
      title: "By state",
      icon: "state",
      links: [
        ...stateGuides.map((g) => ({ href: `/states/${g.slug}`, label: `${g.name} field guide`, note: "Local pay, licensing and ways in" })),
        { href: "/states", label: "All state guides", note: "More states on the way" },
        { href: "/student-loan-roi", label: "Trade pay in every state", note: "Part of College vs. Trades" },
      ],
    },
    {
      title: "For you",
      icon: "actionplan",
      links: [
        { href: "/my-progress", label: "My Progress", signedIn: true },
        { href: "/action-plan/my-plans", label: "Your saved plans", signedIn: true },
        { href: "/counselors", label: "For counselors & teachers", note: "Classroom-ready tools" },
        { href: "/resources", label: "All resources", note: "Everything on one board" },
        { href: "/about", label: "About BreakGroundU" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ];
}

function ExploreColumn({ col, onNavigate }: { col: ExploreCol; onNavigate: () => void }) {
  const link = (l: ExploreLink) => (
    <li key={l.href}>
      <Link href={l.href} onClick={onNavigate} className="group block py-1">
        <span className="text-sm font-semibold leading-snug text-ink group-hover:text-navy group-hover:underline">{l.label}</span>
        {l.note && <span className="block text-xs leading-snug text-steel">{l.note}</span>}
      </Link>
    </li>
  );
  return (
    <div>
      <p className="flex items-center gap-2 border-b border-hairline pb-2 text-[0.68rem] font-semibold uppercase tracking-wide text-clay">
        <Icon kind={col.icon} size={15} />
        {col.title}
      </p>
      <ul className="mt-2 flex flex-col">
        {col.links.filter((l) => !l.signedIn).map(link)}
        <Show when="signed-in">{col.links.filter((l) => l.signedIn).map(link)}</Show>
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phones and tablets: the five Start-here pages, fixed to the bottom of
// the screen like an app's tab bar. app/layout.tsx adds a matching spacer
// at the end of the page so the footer never hides behind it. Hidden when
// printing.

function MobileTabBar({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Start here"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {START_HERE.map((item) => {
          const active = isActive(pathname, item.match);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={`flex h-20 flex-col items-center justify-center gap-0.5 border-t-2 px-1 text-center leading-[1.05] text-[0.6rem] font-semibold ${
                  active ? "border-amber text-navy" : "border-transparent text-steel hover:text-ink"
                }`}
              >
                <Icon kind={item.icon} size={20} />
                <span>{item.tab}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
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

// Re-exported for the other CLIENT components that already import it
// from here. Server files must import it from "@/lib/content-client"
// instead -- see the note on CATEGORY_SLUG there.
export { CATEGORY_SLUG };
