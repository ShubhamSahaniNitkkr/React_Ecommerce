/** Resolve public folder assets for GitHub Pages basename */
export default function getAssetUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  const normalized = path.replace(/^\//, '');
  return base ? `${base}/${normalized}` : `/${normalized}`;
}
