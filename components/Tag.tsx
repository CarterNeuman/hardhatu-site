export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-hairline bg-white/40 px-2 py-0.5 text-xs text-ink">
      {children}
    </span>
  );
}
