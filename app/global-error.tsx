"use client";

import "./globals.css";

// Last-resort fallback for an error in the root layout itself (the one
// case app/error.tsx can't catch, since it renders inside that layout).
// Has to supply its own <html> and <body>; deliberately self-contained,
// with no header, auth or data fetching that could fail the same way.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-clay">BreakGroundU</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Something went wrong</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-steel">
            The site hit an unexpected error. Try again, and if it keeps happening, email
            contact@breakgroundu.com.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="border border-navy bg-navy px-4 py-2 text-sm font-semibold text-paper"
            >
              Try again
            </button>
            {/* Plain <a>, not next/link: a full reload is the point here. */}
            <a href="/" className="text-sm font-semibold text-navy hover:underline">
              Back to the homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
