import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { Software } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Disclaimer } from "@/components/Disclaimer";
import { ContentPhoto } from "@/components/ContentPhoto";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { software } = getAllContent();
  return software.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const software = getBySlug("software", slug) as Software | undefined;
  if (!software) return {};
  const description = software.metaDescription || software.whatItIs;
  return {
    title: software.title,
    description,
    openGraph: { title: software.title, description },
  };
}

export default async function SoftwarePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = getBySlug("software", slug) as Software | undefined;
  if (!software) notFound();
  const related = getRelated(software);
  const hasStaleRisk = Boolean(software.pricingModel) || Boolean(software.lastReviewed);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="software" tier={software.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{software.title}</h1>
      <p className="mt-1 text-xs uppercase tracking-wide text-steel">{software.category}</p>
      <p className="mt-3 text-lg leading-relaxed text-ink">{software.whatItIs}</p>

      {software.image && <ContentPhoto src={software.image} alt={software.title} />}

      <EmailGate source={`software:${software.slug}`}>
      <SectionLabel>What it does</SectionLabel>
      <p className="mt-2 leading-relaxed text-ink">{software.whatItDoes}</p>

      {software.keyFeatures.length > 0 && (
        <>
          <SectionLabel>Key features</SectionLabel>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
            {software.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </>
      )}

      {software.commonUses.length > 0 && (
        <>
          <SectionLabel>How it's actually used</SectionLabel>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
            {software.commonUses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
        </>
      )}

      {software.tutorialVideos.length > 0 ? (
        <>
          <SectionLabel>Tutorials</SectionLabel>
          <div className="mt-2 space-y-6">
            {software.tutorialVideos.map((video) => {
              const embedUrl = getYouTubeEmbedUrl(video.url);
              return (
                <div key={video.url}>
                  <p className="mb-2 text-sm font-semibold text-ink">{video.title}</p>
                  {embedUrl ? (
                    <div className="aspect-video w-full overflow-hidden border border-hairline bg-ink/5">
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy hover:underline"
                    >
                      {video.url}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <SectionLabel>Tutorials</SectionLabel>
          <p className="mt-2 text-sm italic text-steel">Tutorial videos for this tool are coming soon.</p>
        </>
      )}

      {(software.pricingModel || software.website) && (
        <>
          <SectionLabel>Good to know</SectionLabel>
          <dl className="mt-2 space-y-1 text-sm text-ink">
            {software.pricingModel && (
              <div>
                <dt className="inline font-semibold">Pricing: </dt>
                <dd className="inline">{software.pricingModel}</dd>
              </div>
            )}
            {software.website && (
              <div>
                <dt className="inline font-semibold">Website: </dt>
                <dd className="inline">
                  <a
                    href={software.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:underline"
                  >
                    {software.website}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </>
      )}

      {hasStaleRisk && <Disclaimer lastReviewed={software.lastReviewed} />}

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
