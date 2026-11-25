import type { Metadata } from "next";
import Link from "next/link";

// Shown for any URL that doesn't match a page (a mistyped address, an old
// link, a removed career). Renders inside the root layout, so the header,
// footer and bottom tab bar stay in place and the visitor always has a way
// back. Next.js still sends a real 404 status with it.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const PLACES = [
  { href: "/careers", label: "Browse careers", note: "Every role, what it pays, how to get in" },
  { href: "/quizzes", label: "Take the career quiz", note: "Five questions to narrow it down" },
  { href: "/concepts", label: "Look up a term", note: "Plain definitions for jobsite language" },
  { href: "/lessons", label: "Start a lesson", note: "Short reads on how construction works" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">This page isn&apos;t on the site</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-steel">
        The link may be old or mistyped, or the page may have moved. Here are a few good places to
        pick back up.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PLACES.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="block h-full border border-hairline bg-white/50 px-4 py-3 transition-colors hover:border-navy"
            >
              <span className="font-semibold text-navy">{p.label} &rarr;</span>
              <span className="mt-1 block text-sm text-steel">{p.note}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-navy hover:underline">
        &larr; Back to the homepage
      </Link>
    </div>
  );
}
