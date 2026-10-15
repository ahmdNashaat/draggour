import { chromium } from "@playwright/test";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE = process.env.BASE ?? "http://localhost:3002";
const OUT = join(process.cwd(), "qa", "screenshots");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// 1. Hub screenshots
for (const locale of ["en", "ar"]) {
  for (const width of [1440, 1024, 768, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      locale: locale === "ar" ? "ar-EG" : "en-GB",
    });
    await page.goto(`${BASE}/${locale}/conditions`, { waitUntil: "networkidle" });

    // Collapsed screenshot
    await page.screenshot({
      path: join(OUT, `hub-${locale}-${width}-collapsed.png`),
      fullPage: true,
    });

    // For 390 (mobile), also take expanded screenshot
    if (width === 390) {
      // Expand all rows
      const toggles = page.locator(".condition-collapsible__toggle");
      const count = await toggles.count();
      for (let i = 0; i < count; i++) {
        await toggles.nth(i).click();
      }
      await page.waitForTimeout(200);
      await page.screenshot({
        path: join(OUT, `hub-${locale}-${width}-expanded.png`),
        fullPage: true,
      });
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
    await page.screenshot({
      path: join(OUT, `detail-stroke-${locale}-${width}.png`),
      fullPage: true,
    });
    await page.close();
  }
}

await browser.close();
console.log("Screenshots captured successfully in", OUT);
