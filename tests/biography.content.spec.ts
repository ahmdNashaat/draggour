import { expect, test, type Page } from "@playwright/test";

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

/** The summary paragraphs are approved word for word; never paraphrased in the view. */
async function expectApprovedSummary(page: Page, locale: Locale) {
  const paragraphs = page.locator('section[aria-labelledby="biography-overview"] .biography-overview__body > p');
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

  // The section outline has the hero H1, the screen-reader overview H2, and
  // the moments gallery H2: the published gallery ships in every mode (D-062).
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h2")).toHaveCount(2);
  await expect(page.locator('main h2#biography-overview')).toHaveText("Professional Overview");
  await expect(page.locator('main h2#bio-moments-title')).toHaveText("Moments from practice and teaching");
  await expectVisuallyHidden(page, "main h2#biography-overview");

  // Reading measure: each paragraph stays within a readable measure.
  const measures = await page.locator(".biography-overview__body > p").evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().width)
  );
  for (const measure of measures) {
    expect(measure).toBeLessThanOrEqual(600);
  }

  // The header navigation stays reachable and operable from the keyboard.
  const conditionsCta = page.locator('#primary-navigation a[href="/en/conditions"]');
  await expect(conditionsCta).toBeVisible();
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

  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h2")).toHaveCount(2);
  await expect(page.locator('main h2#biography-overview')).toHaveText("نبذة مهنية");
  await expect(page.locator('main h2#bio-moments-title')).toHaveText("من الممارسة والتدريس");
  await expectVisuallyHidden(page, "main h2#biography-overview");

  const bodyText = await page.locator("body").innerText();
  expect(bodyText).toMatch(/[\u0600-\u06ff]/);

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

/** A screen-reader-only heading: in the outline, but drawn at 1×1 px. */
async function expectVisuallyHidden(page: Page, selector: string) {
  const heading = page.locator(selector);
  await expect(heading).toHaveClass(/sr-only/);
  const box = await heading.evaluate((node) => node.getBoundingClientRect());
  expect(box.width, `${selector}: drawn width`).toBeLessThanOrEqual(1);
  expect(box.height, `${selector}: drawn height`).toBeLessThanOrEqual(1);
}

/** The inline-start edge of the first match, mirrored with the page direction. */
async function startEdge(page: Page, selector: string) {
  const rtl = (await page.locator("html").getAttribute("dir")) === "rtl";
  return page.locator(selector).first().evaluate((node, isRtl) => {
    const box = node.getBoundingClientRect();
    return isRtl ? box.right : box.left;
  }, rtl);
}

