"use client";

import { useState } from "react";

// The two extra ways in that sit beside Clerk's form on /sign-in and
// /sign-up: a class code and school sign-in. Neither is live yet, so each
// one answers with an honest "coming soon" note instead of doing nothing.
// Nothing typed here is saved or sent anywhere.

const EARLY_ACCESS =
  "mailto:contact@breakgroundu.com?subject=" + encodeURIComponent("Class codes early access");

function UsersIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M18.5 19c0-2.4-1.1-4.1-2.8-4.9" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5 12 5l9 4.5-9 4.5z" />
      <path d="M7 11.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5" />
      <path d="M21 9.5V15" />
    </svg>
  );
}

export function SignInOptions() {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeTried, setCodeTried] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);

  function join(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) {
      setCodeError("Enter your class code first.");
      setCodeTried(false);
      return;
    }
    setCodeError("");
    setCodeTried(true);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Class code */}
      <section aria-labelledby="class-code-title" className="border border-hairline bg-white p-5">
        <h2 id="class-code-title" className="flex items-center gap-2 font-semibold text-ink">
          <span className="text-navy"><UsersIcon /></span>
          Joining with your class?
        </h2>
        <p className="mt-1 text-sm text-steel">Enter the code your teacher gave you.</p>
        <form onSubmit={join} noValidate className="mt-3">
          <label htmlFor="class-code" className="sr-only">
            Class code
          </label>
          <div className="flex gap-2">
            <input
              id="class-code"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={8}
              placeholder="K7M4QX"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                setCodeError("");
                setCodeTried(false);
              }}
              aria-invalid={codeError ? true : undefined}
              aria-describedby="class-code-status"
              className="min-w-0 flex-1 border border-hairline bg-paper px-3 py-2 font-mono text-sm tracking-widest text-ink placeholder:text-steel focus:border-navy focus:outline-none"
            />
            <button
              type="submit"
              className="border border-navy bg-navy px-4 py-2 text-sm font-semibold text-paper hover:bg-ink"
            >
              Join
            </button>
          </div>
          <p id="class-code-status" aria-live="polite" className="mt-2 text-xs leading-relaxed">
            {codeError ? (
              <span className="text-clay">{codeError}</span>
            ) : codeTried ? (
              <span className="text-ink">
                <span className="font-semibold">Class codes open soon.</span> Your code wasn&rsquo;t saved. For now,
                create an account and your teacher can add you to the class later.
              </span>
            ) : (
              <span className="text-amber">
                Class codes are coming soon. Create an account now and your teacher can add you later.
              </span>
            )}
          </p>
        </form>
      </section>

      {/* School sign-in */}
      <section aria-labelledby="school-title" className="border border-hairline bg-white p-5">
        <h2 id="school-title" className="flex items-center gap-2 font-semibold text-ink">
          <span className="text-navy"><SchoolIcon /></span>
          Signing in through your school?
        </h2>
        <p className="mt-1 text-sm text-steel">
          Use your school Google or Microsoft account, or the link your school shared.
        </p>
        <button
          type="button"
          onClick={() => setSchoolOpen((v) => !v)}
          aria-expanded={schoolOpen}
          aria-controls="school-note"
          className="mt-3 border border-ink px-4 py-2 text-sm font-semibold text-ink hover:border-navy hover:text-navy"
        >
          Find my school
        </button>
        {schoolOpen && (
          <p id="school-note" className="mt-3 border-l-2 border-amber bg-amber-soft/40 px-3 py-2 text-xs leading-relaxed text-ink">
            <span className="font-semibold">School sign-in is coming soon.</span> For now, you can create an account
            with any email address, including your school email.
          </p>
        )}
      </section>

      <p className="px-1 text-sm text-steel">
        Teacher or counselor?{" "}
        <a href={EARLY_ACCESS} className="font-semibold text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy">
          Get early access to class codes
        </a>
      </p>
    </div>
  );
}
