import { expect, test, type Locator, type Page } from "@playwright/test";

import { getBiographyContent } from "../content/biography";

type Locale = "en" | "ar";

const locales: readonly Locale[] = ["en", "ar"];

const internalLanguage = [
  /approval required/i,
  /awaiting approval/i,
  /needs verification/i,
  /needs doctor confirmation/i,
  /CV §/,
  /source of truth/i,
  /T3 (?:item|claim)/i,
  /\bCF[1-4]\b/,
  /draft(?:\s|—|-)/i,
  /نموذج أولي/,
  /مسودة/,
  /في انتظار الاعتماد/,
];

const viewportWidths = [320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560];

/** The CV section ids must never come back to the page (D-040). */
const removedSectionIds = [
  "biography-annual-activity",
  "biography-current-positions",
  "biography-career-history",
  "biography-previous-positions",
  "biography-qualifications",
  "biography-societies",
  "biography-teaching",
  "biography-academic",
  "biography-research",
  "biography-leadership",
  "biography-milestones",
  "biography-clinical-expertise",
  "biography-external-links",
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

async function expectAtLeast(locator: Locator, minimum: number, label: string) {
  const count = await locator.count();
  expect(count, `${label}: expected at least ${minimum} items, received ${count}`).toBeGreaterThanOrEqual(minimum);
}

/** The summary paragraphs are approved word for word; never paraphrased in the view. */
async function expectApprovedSummary(page: Page, locale: Locale) {
  const paragraphs = page.locator('section[aria-labelledby="biography-overview"] .content-section__body > p');
  await expect(paragraphs).toHaveCount(2);

  const rendered = (await paragraphs.allInnerTexts()).map((value) => value.trim());
  expect(rendered).toEqual([...getBiographyContent(locale).summary]);
}

/** No CV disclosure, no CV sections and no annual activity anywhere on the page. */
async function expectSummaryOnly(page: Page) {
  await expect(page.locator("details[data-biography-full-cv]")).toHaveCount(0);
  await expect(page.locator(".biography-full-cv__summary")).toHaveCount(0);
  await expect(page.locator(".biography-toc")).toHaveCount(0);
  await expect(page.locator(".content-card__metric")).toHaveCount(0);

  for (const id of removedSectionIds) {
    await expect(page.locator(`#${id}`)).toHaveCount(0);
    await expect(page.locator(`[aria-labelledby="${id}"]`)).toHaveCount(0);
  }
}

test("Biography shows the approved summary and nothing else in English", async ({ page }) => {
  await page.goto("/en/biography");
  await expect(page.locator("[data-biography-page]")).toBeVisible();

  // The hero keeps its heading, professional title and portrait unchanged.
  await expect(page.locator("main h1")).toHaveText("Biography");
  await expect(page.locator(".content-hero__lead")).toContainText("Consultant Interventional Neuroradiologist");
  await expect(page.locator(".content-hero__portrait")).toBeVisible();

  // The two approved paragraphs are the whole body of the page.
  await expectApprovedSummary(page, "en");
  await expectSummaryOnly(page);

  // The section outline stays a single H1 + one H2.
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h2")).toHaveCount(1);
  await expect(page.locator('main h2#biography-overview')).toContainText("Professional Overview");

  // Reading measure: the summary never fills the whole wide grid column.
  const measure = await page.locator(".content-section__body").evaluate((element) => element.getBoundingClientRect().width);
  expect(measure).toBeLessThanOrEqual(600);

  // Navigation links stay reachable and operable from the keyboard.
  const conditionsCta = page.locator('.content-next-links a[href="/en/conditions"]');
  await expectAtLeast(page.locator(".content-next-links a[href]"), 4, "biography navigation links");
  await conditionsCta.focus();
  await expect(conditionsCta).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/en\/conditions$/);

  await page.goto("/en/biography");
  await expectNoHorizontalOverflow(page);
});

test("Biography shows the same approved summary in Arabic, right to left", async ({ page }) => {
  await page.goto("/ar/biography");
  await expect(page.locator("[data-biography-page]")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await expectApprovedSummary(page, "ar");
  await expectSummaryOnly(page);

  await expect(page.locator('main h2#biography-overview')).toContainText("نبذة مهنية");

  const bodyText = await page.locator("body").innerText();
  expect(bodyText).toMatch(/[\u0600-\u06ff]/);

  await expectAtLeast(page.locator(".content-next-links a[href]"), 4, "biography navigation links");

  await expectNoHorizontalOverflow(page);
});

test("the summary is served in the initial HTML and the CV sections are not", async ({ page }) => {
  for (const locale of locales) {
    const response = await page.request.get(`/${locale}/biography`);
    expect(response.status(), locale).toBe(200);
    const html = await response.text();

    // Both approved paragraphs are present without JavaScript, so crawlers read them.
    for (const paragraph of getBiographyContent(locale).summary) expect(html, locale).toContain(paragraph);

    // No disclosure and no CV section ships in the markup.
    expect(html, locale).not.toContain("data-biography-full-cv");
    expect(html, locale).not.toContain("biography-full-cv");
    expect(html, locale).not.toContain("السيرة الكاملة");
    expect(html, locale).not.toContain("Full CV");
    for (const id of removedSectionIds) expect(html, `${locale}: ${id}`).not.toContain(`id="${id}"`);

    // The removed annual activity section is not emitted in any form.
    expect(html, locale).not.toContain("150–200 / year");

    await page.goto(`/${locale}/biography`);
    await expect(page.locator("[data-biography-page]")).toBeVisible();
    await expectSummaryOnly(page);
  }
});

test("Biography never renders internal governance metadata", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/biography`);

    const bodyText = await page.locator("body").innerText();

    for (const pattern of internalLanguage) {
      expect(bodyText, locale).not.toMatch(pattern);
    }

    // Internal review notes attached to content items must stay internal.
    await expect(page.getByText(/requires explicit approval/i)).toHaveCount(0);
    await expect(page.getByText(/preserved:/i)).toHaveCount(0);
  }
});

test("Biography stays free of horizontal overflow across the required width matrix", async ({ page }) => {
  test.setTimeout(300_000);

  for (const locale of locales) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/biography`);
      await expect(page.locator("[data-biography-page]")).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }

    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto(`/${locale}/biography`);
    await expectNoHorizontalOverflow(page);
  }
});