/** Part B: the compact hero, the larger reading text and its measured contrast. */
test("the polished hero and the overview keep their rhythm, size and contrast", async ({ page }) => {
  const expected = {
    en: { fontSize: "17px", lineHeight: "30.6px" },
    ar: { fontSize: "18px", lineHeight: "35.1px" },
  } as const;

  for (const locale of locales) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/biography`);
    await expect(page.locator("[data-biography-page]")).toBeVisible();

    // Hero: adaptive height at 1440, with the portrait, its shadow and the
    // eyebrow untouched.
    const hero = await page.locator(".content-hero").boundingBox();
    expect(hero, locale).not.toBeNull();
    expect(hero!.height, `${locale}: hero height at 1440`).toBeGreaterThan(450);
    expect(hero!.height, `${locale}: hero height at 1440`).toBeLessThan(620);

    await expect(page.locator(".content-hero__portrait")).toBeVisible();
    await expect(page.locator(".content-hero .eyebrow")).toHaveCount(1);
    await expect(page.locator(".content-hero__lead")).toBeVisible();
    const shadow = await page.locator(".content-hero__portrait").evaluate((element) => getComputedStyle(element).boxShadow);
    expect(shadow, `${locale}: portrait shadow`).not.toBe("none");

    // Professional Overview: per-language body size, line height and at least
    // 4.5:1 contrast on the surface behind it.
    const reading = await page.locator(".biography-overview__body > p").first().evaluate((element) => {
      const parse = (value: string) => (value.match(/[0-9.]+/g) ?? []).slice(0, 3).map(Number);
      const channel = (value: number) => {
        const s = value / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      const luminance = ([r, g, b]: number[]) =>
        0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

      const style = getComputedStyle(element);
      let node: Element | null = element;
      let background = style.backgroundColor;
      while (node && (background === "rgba(0, 0, 0, 0)" || background === "transparent")) {
        node = node.parentElement;
        background = node ? getComputedStyle(node).backgroundColor : "rgb(0, 0, 0)";
      }

      const text = luminance(parse(style.color));
      const surface = luminance(parse(background));
      const ratio = (Math.max(text, surface) + 0.05) / (Math.min(text, surface) + 0.05);

      return {
        background,
        color: style.color,
        contrast: Math.round(ratio * 100) / 100,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
      };
    });

    expect(reading.fontSize, `${locale}: overview body size`).toBe(expected[locale].fontSize);
    expect(reading.lineHeight, `${locale}: overview line height`).toBe(expected[locale].lineHeight);
    expect(reading.contrast, `${locale}: overview contrast ${reading.color} on ${reading.background}`).toBeGreaterThanOrEqual(4.5);

    // The reading measure stays capped: each paragraph never fills the whole column.
    const measures = await page.locator(".biography-overview__body > p").evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().width)
    );
    for (const measure of measures) {
      expect(measure, `${locale}: reading measure`).toBeLessThanOrEqual(600);
    }

    // Two columns from 60rem (1440 and 1024); single column below (768 and 390).
    for (const width of [1440, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/biography`);
      const paragraphs = await page.locator(".biography-overview__body > p").evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return { top: Math.round(rect.top), left: Math.round(rect.left), right: Math.round(rect.right) };
        })
      );
      expect(paragraphs.length).toBe(2);
      expect(Math.abs(paragraphs[0].top - paragraphs[1].top), `${locale} at ${width}: side by side`).toBeLessThanOrEqual(2);
      if (locale === "ar") {
        expect(paragraphs[0].left, `${locale} at ${width}: first column on the right`).toBeGreaterThan(paragraphs[1].left);
      } else {
        expect(paragraphs[0].left, `${locale} at ${width}: first column on the left`).toBeLessThan(paragraphs[1].left);
      }
    }

    for (const width of [768, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/biography`);
      const paragraphs = await page.locator(".biography-overview__body > p").evaluateAll((nodes) =>
        nodes.map((node) => Math.round(node.getBoundingClientRect().top))
      );
      expect(paragraphs.length).toBe(2);
      expect(paragraphs[1], `${locale} at ${width}: stacked vertically`).toBeGreaterThan(paragraphs[0]);
    }

    // The paragraphs sit on the hero text's own inline-start edge — English at
    // the left, Arabic at the right — and begin a compact gap under the
    // hero's hairline divider.
    for (const width of [1440, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/biography`);
      await expect(page.locator(".biography-overview__body > p").first()).toBeVisible();

      const heroEdge = await startEdge(page, ".content-hero__grid > div");
      const paragraphEdge = await startEdge(page, ".biography-overview__body > p");
      expect(Math.abs(heroEdge - paragraphEdge), `${locale} at ${width}: start edges line up`).toBeLessThanOrEqual(1);

      const gap = await page.locator(".biography-overview__body > p").first().evaluate((node) => {
        const divider = (document.querySelector(".content-hero") as Element).getBoundingClientRect();
        return node.getBoundingClientRect().top - divider.bottom;
      });
      const expectedGap = Math.min(Math.max(0.03 * width, 24), 40);
      expect(Math.abs(gap - expectedGap), `${locale} at ${width}: gap under the divider (${gap}px)`).toBeLessThanOrEqual(2);
    }
  }
});
