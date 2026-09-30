import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { ResumeGuide } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Prose } from "@/components/Prose";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { resumes } = getAllContent();
  return resumes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resume = getBySlug("resume", slug) as ResumeGuide | undefined;
  if (!resume) return {};
  const description = resume.metaDescription || resume.tagline;
  return {
    title: resume.title,
    description,
    openGraph: { title: resume.title, description },
  };
}

export default async function ResumeGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resume = getBySlug("resume", slug) as ResumeGuide | undefined;
  if (!resume) notFound();
  const related = getRelated(resume);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="resume" tier={resume.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{resume.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink">{resume.tagline}</p>

      <EmailGate source={`resume:${resume.slug}`}>
      {resume.body && (
        <div className="mt-4">
          <Prose text={resume.body} />
        </div>
      )}

      {resume.sections.map((section, i) => (
        <div key={i}>
          <SectionLabel>{section.heading}</SectionLabel>
          <div className="mt-2">
            <Prose text={section.content} />
          </div>
        </div>
      ))}

      {resume.exampleBullets.length > 0 && (
        <>
          <SectionLabel>Bullets worth adapting</SectionLabel>
          <ul className="mt-2 flex flex-col gap-2">
            {resume.exampleBullets.map((bullet, i) => (
              <li
                key={i}
                className="border-l-2 border-hairline pl-4 text-sm leading-relaxed text-ink"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </>
      )}

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
