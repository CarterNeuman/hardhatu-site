import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent, urlFor } from "@/lib/content";
import { FOUNDATION_COURSE, GA_PATHWAYS, type CounselorPathway } from "@/lib/counselor-pathways";
import { STATE_GUIDES } from "@/lib/state-guides";
import { PrintButton } from "@/components/PrintButton";
import { SchoolLinkMaker } from "@/components/SchoolLinkMaker";

export const metadata: Metadata = {
  title: "For Counselors and Teachers",
  description:
    "A free, ad-free construction careers resource for school counselors and CTAE teachers: a Georgia pathway map, a ready-to-run 45-minute class session, and printable handouts.",
};

type Ref = { href: string; label: string };

// Resolve a pathway's slugs to real pages. Anything that no longer exists is
// dropped, so the map never shows a dead link.
function resolve(p: CounselorPathway) {
  const { all } = getAllContent();
  const find = (type: string, slug: string) => all.find((n) => n.type === type && n.slug === slug);
  const georgia = STATE_GUIDES.find((g) => g.slug === "georgia");
  const guideSlugs = new Set(georgia?.trades.map((t) => t.slug) ?? []);

  const careers: Ref[] = p.careers.flatMap((s) => {
    const n = find("career", s);
    return n ? [{ href: urlFor(n), label: n.title }] : [];
  });
  const guide: Ref[] = georgia
    ? p.guideTrades.flatMap((s) => {
        const t = georgia.trades.find((x) => x.slug === s);
        return t && guideSlugs.has(s) ? [{ href: `/states/georgia#${s}`, label: t.name }] : [];
      })
    : [];
  const lessons: Ref[] = p.lessons.flatMap((s) => {
    const n = find("lesson", s);
    return n ? [{ href: urlFor(n), label: n.title }] : [];
  });
  return { careers, guide, lessons, extras: p.extras ?? [] };
}

