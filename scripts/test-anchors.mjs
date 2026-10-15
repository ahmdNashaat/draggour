import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

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
  await page.goto("http://localhost:3002/en/conditions", { waitUntil: "networkidle" });
  const link = page.locator(`.conditions-hero__index a[href="#${slug}"]`);
  await link.click();

  // Wait for smooth scrolling to settle
  await page.waitForFunction(() => {
    return new Promise((resolve) => {
      let lastPos = window.scrollY;
      const check = () => {
        setTimeout(() => {
          if (window.scrollY === lastPos) {
            resolve(true);
          } else {
            lastPos = window.scrollY;
            check();
          }
        }, 100);
      };
      check();
    });
  });

  const target = page.locator(`#${slug}`);
  const box = await target.boundingBox();
  const scrollPaddingTop = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).scrollPaddingTop;
  });

  results.push({
    slug,
    viewportTop: Math.round(box ? box.y : -1),
    scrollPaddingTop,
  });
}

console.log("Anchor landing positions when smooth scrolling settles:");
console.log(JSON.stringify(results, null, 2));

await browser.close();
