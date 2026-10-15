// Baseline / after measurements for the round 2 report: page heights, the
// paragraph measure in characters per line, and the detail-page hero.
import { chromium } from "@playwright/test";

const BASE = process.env.BASE ?? "http://localhost:3002";

const lines = async (page, selector) =>
  page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return null;
    const style = getComputedStyle(element);
    const lineHeight = Number.parseFloat(style.lineHeight);
    const text = element.textContent ?? "";
    // Average rendered line length in characters, measured from the real box.
    const box = element.getBoundingClientRect();
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
    probe.textContent = "x".repeat(100);
    element.appendChild(probe);
    const charWidth = probe.getBoundingClientRect().width / 100;
    probe.remove();
    return {
      lineHeight,
      height: box.height,
      renderedLines: Math.round(box.height / lineHeight),
      approxCharsPerLine: Math.round((box.width / charWidth) * 10) / 10,
      textChars: text.trim().length,
    };
  }, selector);

const run = async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const locale of ["en", "ar"]) {
    for (const width of [1440, 1024, 768, 390]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        locale: locale === "ar" ? "ar-EG" : "en-GB",
      });
      const page = await context.newPage();
      await page.goto(`${BASE}/${locale}/conditions`, { waitUntil: "load" });
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const paragraph = await lines(page, ".condition-row__content .condition-paragraph");
      results.push({ locale, width, page: "hub", height, paragraph });
      await context.close();
    }
  }

  // Detail page: hero height and content-column alignment vs the breadcrumb.
  for (const locale of ["en", "ar"]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/${locale}/conditions/stroke-thrombectomy`, { waitUntil: "load" });
    const measured = await page.evaluate(() => {
      const hero = document.querySelector(".content-hero");
      const breadcrumb = document.querySelector(".site-breadcrumb ol li:first-child");
      const h1 = document.querySelector("h1");
      const article = document.querySelector(".condition-document__content");
      const first = article?.firstElementChild;
      const isRtl = document.documentElement.dir === "rtl";
      return {
        heroHeight: hero ? Math.round(hero.getBoundingClientRect().height) : null,
        h1Start: h1 ? Math.round(isRtl ? h1.getBoundingClientRect().right : h1.getBoundingClientRect().left) : null,
        articleStart: article ? Math.round(isRtl ? article.getBoundingClientRect().right : article.getBoundingClientRect().left) : null,
        breadcrumbStart: breadcrumb ? Math.round(isRtl ? breadcrumb.getBoundingClientRect().right : breadcrumb.getBoundingClientRect().left) : null,
        urgentWidth: first ? Math.round(first.getBoundingClientRect().width) : null,
        paragraphWidth: article
          ? Math.round(article.querySelector(".condition-paragraph")?.getBoundingClientRect().width ?? 0)
          : null,
      };
    });
    const paragraph = await lines(page, ".condition-document .condition-paragraph");
    results.push({ locale, width: 1440, page: "detail", ...measured, paragraph });
    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
};

await run();
