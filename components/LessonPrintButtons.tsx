"use client";

// "Print lesson" prints the worksheet (the default print view), "Print
// answer key" switches the page into key mode just for that one print job
// -- same pattern as the state guides' single-trade print (TradeExplorer).
function printIt(mode: "lesson" | "key") {
  const html = document.documentElement;
  if (mode === "key") html.classList.add("print-key-mode");
  const done = () => html.classList.remove("print-key-mode");
  window.addEventListener("afterprint", done, { once: true });
  window.setTimeout(() => window.print(), 50);
}

const btn =
  "inline-flex items-center gap-2 border border-navy px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5";

export function LessonPrintButtons({ hasQuestions }: { hasQuestions: boolean }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 print:hidden">
      <button type="button" onClick={() => printIt("lesson")} className={btn}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
        </svg>
        Print lesson
      </button>
      {hasQuestions && (
        <button type="button" onClick={() => printIt("key")} className={btn}>
          Print answer key
        </button>
      )}
    </div>
  );
}
