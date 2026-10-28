/**
 * Which gallery the server under test actually serves.
 *
 * The biography moments gallery is a development-only preview: the route
 * resolves `searchParams` and the placeholder set only while NODE_ENV is
 * "development", so a production build ships without any of it (the page
 * stays statically generated — see the JSDoc in app/[locale]/biography/page.tsx).
 *
 * Tests whose assertions depend on the preview ask the server once instead of
 * assuming the mode, so the same suite is meaningful on `pnpm dev` and on
 * `next build` + `next start` (D-059).
 */
const port = process.env.PORT || "3000";

let cached: Promise<boolean> | undefined;

/** True when the server renders the development gallery preview (dev: yes, production: no). */
export function devGalleryServed(): Promise<boolean> {
  cached ??= fetch(`http://localhost:${port}/en/biography`)
    .then((response) => response.text())
    .then((html) => html.includes('id="bio-moments-title"'))
    .catch(() => false);
  return cached;
}
