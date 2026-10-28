import { chromium } from "@playwright/test";

const BASE = process.env.BASE ?? "http://localhost:3002";
const browser = await chromium.launch();

for (const locale of ["en", "ar"]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    locale: locale === "ar" ? "ar-EG" : "en-GB",
  });
  await page.goto(`${BASE}/${locale}/conditions`, { waitUntil: "networkidle" });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Desktop hub height at 1440px [${locale}]: ${height}px`);
  await page.close();
}

await browser.close();
