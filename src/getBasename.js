/** GitHub Pages basename — independent repo or monorepo /projects/slug */
export default function getBasename() {
  const projectsMatch = window.location.pathname.match(
    /^(.*\/projects\/[^/]+)/
  );
  if (projectsMatch) return projectsMatch[1];

  const pub = process.env.PUBLIC_URL;
  if (pub && pub !== ".") {
    if (/^https?:\/\//i.test(pub)) {
      try {
        const pathname = new URL(pub).pathname.replace(/\/$/, "");
        if (pathname && pathname !== "/") return pathname;
      } catch {
        /* ignore */
      }
    }
    const normalized = pub.replace(/\/$/, "");
    if (normalized.startsWith("/")) return normalized;
  }

  return "";
}