function LinkList({ items }: { items: Ref[] }) {
  if (items.length === 0) return <span className="text-steel">-</span>;
  return (
    <ul className="space-y-1">
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} className="font-semibold text-navy hover:underline">
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Design careers aren't licensed trades, so the Georgia guide doesn't cover
// them; say so and point to the closest tool instead.
function GuideCell({ guide, extras }: { guide: Ref[]; extras: Ref[] }) {
  if (guide.length) return <LinkList items={guide} />;
  return (
    <div>
      <p className="text-xs leading-snug text-steel">Not covered in the trades guide. Try the</p>
      <LinkList items={extras} />
    </div>
  );
}

const SESSION: { time: string; title: string; body: string; href: string; link: string }[] = [
  {
    time: "0-5 min",
    title: "Open with the money question",
    body: "Put the College vs. Trades page on the board and compare the cost of a four-year degree with what a trade pays over the same years. Ask: what surprised you?",
    href: "/student-loan-roi",
    link: "College vs. Trades",
  },
  {
    time: "5-15 min",
    title: "Everyone takes the career quiz",
    body: "Students take the career quiz on their own device. It takes a few minutes and ends with their top career matches.",
    href: "/quizzes/find-your-career",
    link: "Career quiz",
  },
  {
    time: "15-30 min",
    title: "Look up the top match in Georgia",
    body: "Students open their top match in the Georgia field guide and find three things: starting pay, what the work is really like, and one way in (school, apprenticeship or straight to work).",
    href: "/states/georgia",
    link: "Georgia field guide",
  },
  {
    time: "30-40 min",
    title: "Find a real next step",
    body: "Students search the program directory for training that leads to their match, or build a step-by-step action plan.",
    href: "/programs",
    link: "Find a Program",
  },
  {
    time: "40-45 min",
    title: "Exit ticket",
    body: "On paper: my top career, what it pays to start in Georgia, one way in, and one thing I will do this month. Collect them, they make a great follow-up list.",
    href: "/counselors/parent-handout",
    link: "Send the parent handout home",
  },
];

export default function CounselorsPage() {
  const foundation = resolve(FOUNDATION_COURSE);
  const pathways = GA_PATHWAYS.map((p) => ({ p, r: resolve(p) }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="h-px w-5 bg-amber" />
        Resources · For counselors and teachers
      </p>
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">A construction careers resource you can hand to any student</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-steel">
        You have hundreds of students and not enough hours to learn 25 trades. We did that part. Everything here is free, researched
        from official sources, and ready to use in your office or your classroom tomorrow.
      </p>

      {/* Start here */}
      <section aria-labelledby="start-here" className="mt-8 rounded-lg border-2 border-ink bg-white p-6 sm:p-8">
        <h2 id="start-here" className="font-display text-2xl font-bold text-ink">
          Start here
        </h2>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2">
          <li>
            <p className="font-semibold text-ink">Free, with no ads</p>
            <p className="mt-1 text-sm leading-relaxed text-steel">
              Students will not see ads or sponsored career pages. The careers are described as they are, hard parts included.
            </p>
          </li>
          <li>
            <p className="font-semibold text-ink">Sourced and dated</p>
            <p className="mt-1 text-sm leading-relaxed text-steel">
              Pay comes from U.S. Bureau of Labor Statistics data. Licensing and training details come from the state&rsquo;s own agencies
              and schools, with the date we checked them.
            </p>
          </li>
          <li>
            <p className="font-semibold text-ink">Built for the student who isn&rsquo;t sure college is the path</p>
            <p className="mt-1 text-sm leading-relaxed text-steel">
              100+ construction careers, from the trades to estimating, design and project management, so students who do want
              college see where it leads in construction too.
            </p>
          </li>
          <li>
            <p className="font-semibold text-ink">Student privacy</p>
            <p className="mt-1 text-sm leading-relaxed text-steel">
              We never sell personal information. We only look at usage in totals, never individual students. Details are in our{" "}
              <Link href="/privacy" className="font-semibold text-navy hover:underline">
                privacy policy
              </Link>
              .
            </p>
          </li>
        </ul>
      </section>

      {/* Three ways */}
      <section aria-labelledby="ways" className="mt-10">
        <h2 id="ways" className="font-display text-2xl font-bold text-ink">
          Three ways to use it
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "In a one-on-one", d: "Look up the student's CTAE pathway below and send them the matching career and Georgia guide pages.", href: "#pathways", l: "Pathway map" },
            { n: "2", t: "With a whole class", d: "Run the 45-minute session. Students leave with a career match, Georgia pay and a next step.", href: "#session", l: "Class session" },
            { n: "3", t: "On the wall or the fridge", d: "Print the career-center poster and the parent handout.", href: "#printables", l: "Printables" },
          ].map((w) => (
            <li key={w.n} className="rounded-lg border border-hairline bg-white p-5">
              <span className="font-display text-3xl font-bold text-amber">{w.n}</span>
              <p className="mt-1 font-semibold text-ink">{w.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-steel">{w.d}</p>
              <a href={w.href} className="mt-3 inline-block text-sm font-semibold text-navy hover:underline">
                {w.l} &darr;
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Pathway map */}
      <section id="pathways" aria-labelledby="pathways-h" className="mt-12 scroll-mt-24">
        <h2 id="pathways-h" className="font-display text-2xl font-bold text-ink">
          Georgia CTAE pathway map
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-steel">
          Student in Electrical I? Find their pathway and send them the pages beside it. These are the 11 pathways in Georgia&rsquo;s
          Architecture and Construction career cluster.
        </p>

        <div className="mt-5 rounded-lg border border-hairline bg-[#FBF7EE] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-clay">Every construction pathway starts here</p>
          <p className="mt-1 font-display text-xl font-bold text-ink">{FOUNDATION_COURSE.name}</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[...foundation.lessons, ...foundation.extras].map((i) => (
              <Link key={i.href} href={i.href} className="font-semibold text-navy hover:underline">
                {i.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Phones: one card per pathway instead of a table that scrolls sideways. */}
        <ul className="mt-5 space-y-3 md:hidden">
          {pathways.map(({ p, r }) => (
            <li key={p.name} className="rounded-lg border border-hairline bg-white p-4 text-sm">
              <p className="font-display text-lg font-bold text-ink">{p.name}</p>
              {p.note && <p className="mt-0.5 text-xs leading-snug text-steel">{p.note}</p>}
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-clay">Careers</dt>
                  <dd className="mt-1"><LinkList items={r.careers} /></dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-clay">Georgia guide</dt>
                  <dd className="mt-1"><GuideCell guide={r.guide} extras={r.extras} /></dd>
                </div>
                {r.lessons.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-clay">Start with this lesson</dt>
                    <dd className="mt-1"><LinkList items={r.lessons} /></dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-5 hidden overflow-x-auto rounded-lg border border-hairline bg-white md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-ink text-paper">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Pathway</th>
                <th scope="col" className="px-4 py-3 font-semibold">Careers</th>
                <th scope="col" className="px-4 py-3 font-semibold">Georgia guide</th>
                <th scope="col" className="px-4 py-3 font-semibold">Start with this lesson</th>
              </tr>
            </thead>
            <tbody>
              {pathways.map(({ p, r }) => (
                <tr key={p.name} className="border-t border-hairline align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">
                    {p.name}
                    {p.note && <span className="mt-1 block text-xs font-normal leading-snug text-steel">{p.note}</span>}
                  </th>
                  <td className="px-4 py-3">
                    <LinkList items={r.careers} />
                  </td>
                  <td className="px-4 py-3">
                    <GuideCell guide={r.guide} extras={r.extras} />
                  </td>
                  <td className="px-4 py-3">
                    <LinkList items={r.lessons} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-steel">
          Pathway names from Georgia&rsquo;s Architecture and Construction career cluster (GaDOE CTAE, listed on GAfutures).
        </p>
      </section>

      {/* Class session */}
      <section id="session" aria-labelledby="session-h" className="mt-12 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="session-h" className="font-display text-2xl font-bold text-ink">
              A 45-minute class session
            </h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-steel">
              No prep needed. Works for an advisement period, a CTAE class or a career day. Students need a phone or laptop.
            </p>
          </div>
          <div className="print:hidden">
            <PrintButton label="Print this page" />
          </div>
        </div>
        <ol className="mt-5 space-y-3">
          {SESSION.map((s) => (
            <li key={s.time} className="grid gap-2 rounded-lg border border-hairline bg-white p-5 sm:grid-cols-[110px_1fr]">
              <span className="font-mono text-sm font-semibold text-clay">{s.time}</span>
              <div>
                <p className="font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-steel">{s.body}</p>
                <Link href={s.href} className="mt-2 inline-block text-sm font-semibold text-navy hover:underline">
                  {s.link} &rarr;
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Printables */}
      <section id="printables" aria-labelledby="printables-h" className="mt-12 scroll-mt-24">
        <h2 id="printables-h" className="font-display text-2xl font-bold text-ink">
          Printables
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/counselors/poster", t: "Career-center poster", d: "One page for your wall or door, pointing students to the career quiz." },
            { href: "/counselors/parent-handout", t: "Parent handout", d: "A plain-language page for families wondering whether the trades are a real option." },
            { href: "/states/georgia", t: "Georgia field guide", d: "Pay, licensing and ways in for 25 trades. Print the whole guide or copy a single trade." },
            { href: "/student-loan-roi", t: "College vs. Trades", d: "Side-by-side cost and pay comparison for 21 trades in all 50 states." },
          ].map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="group block h-full rounded-lg border border-hairline bg-white p-5 hover:border-navy">
                <p className="font-semibold text-ink group-hover:text-navy group-hover:underline">{p.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-steel">{p.d}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* School link */}
      <section id="school-link" aria-labelledby="school-link-h" className="mt-12 scroll-mt-24 print:hidden">
        <h2 id="school-link-h" className="font-display text-2xl font-bold text-ink">
          Get your school&rsquo;s own link
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-steel">
          Share this link instead of the plain address and visits from your school are counted separately. Email us any time and we
          will tell you how many students it brought in. We only ever see totals, never who the students are.
        </p>
        <SchoolLinkMaker />
      </section>

      {/* Contact */}
      <section className="mt-12 rounded-lg bg-ink p-6 text-paper sm:p-8">
        <h2 className="font-display text-2xl font-bold">Tell us what would help</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-paper/85">
          This page is built for counselors and teachers, and we would like to hear what is missing: another state, a different
          handout, a pathway we should cover better.
        </p>
        <a href="mailto:contact@breakgroundu.com" className="mt-4 inline-block rounded-sm bg-[#F2C200] px-4 py-2 text-sm font-bold text-ink hover:brightness-95">
          contact@breakgroundu.com
        </a>
      </section>
    </div>
  );
}
