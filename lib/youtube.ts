// Turns a plain YouTube URL (watch, youtu.be, shorts, or an already-embed
// link) into a youtube.com/embed/<id> URL suitable for an <iframe src>.
// Returns null for anything that isn't recognizably a YouTube link, so the
// caller can fall back to a plain text link instead of embedding nothing.
export function getYouTubeEmbedUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  let videoId: string | null = null;

  if (host === "youtu.be") {
    videoId = parsed.pathname.slice(1);
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.pathname.startsWith("/embed/")) {
      videoId = parsed.pathname.slice("/embed/".length);
    } else if (parsed.pathname.startsWith("/shorts/")) {
      videoId = parsed.pathname.slice("/shorts/".length);
    }
  }

  // Strip any trailing path segments/query noise picked up from shorts/embed.
  if (videoId) {
    videoId = videoId.split("/")[0].split("?")[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}
