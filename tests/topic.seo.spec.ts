import { expect, test } from "@playwright/test";

import { getConditionListing, patientConditions } from "../content/patient-conditions";

const locales = ["en", "ar"] as const;

test("the patient condition content has ten unique, source-defined condition routes", () => {
  const contentSlugs = patientConditions.map((item) => item.slug);

  expect(contentSlugs).toHaveLength(10);
  expect(new Set(contentSlugs).size).toBe(10);
  expect(contentSlugs).toEqual([
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
  ]);
  // One source, one order: the home cards and the /conditions list read the same
  // array, and the Arabic order is identical to the English order.
  expect(getConditionListing("en").map((item) => item.slug)).toEqual(contentSlugs);
  expect(getConditionListing("ar").map((item) => item.slug)).toEqual(contentSlugs);
});

for (const locale of locales) {
  test(`${locale} condition pages have distinct topics, matching metadata, and useful internal links`, async ({ page }) => {
    const titles: string[] = [];
    const descriptions: string[] = [];
    const headings: string[] = [];

    for (const condition of patientConditions) {
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
      expect(title.replace(/\s+/g, " ")).toContain(heading.replace(/\s+/g, " "));
      const content = condition[locale];
      const expectedDescription = content.blocks.flatMap((block) => block.paragraphs ?? [])[0];
      expect(description).toBe(expectedDescription);
      await expect(page.locator('meta[name="keywords"]')).toHaveAttribute(
        "content",
        content.searchTerms.join(","),
      );
      await expect(page.locator(`main[data-condition-page="${condition.slug}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(2);
      await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
      await expect(page.locator(".condition-medical-disclaimer")).toBeVisible();

      const anchors = (await page.locator("main a[href]").allTextContents()).map((text) => text.trim());
      expect(anchors.every((text) => text.length > 0 && text.length < 60)).toBe(true);
      expect(anchors.join(" ")).not.toMatch(/best|leading|world.?class|number one|#1/i);
    }

    expect(new Set(titles).size).toBe(10);
    expect(new Set(descriptions).size).toBe(10);
    expect(new Set(headings).size).toBe(10);
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

    // Every home card links straight to a current document slug: no legacy slug
    // that would only redirect, and no missing condition.
    const homeCardHrefs = await page
      .locator(`main a[href^="/${locale}/conditions/"]`)
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(homeCardHrefs).toEqual(patientConditions.map((condition) => `/${locale}/conditions/${condition.slug}`));
    await expect(page.locator(".condition-card")).toHaveCount(10);
    const homeCardTitles = await page.locator(".condition-card__title").allTextContents();
    const homeCardDescriptions = await page.locator(".condition-card__description").allTextContents();
    expect(homeCardTitles.every((title) => title.trim().length > 0)).toBe(true);
    expect(homeCardDescriptions.every((description) => description.trim().length > 0)).toBe(true);
    const eLearningLink = page.locator(`main a[href="/${locale}/e-learning"]`);
    await expect(eLearningLink).toHaveCount(2);
    await expect(page.getByRole("link", { name: locale === "ar" ? "استكشف صفحة التعليم الطبي" : "View the E-learning page" })).toHaveAttribute("href", `/${locale}/e-learning`);
    await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(3);

    await page.goto(`/${locale}/biography`);
    await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(1);
    await expect(page.locator(`main a[href="/${locale}/e-learning"]`)).toHaveCount(1);
    await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);

    await page.goto(`/${locale}/conditions`);
    await expect(page.locator(`main a[href^="/${locale}/conditions/"]`)).toHaveCount(10);
    await expect(page.locator(".sticky-cta")).toHaveCount(0);

    // Hub structure: one H1 for the page, one linked H2 per condition, and each
    // condition's own document printed verbatim beneath it, in document order.
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(10);
    await expect(page.locator(".condition-index__item")).toHaveCount(10);
    await expect(page.locator(".condition-index__title")).toHaveText(homeCardTitles);

    // The review stamp and the standing patient notice stand on the hub too.
    await expect(page.locator(".condition-reviewed-by")).toHaveText(
      locale === "en"
        ? "Reviewed by Dr. Mohamed Aggour · Last reviewed 4 October 2026"
        : "راجعه د. محمد عجور · آخر مراجعة 4 أكتوبر 2026",
    );
    await expect(page.locator(".condition-medical-disclaimer")).toContainText(
      locale === "en" ? "call emergency services now" : "اتصل بالإسعاف فورًا",
    );

    for (const [index, condition] of patientConditions.entries()) {
      const content = condition[locale];
      const heading = page.locator(".condition-index__title a").nth(index);
      await expect(heading).toHaveAttribute("href", `/${locale}/conditions/${condition.slug}`);
      await expect(heading).toHaveText(content.title);

      // The hub repeats the whole document: block headings, paragraphs and
      // bullets, all copied unchanged from the source and in source order.
      const entry = page.locator(".condition-index__item").nth(index);
      const { blocks } = content;
      await expect(entry.locator("h3")).toHaveText(
        blocks.flatMap((block) => (block.heading ? [block.heading] : [])),
      );
      await expect(entry.locator("p")).toHaveText(blocks.flatMap((block) => block.paragraphs ?? []));
      await expect(entry.locator("li")).toHaveText(blocks.flatMap((block) => block.items ?? []));
    }
    await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
    await expect(page.locator(`main a[href="/${locale}/biography"]`)).toHaveCount(1);
  }
});

test("Home route section headings are accessible links to their corresponding pages", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);
    const targets = [
      ["biography-preview-title", "biography"],
      ["conditions-title", "conditions"],
      ["learning-title", "e-learning"],
      ["consultation-title", "remote-consultation"],
    ] as const;

    for (const [headingId, path] of targets) {
      const heading = page.locator(`#${headingId}`);
      const link = heading.getByRole("link");
      await expect(link).toHaveAttribute("href", `/${locale}/${path}`);
      await link.focus();
      await expect(link).toBeFocused();
    }
  }
});
