import { expect, test, type Locator, type Page } from "@playwright/test";

type SectionSpec = Readonly<{
  key: string;
  minItems: number;
  selector: string;
}>;

/** Major source-backed Biography sections and their minimum populated item count. */
const listSections: readonly SectionSpec[] = [
  { key: "currentPositions", minItems: 7, selector: 'section[aria-labelledby="biography-current-positions"] .content-item-list > li' },
  { key: "previousPositions", minItems: 6, selector: 'section[aria-labelledby="biography-previous-positions"] .content-item-list > li' },
  { key: "qualifications", minItems: 12, selector: 'section[aria-labelledby="biography-qualifications"] .content-item-list > li' },
  { key: "societies", minItems: 5, selector: 'section[aria-labelledby="biography-societies"] .content-item-list > li' },
  { key: "teaching", minItems: 8, selector: 'section[aria-labelledby="biography-teaching"] .content-item-list > li' },
  { key: "academic", minItems: 4, selector: 'section[aria-labelledby="biography-academic"] .content-item-list > li' },
  { key: "research", minItems: 5, selector: 'section[aria-labelledby="biography-research"] .content-item-list > li' },
  { key: "leadership", minItems: 6, selector: 'section[aria-labelledby="biography-leadership"] .content-item-list > li' },
  { key: "milestones", minItems: 4, selector: 'section[aria-labelledby="biography-milestones"] .content-item-list > li' },
];

const annualFiguresEn = [
  "150–200 / year",
  "40–50 / year",
  "90–150 / year",
  "20–30 / year",
  "5–8 / year",
  "250–350 / year",
  "200–250 / year",
  "250–350 / year",
];

const annualFiguresAr = [
  "150–200 / سنة",
  "40–50 / سنة",
  "90–150 / سنة",
  "20–30 / سنة",
  "5–8 / سنة",
  "250–350 / سنة",
  "200–250 / سنة",
  "250–350 / سنة",
];

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

async function expectExact(locator: Locator, expected: number, label: string) {
  const count = await locator.count();
  expect(count, `${label}: expected ${expected} items, received ${count}`).toBe(expected);
}

async function expectPopulatedSections(page: Page) {
  for (const section of listSections) {
    await expectAtLeast(page.locator(section.selector), section.minItems, section.key);
  }

  await expectAtLeast(page.locator('section[aria-labelledby="biography-overview"] .content-section__body > p'), 4, "overview");
  await expectExact(page.locator('section[aria-labelledby="biography-career-history"] .career-timeline > li'), 5, "careerHistory");
  await expectExact(page.locator('section[aria-labelledby="biography-clinical-expertise"] .content-card'), 10, "clinicalExpertise");
  await expectExact(page.locator('section[aria-labelledby="biography-annual-activity"] .content-card'), 8, "annualActivity");
  await expectAtLeast(page.locator('section[aria-labelledby="biography-external-links"] .content-link-list > div'), 3, "externalLinks");
}

async function expectAnnualFigures(page: Page, expected: readonly string[]) {
  const rendered = await page.locator(".content-card__metric").allInnerTexts();
  expect(rendered.map((value) => value.trim())).toEqual([...expected]);
}

test("Biography renders complete source-backed content in English", async ({ page }) => {
  await page.goto("/en/biography");
  await expect(page.locator("[data-biography-page]")).toBeVisible();

  await expectPopulatedSections(page);
  await expectAnnualFigures(page, annualFiguresEn);

  // Career history keeps every recorded clinical position and date.
  const timeline = await page.locator('section[aria-labelledby="biography-career-history"] .career-timeline > li').allInnerTexts();
  for (const period of ["2002–2006", "2006–2009", "2009–2012", "2012–2019", "2020–2022"]) {
    expect(timeline.some((entry) => entry.includes(period))).toBeTruthy();
  }

  // Research, study and publication material is present.
  const research = page.locator('section[aria-labelledby="biography-research"]');
  await expect(research).toContainText("ESAT");
  await expect(research).toContainText("Hospices Civils de Lyon");
  await expectExact(research.getByRole("link", { name: /pubmed\.ncbi\.nlm\.nih\.gov/ }), 1, "PubMed link");

  // External professional links are restored.
  const links = page.locator('section[aria-labelledby="biography-external-links"]');
  await expectExact(links.locator('a[href="https://www.linkedin.com/in/mohamed-aggour-1414a941"]'), 1, "LinkedIn link");
  await expect(links).toContainText("@Aggour");

  // ESMINT and PAIRS activity is represented.
  await expect(page.locator('section[aria-labelledby="biography-leadership"]')).toContainText("ESMINT");
  await expect(page.locator('section[aria-labelledby="biography-leadership"]')).toContainText("PAIRS");
  await expect(page.locator('section[aria-labelledby="biography-current-positions"]')).toContainText("St George");
  await expect(page.locator('section[aria-labelledby="biography-current-positions"]')).toContainText("CHC MontLégia");

  // Qualifications keep the recorded credential names.
  const qualifications = page.locator('section[aria-labelledby="biography-qualifications"]');
  for (const credential of ["French Board of Imaging", "AFS Diploma", "AFSA Diploma", "Fellow of EBNI"]) {
    await expect(qualifications).toContainText(credential);
  }

  // Teaching keeps the recorded international teaching activity.
  const teaching = page.locator('section[aria-labelledby="biography-teaching"]');
  for (const activity of ["ECMINT", "United Kingdom Neuroradiology Group", "MoMo-MEA", "ICE-DINR", "Zagreb", "PAIRS Neuro"]) {
    await expect(teaching).toContainText(activity);
  }

  await expectNoHorizontalOverflow(page);

  // Keyboard navigation reaches and activates the Biography navigation links.
  const conditionsCta = page.locator('.content-next-links a[href="/en/conditions"]');
  await conditionsCta.focus();
  await expect(conditionsCta).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/en\/conditions$/);
});

test("Biography renders the same source-backed content in Arabic", async ({ page }) => {
  await page.goto("/ar/biography");
  await expect(page.locator("[data-biography-page]")).toBeVisible();

  await expectPopulatedSections(page);
  await expectAnnualFigures(page, annualFiguresAr);

  const bodyText = await page.locator("body").innerText();
  expect(bodyText).toMatch(/[\u0600-\u06ff]/);

  await expect(page.locator('section[aria-labelledby="biography-qualifications"]')).toContainText("عين شمس");
  await expect(page.locator('section[aria-labelledby="biography-research"]')).toContainText("ESAT");
  await expect(page.locator('section[aria-labelledby="biography-leadership"]')).toContainText("ESMINT");
  await expect(page.locator('section[aria-labelledby="biography-clinical-expertise"]')).toContainText("تمددات شرايين الدماغ");

  await expectNoHorizontalOverflow(page);
});

test("Biography never renders internal governance metadata", async ({ page }) => {
  for (const locale of ["en", "ar"] as const) {
    await page.goto(`/${locale}/biography`);
    const bodyText = await page.locator("body").innerText();

    for (const pattern of internalLanguage) {
      expect(bodyText).not.toMatch(pattern);
    }

    // Internal review notes attached to content items must stay internal.
    await expect(page.getByText(/requires explicit approval/i)).toHaveCount(0);
    await expect(page.getByText(/preserved:/i)).toHaveCount(0);
  }
});

test("Biography stays free of horizontal overflow across the required width matrix", async ({ page }) => {
  test.setTimeout(180_000);

  for (const locale of ["en", "ar"] as const) {
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
