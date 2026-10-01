import { expect, test } from "@playwright/test";

import { conditionContent } from "../content/conditions";
import { conditionItems } from "../content/home";

const locales = ["en", "ar"] as const;

test("the V1 condition topic model has six unique, stable condition routes", () => {
  const itemSlugs = conditionItems.map((item) => item.slug);
  const contentSlugs = conditionContent.map((item) => item.slug);

  expect(itemSlugs).toHaveLength(6);
  expect(new Set(itemSlugs).size).toBe(6);
  expect(new Set(contentSlugs).size).toBe(6);
  expect([...contentSlugs].sort()).toEqual([...itemSlugs].sort());
  expect(contentSlugs).toEqual([
    "brain-aneurysm",
    "stroke",
    "avm",
    "carotid-stenosis",
    "venous-sinus-disorders",
    "chronic-subdural-haematoma",
  ]);
});

for (const locale of locales) {
  test(`${locale} condition pages have distinct topics, matching metadata, and useful internal links`, async ({ page }) => {
    const titles: string[] = [];
    const descriptions: string[] = [];
    const headings: string[] = [];

    for (const condition of conditionContent) {
      const route = `/${locale}/conditions/${condition.slug}`;
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);

      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      const heading = (await page.locator("h1").textContent())?.trim() ?? "";
      titles.push(title);
      descriptions.push(description ?? "");
      headings.push(heading);

      expect(heading).toBeTruthy();
      expect(title).toContain(heading);
      expect(description).toBe(locale === "ar" ? condition.arabicDescription : condition.description);
      await expect(page.locator(`main[data-condition-page="${condition.slug}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(2);
      await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/biography"]`)).toHaveCount(1);

      const anchors = (await page.locator("main a[href]").allTextContents()).map((text) => text.trim());
      expect(anchors.every((text) => text.length > 0 && text.length < 60)).toBe(true);
      expect(anchors.join(" ")).not.toMatch(/best|leading|world.?class|number one|#1/i);
    }

    expect(new Set(titles).size).toBe(6);
    expect(new Set(descriptions).size).toBe(6);
    expect(new Set(headings).size).toBe(6);
  });
}

test("the topic graph connects Home, Biography, Conditions, E-learning and consultation", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);
    const homeTitle = await page.title();
    const homeDescription = await page.locator('meta[name="description"]').getAttribute("content");
    expect(homeTitle).toContain(locale === "ar" ? "الأشعة العصبية التداخلية" : "Interventional Neuroradiologist");
    expect(homeDescription).toContain(locale === "ar" ? "الأشعة العصبية التداخلية" : "Interventional Neuroradiologist");
    await expect(page.locator(`main a[href="/${locale}/biography"]`).first()).toHaveAttribute("href", `/${locale}/biography`);
    await expect(page.locator(`main a[href^="/${locale}/conditions/"]`)).toHaveCount(6);
    const eLearningLink = page.locator(`main a[href="/${locale}/e-learning"]`);
    await expect(eLearningLink).toHaveCount(1);
    await expect(eLearningLink).toHaveText(locale === "ar" ? "استكشف صفحة التعليم الطبي" : "View the E-learning page");
    await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(2);

    await page.goto(`/${locale}/biography`);
    await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(1);
    await expect(page.locator(`main a[href="/${locale}/e-learning"]`)).toHaveCount(1);
    await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);

    await page.goto(`/${locale}/conditions`);
    await expect(page.locator(`main a[href^="/${locale}/conditions/"]`)).toHaveCount(6);
    await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
    await expect(page.locator(`main a[href="/${locale}/biography"]`)).toHaveCount(1);
  }
});
