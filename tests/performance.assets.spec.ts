import { expect, test } from "@playwright/test";

test("profile imagery reserves its aspect ratio and declares responsive source sizes", async ({ page }) => {
  for (const locale of ["en", "ar"] as const) {
    for (const route of ["", "/biography"] as const) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/${locale}${route}`);

      const portrait = route === "" ? page.locator(".home-hero__portrait-image") : page.locator(".content-hero__portrait");
      await expect(portrait).toHaveAttribute("width", "1024");
      await expect(portrait).toHaveAttribute("height", "1536");
      await expect(portrait).toHaveAttribute("sizes", /max-width/);
      await expect(portrait).not.toHaveAttribute("loading", "lazy");

      const hasResponsivePreload = await page.locator('link[rel="preload"][as="image"]').evaluateAll((links) =>
        links.some((link) => link.getAttribute("imagesrcset")?.includes("dr-mohamed-aggour.png")),
      );
      expect(hasResponsivePreload).toBe(true);

      const unreservedImages = await page.locator("img").evaluateAll((images) =>
        images.filter((image) => !image.hasAttribute("width") || !image.hasAttribute("height")).length,
      );
      expect(unreservedImages).toBe(0);
    }
  }
});

test("below-fold footer mark is lazy loaded at its rendered size", async ({ page }) => {
  await page.goto("/en/conditions");
  const mark = page.locator(".brand__monogram");
  await expect(mark).toHaveAttribute("loading", "lazy");
  await expect(mark).toHaveAttribute("width", "581");
  await expect(mark).toHaveAttribute("height", "259");
  await expect(mark).toHaveAttribute("sizes", "3.25rem");
});

test("English pages do not fetch Arabic fonts as preloads and pages make no third-party requests", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol.startsWith("http") && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      externalRequests.push(url.href);
    }
  });

  await page.goto("/en");
  const fonts = await page.locator('link[rel="preload"][as="font"]').count();

  expect(fonts).toBeLessThanOrEqual(4);
  expect(externalRequests).toEqual([]);
});

test("reduced-motion preferences disable smooth scrolling and visible transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const motion = await page.locator(".button").first().evaluate((button) => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: getComputedStyle(button).transitionDuration,
  }));

  expect(motion.scrollBehavior).toBe("auto");
  expect(Number.parseFloat(motion.transitionDuration)).toBeLessThanOrEqual(0.00001);
});
