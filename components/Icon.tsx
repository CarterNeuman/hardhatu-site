// Thin-stroke, blueprint-style icons that distinguish content types at a
// glance without relying on color alone (build-brief.md section 9).
type IconKind =
  | "career"
  | "concept"
  | "phase"
  | "lesson"
  | "software"
  | "gethired"
  | "resume"
  | "interview"
  | "exam"
  | "cheatsheet"
  | "quiz"
  | "program";

export function Icon({
  kind,
  size = 16,
  className = "",
}: {
  kind: IconKind;
  size?: number;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const style = { width: size, height: size, display: "block" };

  if (kind === "career") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <rect x="4" y="5" width="16" height="14" rx="1" {...common} />
        <circle cx="15" cy="12" r="2.4" {...common} />
      </svg>
    );
  }
  if (kind === "concept") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <line x1="4" y1="12" x2="20" y2="12" {...common} />
        <line x1="4" y1="8" x2="4" y2="16" {...common} />
        <line x1="20" y1="8" x2="20" y2="16" {...common} />
      </svg>
    );
  }
  if (kind === "phase") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <polyline points="4,18 4,14 10,14 10,10 16,10 16,6 20,6" {...common} />
      </svg>
    );
  }
  if (kind === "lesson") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <path d="M4 5.5C4 5 4.5 4.5 5.5 4.5H12V19.5H5.5C4.5 19.5 4 19 4 18.5V5.5Z" {...common} />
        <path d="M20 5.5C20 5 19.5 4.5 18.5 4.5H12V19.5H18.5C19.5 19.5 20 19 20 18.5V5.5Z" {...common} />
      </svg>
    );
  }
  if (kind === "software") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <rect x="3" y="5" width="18" height="12" rx="1" {...common} />
        <line x1="8" y1="20" x2="16" y2="20" {...common} />
        <line x1="12" y1="17" x2="12" y2="20" {...common} />
      </svg>
    );
  }
  if (kind === "gethired") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="8" {...common} />
        <circle cx="12" cy="12" r="4" {...common} />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "resume") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <rect x="5" y="3.5" width="14" height="17" rx="1" {...common} />
        <line x1="8" y1="8" x2="16" y2="8" {...common} />
        <line x1="8" y1="12" x2="16" y2="12" {...common} />
        <line x1="8" y1="16" x2="13" y2="16" {...common} />
      </svg>
    );
  }
  if (kind === "interview") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <circle cx="9" cy="9" r="3.2" {...common} />
        <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" {...common} />
        <path d="M15 6.5c1.6.3 2.8 1.7 2.8 3.4S16.6 13 15 13.3" {...common} />
        <path d="M15 19c0-1.9-.8-3.6-2-4.7" {...common} />
      </svg>
    );
  }
  if (kind === "exam") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <rect x="5" y="3.5" width="14" height="17" rx="1" {...common} />
        <path d="M8.5 10.5l1.8 1.8 3.7-4" {...common} />
        <line x1="8" y1="16" x2="16" y2="16" {...common} />
      </svg>
    );
  }
  if (kind === "cheatsheet") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <path d="M6 3.5h9l3 3v14H6z" {...common} />
        <path d="M15 3.5v3h3" {...common} />
        <line x1="8.5" y1="12" x2="15.5" y2="12" {...common} />
        <line x1="8.5" y1="15" x2="15.5" y2="15" {...common} />
        <line x1="8.5" y1="18" x2="12.5" y2="18" {...common} />
      </svg>
    );
  }
  if (kind === "quiz") {
    return (
      <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
        <path d="M9 9a3 3 0 1 1 4 2.8c-.8.4-1.4 1-1.4 2.2" {...common} />
        <line x1="11.6" y1="17.2" x2="11.6" y2="17.3" {...common} />
        <rect x="4" y="4" width="16" height="16" rx="1.5" {...common} />
      </svg>
    );
  }
  // program
  return (
    <svg viewBox="0 0 24 24" style={style} className={className} aria-hidden="true" focusable="false">
      <path d="M12 4l9 4-9 4-9-4z" {...common} />
      <path d="M6.5 10.5v4.2c0 1.3 2.5 2.3 5.5 2.3s5.5-1 5.5-2.3v-4.2" {...common} />
      <line x1="21" y1="8" x2="21" y2="14" {...common} />
    </svg>
  );
}
