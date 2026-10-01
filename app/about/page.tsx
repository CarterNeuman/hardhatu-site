import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why HardHatU exists and who it's built for.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold text-ink">About HardHatU</h1>
      <p className="mt-4 text-lg leading-relaxed text-steel">
        HardHatU exists to help people new to construction see the whole industry clearly,
        the careers, the terminology, the process, and the path to actually getting hired,
        before they have to learn it the hard way on a jobsite or in an interview.
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Why this exists</h2>
          <p className="mt-3">
            Construction offers real, well-paying careers that don't require a four-year
            degree, but the industry is hard to see from the outside. A high schooler
            weighing options, or an adult considering a career change, rarely gets a clear
            picture of what the jobs actually involve, what they pay, what credentials
            matter, or how a project even comes together. HardHatU is an attempt to close
            that gap with a single, free, honest reference.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">How to use it</h2>
          <p className="mt-3">
            The site is built Wikipedia-style: every career, concept, lesson, and exam guide
            links to the others, so you can start anywhere and follow what's actually
            connected. Read a career page and click into the terms it mentions. Read a
            concept and see which careers deal with it every day. Work through a lesson and
            watch a real jobsite scenario tie several of those pieces together.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Where it's headed</h2>
          <p className="mt-3">
            HardHatU is an independent, still-growing project. Careers and concepts are, and
            will always stay, completely free. Over time the site will add more content
            (lessons, interview and certification prep, real jobsite photography) and eventually
            some optional accounts for the deeper study material, but the core reference
            library isn't going behind a paywall.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Spot something wrong?</h2>
          <p className="mt-3">
            Licensing rules, certifications, and industry practices change, and this site
            covers a lot of ground. If something looks outdated or incorrect, reach out on
            the <a href="/contact" className="text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay">Contact page</a>, corrections make the whole site better for the next
            person who reads it.
          </p>
        </section>
      </div>
    </div>
  );
}
