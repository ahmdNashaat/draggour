import { AxeBuilder } from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// UI/UX committee A2: the project had no automated accessibility coverage.
// This suite is the WCAG 2.1 AA gate — axe scans plus the keyboard behaviours
// axe cannot see (focus ring, menu focus trap, Escape restoring focus).

const scanRoutes = [
  "",
  "/biography",
  "/conditions",
  "/conditions/stroke-thrombectomy",
  "/e-learning",
  "/remote-consultation",
  "/contact",
  "/legal",
] as const;

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

type AxeScanResult = Awaited<ReturnType<AxeBuilder["analyze"]>>;

function violationReport({ violations }: AxeScanResult): string[] {
  return violations.map(
    (violation) =>
      `${violation.id} (${violation.impact ?? "unknown"}): ${violation.help} — ` +
      violation.nodes.map((node) => node.target.join(" ")).join(" | "),
  );
}

async function expectNoViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(violationReport(results), `${label}: axe must report zero WCAG 2.1 AA violations`).toEqual([]);
}

for (const locale of ["en", "ar"] as const) {
  test(`axe: ${locale} pages pass WCAG 2.1 AA`, async ({ page }) => {
    // Eight dev navigations on cold compilation exceed the default budget
    // (same structural reason as condition.content.spec).
    test.setTimeout(180_000);

    for (const route of scanRoutes) {
      await page.goto(`/${locale}${route}`);
      await expect(page.locator("main")).toBeVisible();
      await expectNoViolations(page, `/${locale}${route || ""}`);
    }
  });
}

test("axe: the open mobile menu passes WCAG 2.1 AA", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menuButton = page.locator(".menu-toggle");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#primary-navigation")).toBeVisible();
  await expectNoViolations(page, "/en with the menu open");
});

test("keyboard: skip link, focus ring, menu focus trap, Escape", async ({ page }) => {
  test.setTimeout(120_000);

  // The skip link is the first tab stop and reveals itself on focus.
  await page.goto("/en");
  await page.keyboard.press("Tab");
  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  const outlineWidth = await skipLink.evaluate((element) => getComputedStyle(element).outlineWidth);
  expect(parseFloat(outlineWidth), "the skip link must show the global focus ring").toBeGreaterThanOrEqual(2);

  // While the menu is open, Tab and Shift+Tab cycle inside the header only.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menuButton = page.locator(".menu-toggle");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#primary-navigation a").first()).toBeFocused();

  const focusIsInsideHeader = () =>
    page.evaluate(() => {
      const header = document.querySelector(".site-header");
      return Boolean(header && document.activeElement && header.contains(document.activeElement));
    });

  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press("Tab");
    expect(await focusIsInsideHeader(), `Tab press ${step + 1} escaped the open menu`).toBe(true);
  }
  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press("Shift+Tab");
    expect(await focusIsInsideHeader(), `Shift+Tab press ${step + 1} escaped the open menu`).toBe(true);
  }

  // Escape closes the menu and hands focus back to the toggle.
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();
});
