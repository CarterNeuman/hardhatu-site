"use client";

// Opens the browser's print dialog. State guides are written to be handed
// out, so print styles (print:hidden / print:block) shape the paper version.
export function PrintButton({ label = "Print or save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-sm bg-[#F2C200] px-4 py-2 text-sm font-bold text-ink hover:brightness-95"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
      </svg>
      {label}
    </button>
  );
}
