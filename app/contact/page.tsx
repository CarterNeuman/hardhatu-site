import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@hardhatu.com";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with HardHatU: questions, corrections, and feedback.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold text-ink">Contact</h1>
      <p className="mt-4 text-lg leading-relaxed text-steel">
        HardHatU is an independent, growing project, so this is a real inbox read by a real
        person, not a support team. Expect a genuine reply, just not necessarily a fast one.
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">What to reach out about</h2>
          <p className="mt-3">
            Corrections to a career, concept, or lesson page. A credential, license, or
            certification requirement that's changed. A broken link or a page that isn't
            rendering right. A career or topic you wish the site covered. General feedback
            on what's useful and what isn't.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Email</h2>
          <p className="mt-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg font-semibold text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
