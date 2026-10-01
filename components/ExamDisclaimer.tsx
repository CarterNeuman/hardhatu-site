// Required on every Get Qualified page. These pages reference real, named
// third-party certifications (OSHA, PMI, NCCER, etc.) by name — legally
// fine on its own (naming a real exam to say you offer unofficial prep for
// it is standard nominative fair use and doesn't need permission), but the
// page must never imply affiliation, endorsement, or sponsorship, and must
// never claim to reproduce the certifying body's actual exam questions.
// This component is the one place that non-affiliation language lives, so
// it can't drift out of sync between exam pages, and it always points
// people to the real, authoritative source rather than trying to replace it.
export function ExamDisclaimer({
  examName,
  organization,
  officialUrl,
}: {
  examName: string;
  organization?: string;
  officialUrl?: string;
}) {
  return (
    <div className="mt-4 border border-hairline bg-amber-soft/40 px-3 py-2 text-xs text-steel">
      <p>
        HardHatU is an independent study resource and is not affiliated
        with, endorsed by, or sponsored by{organization ? ` ${organization}` : " the organization that administers this exam"}.
        "{examName}" and any related names are trademarks of their respective
        owners, referenced here only so you can find the right exam to
        prepare for. Practice questions here are written independently and
        are not real exam content.
      </p>
      {officialUrl && (
        <p className="mt-1">
          For official registration, pricing, and the real exam content
          outline, go straight to{" "}
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy hover:underline"
          >
            {organization || "the certifying body"}'s own page
          </a>
          .
        </p>
      )}
    </div>
  );
}
