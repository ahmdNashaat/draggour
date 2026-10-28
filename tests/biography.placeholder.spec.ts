import fs from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

import { placeholderMoments, placeholderMomentsPair } from "../content/biography-moments-placeholder";
import { validateBiographyMoments } from "../lib/biography-moments";
import { devGalleryServed } from "./helpers/server-mode";

type Locale = "en" | "ar";

const locales: readonly Locale[] = ["en", "ar"];

/** The section's visible, plainly worded disclaimer. */
const placeholderTag = "Placeholder: sample photos and captions, not real content.";

async function noHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

test.describe("biography placeholder moments", () => {
  test("the sample gallery obeys every rule the published one has", () => {
    // The placeholders are not exempt from a single validator rule: same
    // counts, same copy checks, same file-exists check, same EN/AR parity.
    expect(validateBiographyMoments(placeholderMomentsPair())).toEqual([]);

    for (const locale of locales) {
      const { moments } = placeholderMoments[locale];
      expect(moments.length, `${locale}: count`).toBe(6);
      for (const moment of moments) {
        expect(moment.caption.trim().split(/\s+/).length, `${locale}: caption words`).toBeLessThanOrEqual(45);
        expect(moment.src, `${locale}: portrait path`).toBe("/images/doctor/dr-mohamed-aggour.png");
        // The year is deliberately unfinished until the doctor supplies it.
        expect(moment.meta, `${locale}: placeholder year`).toContain("20XX");
      }
    }

    // Both locales carry the same photos in the same order.
    expect(placeholderMoments.en.moments.map((moment) => moment.src)).toEqual(
      placeholderMoments.ar.moments.map((moment) => moment.src),
    );
  });

  test("dev default shows six moments and the tag in EN and AR", async ({ page }) => {
    // The default gallery is the development preview; production serves none (D-059).
    test.skip(!(await devGalleryServed()), "development-only preview; production ships the page without a gallery");
    for (const locale of locales) {
      const fixture = placeholderMoments[locale];
      // On localhost (NODE_ENV === "development"), the placeholder gallery
      // renders by default without any query string or env flag needed.
      await page.goto(`/${locale}/biography`);

      const section = page.locator("section.bio-moments");
      await expect(section).toBeVisible();
      await expect(page.locator(".bio-moments__placeholder")).toHaveText(placeholderTag);
      await expect(page.locator("h2#bio-moments-title")).toHaveText(fixture.title);
      await expect(page.locator("ul.bio-moments__grid")).toHaveAttribute("data-count", "6");
      await expect(page.locator("figure.bio-moment")).toHaveCount(6);

      for (let index = 0; index < fixture.moments.length; index += 1) {
        const moment = fixture.moments[index];
        const figure = page.locator("figure.bio-moment").nth(index);

        await expect(figure.locator("img")).toHaveAttribute("alt", moment.alt);
        await expect(figure.locator(".bio-moment__meta")).toHaveText(moment.meta);
        await expect(figure.locator(".bio-moment__text")).toHaveText(moment.caption);
      }
    }
  });

  test("?placeholder=0 hides the gallery in development", async ({ page }) => {
    for (const locale of locales) {
      await page.goto(`/${locale}/biography?placeholder=0`);
      await expect(page.locator("[data-biography-page]")).toBeVisible();

      await expect(page.locator("section.bio-moments")).toHaveCount(0);
      await expect(page.locator(".bio-moments__placeholder")).toHaveCount(0);
      await expect(page.locator("figure.bio-moment")).toHaveCount(0);

      // Checked against strings only the placeholder carries: its unfinished
      // year, its alt text ("… (placeholder for the event photo)") and its
      // visible tag.
      const html = await page.content();
      expect(html, `${locale}: unfinished years`).not.toContain("20XX");
      expect(html, `${locale}: sample alt text`).not.toContain(
        locale === "ar" ? "صورة مؤقتة بدل صورة الحدث" : "placeholder for the event photo",
      );
      expect(html, `${locale}: sample tag`).not.toContain("sample photos and captions");
    }
  });

  test("a production build hides the placeholder gallery", async () => {
    // Inspect static SSG HTML files in .next if a production build exists
    const enHtmlPath = path.join(process.cwd(), ".next/server/app/en/biography.html");
    const arHtmlPath = path.join(process.cwd(), ".next/server/app/ar/biography.html");
    if (fs.existsSync(enHtmlPath) && fs.existsSync(arHtmlPath)) {
      const enHtml = fs.readFileSync(enHtmlPath, "utf-8");
      const arHtml = fs.readFileSync(arHtmlPath, "utf-8");
      expect(enHtml).not.toContain("bio-moments");
      expect(enHtml).not.toContain("20XX");
      expect(enHtml).not.toContain("sample photos and captions");
      expect(arHtml).not.toContain("bio-moments");
      expect(arHtml).not.toContain("20XX");
      expect(arHtml).not.toContain("sample photos and captions");
    }
  });

  test("the sample gallery mirrors in Arabic and stays overflow-free on a phone", async ({ page }) => {
    // The sample gallery is the development preview; production serves none (D-059).
    test.skip(!(await devGalleryServed()), "development-only preview; production ships the page without a gallery");
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/ar/biography");
      await expect(page.locator("section.bio-moments")).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await noHorizontalOverflow(page);
    }

    // One column on a phone, three across on the desktop — same grid, mirrored.
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/ar/biography");
    const columns = await page.locator("ul.bio-moments__grid").evaluate((grid) =>
      getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    );
    expect(columns, "320px: one column of six").toBe(1);
  });

  test("the counted dev preview wins over the sample gallery, and production drops the parameter", async ({ page }) => {
    await page.goto("/en/biography?moments=3");

    if (await devGalleryServed()) {
      await expect(page.locator("ul.bio-moments__grid")).toHaveAttribute("data-count", "3");
      await expect(page.locator(".bio-moments__placeholder")).toHaveCount(0);
      await expect(page.locator(".bio-moment__meta").first()).not.toContainText("20XX");
    } else {
      // Production never resolves searchParams (SSG): `?moments` is dropped (D-059).
      await expect(page.locator(".bio-moments")).toHaveCount(0);
    }
  });
});
