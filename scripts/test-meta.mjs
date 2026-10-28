import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3002/en/conditions", { waitUntil: "networkidle" });

// Evaluate inside page context where patient-conditions is bundled or fetch details
const slugs = [
  "angiography",
  "brain-aneurysm",
  "avm",
  "stroke-thrombectomy",
  "fistulas",
  "venous-sinus-stenting",
  "carotid-intracranial-stenting",
  "paediatric",
  "chronic-subdural-haematoma",
  "other-embolisation",
];

const results = [];
for (const slug of slugs) {
  for (const locale of ["en", "ar"]) {
    await page.goto(`http://localhost:3002/${locale}/conditions/${slug}`);
    const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
    const p = await page.locator(".condition-paragraph").innerText();
    results.push({ slug, locale, length: metaDesc?.length ?? 0, metaDesc, p: p.slice(0, 200) });
  }
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
