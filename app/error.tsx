"use client";

import Link from "next/link";
import { useEffect } from "react";

// Catches an unexpected error while rendering a page, so a visitor sees a
// plain, on-brand message with a retry instead of Next's default error
// screen. Renders inside the root layout, so the header and footer stay.
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-clay">Something went wrong</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">This page didn&apos;t load</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-steel">
        That&apos;s on us, not you. Try again, and if it keeps happening, let us know at{" "}
        <a href="mailto:contact@breakgroundu.com" className="font-semibold text-navy hover:underline">
          contact@breakgroundu.com
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="border border-navy bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-navy/90"
        >
          Try again
        </button>
        <Link href="/" className="text-sm font-semibold text-navy hover:underline">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
