export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-7 border-l-[3px] border-amber pl-[11px] font-display text-[19px] font-semibold tracking-[0.01em] text-ink">
      {children}
    </h2>
  );
}
