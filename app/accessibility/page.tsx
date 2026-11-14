import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@breakgroundu.com";
const LAST_UPDATED = "November 14, 2026";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "BreakGroundU's commitment to an accessible site, the standard we work to, and how to report a problem.",
};

const linkClass =
  "text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay";

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold text-ink">Accessibility</h1>
      <p className="mt-3 text-sm text-steel">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Our commitment</h2>
          <p className="mt-3">
            BreakGroundU should work for everyone who wants to learn about construction careers,
            including people who use screen readers, keyboards, magnification or other assistive
            technology. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level
            AA across the site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">What we do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Every page can be used with a keyboard alone, starting with a &ldquo;Skip to main content&rdquo; link.</li>
            <li>Text colors are checked against their backgrounds to meet WCAG contrast ratios.</li>
            <li>Photos carry text descriptions, and decorative graphics are hidden from screen readers.</li>
            <li>Form fields and buttons have clear, readable labels.</li>
            <li>Animations respect your device&rsquo;s &ldquo;reduce motion&rdquo; setting.</li>
            <li>We review new features for accessibility before they go live.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Known limitations</h2>
          <p className="mt-3">
            Some content comes from other services, such as embedded YouTube videos and the sign-in
            window, and their accessibility depends partly on those providers. If something there
            gets in your way, tell us and we&rsquo;ll help you get the information another way.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Report a problem</h2>
          <p className="mt-3">
            If any part of BreakGroundU is hard to use, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>{" "}
            with the page and what happened. We aim to reply within five business days and will
            work with you to fix it or provide the content in another format.
          </p>
        </section>
      </div>
    </div>
  );
}
