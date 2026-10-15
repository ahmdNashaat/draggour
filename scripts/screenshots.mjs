import { chromium } from "@playwright/test";
import { mkdirSync, statSync } from "fs";
import { join } from "path";

const BASE = process.env.BASE ?? "http://localhost:3002";
const OUT_DIRS = [
  join(process.cwd(), "screenshots"),
  join(process.cwd(), "qa", "screenshots"),
];

for (const dir of OUT_DIRS) {
  mkdirSync(dir, { recursive: true });
}

const browser = await chromium.launch();

const savedFiles = [];

// Helper to save to both directories
async function saveScreenshot(page, filename) {
  for (const dir of OUT_DIRS) {
    const fullPath = join(dir, filename);
    await page.screenshot({ path: fullPath, fullPage: true });
  }
  const rootPath = join(OUT_DIRS[0], filename);
  const stats = statSync(rootPath);
  savedFiles.push({
    filename,
    sizeBytes: stats.size,
    sizeKb: Math.round(stats.size / 1024),
  });
}

// 1. Hub screenshots
for (const locale of ["en", "ar"]) {
  for (const width of [1440, 1024, 768, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      locale: locale === "ar" ? "ar-EG" : "en-GB",
    });
    await page.goto(`${BASE}/${locale}/conditions`, { waitUntil: "networkidle" });

    // Collapsed screenshot
    await saveScreenshot(page, `hub-${locale}-${width}-collapsed.png`);

    // For 390 (mobile), also take expanded screenshot
    if (width === 390) {
      // Expand all rows
      const toggles = page.locator(".condition-collapsible__toggle");
      const count = await toggles.count();
      for (let i = 0; i < count; i++) {
        await toggles.nth(i).click();
      }
      await page.waitForTimeout(300);
      await saveScreenshot(page, `hub-${locale}-${width}-expanded.png`);
    }

    await page.close();
  }
}

// 2. Stroke detail page screenshots
for (const locale of ["en", "ar"]) {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      locale: locale === "ar" ? "ar-EG" : "en-GB",
    });
    await page.goto(`${BASE}/${locale}/conditions/stroke-thrombectomy`, { waitUntil: "networkidle" });
    await saveScreenshot(page, `detail-stroke-${locale}-${width}.png`);
    await page.close();
  }
}

await browser.close();

console.log("=== Generated Screenshots ===");
console.table(savedFiles);
