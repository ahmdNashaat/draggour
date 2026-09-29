import { expect, test, type Page } from "@playwright/test";

const viewportWidths = [320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560];
const professionalRoutes = [
  { path: "e-learning", marker: "data-e-learning-page" },
  { path: "contact", marker: "data-contact-page" },
  { path: "legal", marker: "data-legal-page" },
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

test("localized homepage renders without horizontal overflow", async ({ page }) => {
  for (const locale of ["en", "ar"]) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}`);
      await expect(page.locator("[data-homepage]")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const ctaName = locale === "en" ? "Request a remote consultation" : "طلب استشارة عن بُعد";
      await expect(page.locator("main a.button--primary")).toBeVisible();
      void ctaName;
      await expect(page.locator("main a.button--primary")).toHaveAttribute("href", `/${locale}/remote-consultation`);
      if (locale === "ar") {
        await expect(page.locator("body")).toContainText(/[\u0600-\u06ff]/);
      }
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      await expect(page.locator(".brand__logo")).toHaveAttribute("src", /logo-primary/);
      await expect(page.locator(".home-hero__portrait-image")).toHaveAttribute("src", /dr-mohamed-aggour/);
      await expect(page.locator(".home-hero__portrait-image")).toHaveJSProperty("complete", true);
      const portraitWidth = await page.locator(".home-hero__portrait-image").evaluate((image) => (image as HTMLImageElement).naturalWidth);
      expect(portraitWidth).toBeGreaterThan(0);
      await expect(page.getByText("Professional Activities & Media", { exact: true })).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
    }
  }

  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/en");
  await expect(page.locator("[data-homepage]")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("mobile navigation and language switching are usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  const menuButton = page.locator(".menu-toggle");
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("link", { name: "Request a remote consultation", exact: true })).toHaveAttribute(
    "href",
    "/en/remote-consultation",
  );

  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#primary-navigation")).toBeVisible();
  await expect(page.locator("#primary-navigation").getByRole("link", { name: "Biography", exact: true })).toHaveAttribute(
    "href",
    "/en/biography",
  );
  await expect(page.locator("#primary-navigation").getByRole("link", { name: "Contact", exact: true })).toHaveAttribute(
    "href",
    "/en/contact",
  );

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await page.getByRole("link", { name: "AR", exact: true }).click();
  await expect(page).toHaveURL(/\/ar$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("Biography and six Conditions routes render professional content", async ({ page }) => {
  test.setTimeout(120_000);

  const conditionRoutes = [
    "brain-aneurysm",
    "stroke",
    "avm",
    "carotid-stenosis",
    "venous-sinus-disorders",
    "chronic-subdural-haematoma",
  ];

  for (const locale of ["en", "ar"]) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/biography`);
      await expect(page.locator("[data-biography-page]")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      await expectNoHorizontalOverflow(page);

      await page.goto(`/${locale}/conditions`);
      await expect(page.locator("[data-conditions-page]")).toBeVisible();
      await expect(page.locator(".condition-route-card")).toHaveCount(6);
      await expectNoHorizontalOverflow(page);

      if (locale === "ar") {
        await expect(page.locator("body")).toContainText(/[\u0600-\u06ff]/);
      }
    }

    for (const slug of conditionRoutes) {
      for (const width of viewportWidths) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(`/${locale}/conditions/${slug}`);
        await expect(page.locator(`[data-condition-page="${slug}"]`)).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.locator('main a.button--primary[href$="/remote-consultation"]')).toBeVisible();
        await expectNoHorizontalOverflow(page);
      }
    }
  }
});

test("approved route skeletons and French placeholders render correctly", async ({ page }) => {
  const iconResponse = await page.request.get("/icon.png");
  expect(iconResponse.ok()).toBeTruthy();

  await page.goto("/fr");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute("content", /noindex/);
  await expect(page.locator("[data-placeholder-page]")).toBeVisible();

  await page.goto("/fr/biography");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute("content", /noindex/);
  await expect(page.locator("[data-placeholder-page]")).toBeVisible();
});

test("professional, educational, contact and legal pages remain localized and responsive", async ({ page }) => {
  test.setTimeout(180_000);
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });

  for (const locale of ["en", "ar"] as const) {
    for (const route of professionalRoutes) {
      for (const width of viewportWidths) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(`/${locale}/${route.path}`);
        await expect(page.locator(`[${route.marker}]`)).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
        await expectNoHorizontalOverflow(page);

        if (locale === "ar") {
          await expect(page.locator("body")).toContainText(/[\u0600-\u06ff]/);
        }

        await expect(page.getByText("Professional Activities & Media", { exact: true })).toHaveCount(0);
      }
    }
  }

  await page.goto("/en/e-learning");
  await expect(page.locator('a[href="https://www.youtube.com/"]')).toBeVisible();
  await expect(page.getByRole("link", { name: "Watch on YouTube", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Read Biography", exact: true })).toHaveAttribute("href", "/en/biography");

  await page.goto("/en/contact");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);

  const mediaResponse = await page.request.get("/en/media");
  expect(mediaResponse?.status()).toBe(404);
  const activitiesResponse = await page.request.get("/en/professional-activities");
  expect(activitiesResponse?.status()).toBe(404);

  await page.goto("/fr/e-learning");
  await expect(page.locator("[data-placeholder-page]")).toBeVisible();
  await expect(page.locator("meta[name=robots]")).toHaveAttribute("content", /noindex/);
  expect(runtimeErrors).toEqual([]);
});

test("rendered EN and AR pages exclude internal governance language", async ({ page }) => {
  const routes = [
    "",
    "/biography",
    "/conditions",
    "/conditions/brain-aneurysm",
    "/conditions/stroke",
    "/conditions/avm",
    "/conditions/carotid-stenosis",
    "/conditions/venous-sinus-disorders",
    "/conditions/chronic-subdural-haematoma",
    "/e-learning",
    "/contact",
    "/legal",
    "/remote-consultation",
  ];
  const internalLanguage = [
    /controlled prototype/i,
    /source-derived/i,
    /source of truth/i,
    /approval required/i,
    /pending approval/i,
    /awaiting approval/i,
    /draft(?:\s|—|-)/i,
    /CV §/i,
    /نموذج أولي/,
    /مسودة/,
    /في انتظار الاعتماد/,
    /السيرة الذاتية §/,
  ];

  for (const locale of ["en", "ar"] as const) {
    for (const route of routes) {
      await page.goto(`/${locale}${route}`);
      const bodyText = await page.locator("body").innerText();
      for (const pattern of internalLanguage) {
        expect(bodyText).not.toMatch(pattern);
      }
    }
  }
});
