import { expect, test } from "@playwright/test";

import { LOGO_NAME, LOGO_TAGLINE_LINES, LOGO_STANDALONE_ALT, logoNameFor } from "../components/site/Logo";

const locales = ["en", "ar"] as const;
const homeLabel: Record<(typeof locales)[number], string> = {
  en: "Home",
  ar: "الرئيسية",
};

for (const locale of locales) {
  test(`${locale} shell uses the shared logo lockup with a localized header wordmark`, async ({ page }) => {
    await page.goto(`/${locale}`);

    // The visible wordmark follows the page language: AGGOUR on EN, عجـــور on AR.
    const wordmark = logoNameFor(locale);

    // Header: horizontal, colour emblem + live wordmark, localized link name.
    const headerLink = page.locator("header .brand");
    await expect(headerLink).toHaveAttribute("href", `/${locale}`);
    await expect(headerLink).toHaveAttribute("aria-label", `${homeLabel[locale]} - ${wordmark}`);

    const headerLockup = page.locator("header .logo--horizontal.logo--color");
    await expect(headerLockup).toHaveAttribute("lang", "en");
    await expect(headerLockup).toHaveAttribute("dir", "ltr");

    const headerEmblem = page.locator("header .logo__emblem");
    await expect(headerEmblem).toHaveAttribute("src", /aggour-emblem-flat\.svg/);
    await expect(headerEmblem).toHaveAttribute("alt", "");

    // The name span carries its own language/direction so the Arabic wordmark
    // is announced and shaped as Arabic inside the English lockup box.
    const headerName = page.locator("header .logo__name");
    await expect(headerName).toHaveText(wordmark);
    await expect(headerName).toHaveAttribute("lang", locale === "ar" ? "ar" : "en");
    await expect(headerName).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");

    // Footer: stacked, light emblem, name + tagline — the footer name stays
    // English in every locale (the localization is a header-only decision).
    const footerLockup = page.locator("footer .logo--stacked.logo--light");
    await expect(footerLockup).toHaveAttribute("lang", "en");
    await expect(footerLockup).toHaveAttribute("dir", "ltr");
    await expect(page.locator("footer .logo__emblem")).toHaveAttribute("src", /aggour-emblem-mono-light\.svg/);
    await expect(page.locator("footer .logo__emblem")).toHaveAttribute("alt", "");
    await expect(page.locator("footer .logo__name")).toHaveText(LOGO_NAME);
    await expect(page.locator("footer .logo__name")).toHaveAttribute("lang", "en");
    // The stacked tagline mirrors the hero: one segment per line, the two
    // lines still reading as one sentence to assistive tech.
    await expect(page.locator("footer .logo__tagline")).toHaveText(LOGO_TAGLINE_LINES.join(" "));
    await expect(page.locator("footer .logo__tagline-line")).toHaveCount(2);
    await expect(page.locator("footer .logo__name")).toHaveCount(1);
  });
}

test("the standalone emblem keeps its English alt in both locales", () => {
  expect(LOGO_STANDALONE_ALT).toBe("AGGOUR - Interventional Neuroradiology");
});

test("the favicon set is rendered from the header emblem artwork", async ({ page }) => {
  const [iconSvg, emblem] = await Promise.all([
    page.request.get("/icon.svg"),
    page.request.get("/brand/aggour-emblem-flat.svg"),
  ]);
  expect(iconSvg.status()).toBe(200);
  expect(emblem.status()).toBe(200);
  // The SVG favicon IS the header emblem, byte for byte (D-044).
  expect(await iconSvg.text()).toBe(await emblem.text());

  // favicon.ico carries the same mark at the classic icon sizes.
  const ico = await (await page.request.get("/favicon.ico")).body();
  expect(ico.readUInt16LE(0)).toBe(0);
  expect(ico.readUInt16LE(2)).toBe(1);
  const icoSizes = [16, 32, 48];
  expect(ico.readUInt16LE(4)).toBe(icoSizes.length);
  for (const [index, size] of icoSizes.entries()) {
    const at = 6 + index * 16;
    expect(ico.readUInt8(at), `ICO entry ${index} width`).toBe(size);
    expect(ico.readUInt8(at + 1), `ICO entry ${index} height`).toBe(size);
    expect(ico.readUInt16LE(at + 6), `ICO entry ${index} bit count`).toBe(32);
  }

  // The raster icons are square canvases at their documented sizes.
  for (const [path, size] of [
    ["/icon.png", 48],
    ["/apple-icon.png", 180],
  ] as const) {
    const png = await (await page.request.get(path)).body();
    expect(png.readUInt32BE(16), `${path} width`).toBe(size);
    expect(png.readUInt32BE(20), `${path} height`).toBe(size);
  }
});

test("the home hero carries the original artwork at 280px or wider", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");

  const heroLogo = page.locator(".home-hero__logo");
  await expect(heroLogo).toHaveAttribute("src", /aggour-brain-and-spine-emblem\.png/);
  await expect(heroLogo).toBeVisible();
  const renderedWidth = await heroLogo.evaluate((image) => (image as HTMLImageElement).getBoundingClientRect().width);
  expect(renderedWidth).toBeGreaterThanOrEqual(280);
});

test("retired logo, favicon and social assets are no longer served", async ({ page }) => {
  const retired = [
    "/brand/logo-primary.png",
    "/brand/logo-monogram.png",
  ];

  for (const path of retired) {
    const response = await page.request.get(path);
    expect(response.status(), `${path} should be gone`).toBe(404);
  }

  const replacements = [
    "/favicon.ico",
    "/icon.svg",
    "/apple-icon.png",
    "/brand/aggour-og-1200x630.png",
    "/brand/aggour-emblem-flat-1024.png",
  ];

  for (const path of replacements) {
    const response = await page.request.get(path);
    expect(response.status(), `${path} should be served`).toBe(200);
  }

  const ogImage = await page.request.get("/brand/aggour-og-1200x630.png");
  const bytes = await ogImage.body();
  // PNG signature plus the IHDR width/height that follow it.
  expect(bytes.readUInt32BE(16)).toBe(1200);
  expect(bytes.readUInt32BE(20)).toBe(630);
});
