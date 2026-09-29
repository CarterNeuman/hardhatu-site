export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 border-t border-hairline pt-4 font-display text-sm font-semibold uppercase tracking-wide text-steel">
      {children}
    </h2>
  );
}
