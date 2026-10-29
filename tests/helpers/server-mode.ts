/**
 * Whether the server under test resolves the biography preview switches.
 *
 * The biography route reads `searchParams` only while NODE_ENV is
 * "development"; a production build stays statically generated and drops the
 * parameter (D-059). The published gallery itself ships in every mode now
 * (D-062), so gallery presence no longer tells the modes apart — resolving
 * `?moments=3` does.
 *
 * Tests whose assertions depend on the preview ask the server once instead of
 * assuming the mode, so the same suite is meaningful on `pnpm dev` and on
 * `next build` + `next start` (D-059).
 */
const port = process.env.PORT || "3000";

let cached: Promise<boolean> | undefined;

/** True when the server resolves `?moments` (dev: yes, production: no). */
export function devPreviewServed(): Promise<boolean> {
  cached ??= fetch(`http://localhost:${port}/en/biography?moments=3`)
    .then((response) => response.text())
    .then((html) => html.includes('data-count="3"'))
    .catch(() => false);
  return cached;
}
