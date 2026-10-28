/**
 * Warm the `next start` image-optimizer cache before a production e2e run.
 *
 * On this Windows machine a long-lived `next start` process that has served
 * several page navigations can hang forever on the FIRST fresh (not yet
 * cached) `/_next/image` webp encode requested by a browser mid-load; every
 * later request for that variant then joins the hung job (see DECISIONS.md
 * D-059). Encodes issued while the process is still idle always complete, so
 * encoding every variant up front keeps the suite clear of the failure.
 *
 * Usage (with the production server already listening on :3000):
 *   node scripts/warm-image-cache.mjs
 *
 * Exits non-zero if any variant fails to encode.
 */
import http from "node:http";

const BASE_HOST = process.env.WARM_IMAGE_HOST ?? "localhost";
const BASE_PORT = Number(process.env.WARM_IMAGE_PORT ?? 3000);

/** The only raster image production pages request through /_next/image. */
const IMAGE_SRC = "/images/doctor/dr-mohamed-aggour.png";

/**
 * Every srcset width the built pages expose for the portrait (extracted from
 * the prerendered HTML of /en, /ar, /en/biography and /ar/biography).
 */
const WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/** The webp-accepting request a browser sends, so entries match its cache keys. */
const BROWSER_ACCEPT = "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8";

const PER_REQUEST_TIMEOUT_MS = 30_000;

function warm(width) {
  return new Promise((resolve) => {
    const started = Date.now();
    const request = http.get(
      {
        host: BASE_HOST,
        port: BASE_PORT,
        path: `/_next/image?url=${encodeURIComponent(IMAGE_SRC)}&w=${width}&q=75`,
        headers: { accept: BROWSER_ACCEPT },
        agent: false,
      },
      (response) => {
        let bytes = 0;
        response.on("data", (chunk) => (bytes += chunk.length));
        response.on("end", () =>
          resolve({
            width,
            ok: response.statusCode === 200,
            status: response.statusCode,
            bytes,
            type: response.headers["content-type"],
            ms: Date.now() - started,
          }),
        );
      },
    );
    request.setTimeout(PER_REQUEST_TIMEOUT_MS, () => request.destroy(new Error(`timeout after ${PER_REQUEST_TIMEOUT_MS / 1000}s`)));
    request.on("error", (error) => resolve({ width, ok: false, error: error.message, ms: Date.now() - started }));
  });
}

const results = [];
for (const width of WIDTHS) {
  const result = await warm(width);
  results.push(result);
  const detail = result.ok ? `${result.status} ${result.bytes}B ${result.type} (cache ${result.ms}ms)` : `FAILED: ${result.error ?? result.status}`;
  console.log(`w=${String(width).padStart(4)}: ${detail}`);
}

const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`\n${failed.length} of ${results.length} variants did not warm up.`);
  process.exit(1);
}
console.log(`\nAll ${results.length} variants warm; the browser will only ever see cache hits.`);
