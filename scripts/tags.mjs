import { chromium } from "@playwright/test";

const BASE = process.env.BASE ?? "http://localhost:3002";

const urls = [
  `${BASE}/en/conditions`,
  `${BASE}/ar/conditions`,
  `${BASE}/en/conditions/stroke-thrombectomy`,
  `${BASE}/ar/conditions/angiography`,
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const url of urls) {
  await page.goto(url);
  const tags = await page.evaluate(() => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content");
    return { title, metaDesc, canonical, robots };
  });
  console.log(`=== ${url} ===`);
  console.log(JSON.stringify(tags, null, 2));
}

await browser.close();
