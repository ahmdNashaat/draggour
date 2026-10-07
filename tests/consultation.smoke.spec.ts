import { expect, test, type Page } from "@playwright/test";

import { isConsultationWhatsappConfigured, whatsappPlaceholder } from "../content/whatsapp";

const locales = ["en", "ar"] as const;
const viewportWidths = [320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560];
const whatsappConfigured = isConsultationWhatsappConfigured();
// The pending CTA only exists outside production (see D-036); the suite runs on `pnpm dev`.
const productionBuild = process.env.NODE_ENV === "production";

const pixels = (value: string) => Number.parseFloat(value);

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

test("the consultation page is a WhatsApp hand-off and never a form", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/remote-consultation`);
    const main = page.locator("main[data-consultation-page]");

    await expect(main).toBeVisible();
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.locator("main input, main textarea, main select")).toHaveCount(0);

    const cta = page.locator("[data-consultation-whatsapp-cta]");

    if (whatsappConfigured) {
      await expect(cta).toHaveCount(1);
      await expect(cta).toHaveAttribute("href", /^https:\/\/wa\.me\/\d{7,15}\?text=/);
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", /noopener/);
      await expect(cta).toHaveAttribute("rel", /noreferrer/);
      await expect(cta).toContainText(locale === "en" ? "opens in a new tab" : "يفتح في تبويب جديد");
      await expect(page.locator("[data-consultation-whatsapp-pending]")).toHaveCount(0);
      await expect(main).not.toContainText(whatsappPlaceholder);

      const href = (await cta.getAttribute("href")) ?? "";
      expect(decodeURIComponent(href)).toContain(locale === "en" ? "Dr. Mohamed Aggour" : "دكتور محمد عجور");
    } else if (productionBuild) {
      // The page never ships a dead button: in production the CTA is omitted entirely.
      await expect(cta).toHaveCount(0);
      await expect(page.locator("[data-consultation-whatsapp-pending]")).toHaveCount(0);
      await expect(main).not.toContainText(whatsappPlaceholder);
    } else {
      await expect(cta).toHaveCount(1);
      await expect(cta).toBeDisabled();
      await expect(page.locator("[data-consultation-whatsapp-pending]")).toBeVisible();
      await expect(main).toContainText(whatsappPlaceholder);
    }

    await expect(page.locator(`main a[href="/${locale}/legal"]`)).toHaveCount(1);
  }
});

test("emergency guidance is a permanent strip above the content, not a card", async ({ page }) => {
  const phrases = {
    en: ["This website is not an emergency service.", "Contact local emergency services.", "Attend the nearest hospital."],
    ar: ["هذا الموقع ليس خدمة طوارئ.", "اتصل بخدمات الطوارئ المحلية.", "توجه إلى أقرب مستشفى."],
  } as const;

  for (const locale of locales) {
    await page.goto(`/${locale}/remote-consultation`);
    const emergency = page.locator("[data-consultation-emergency]");

    await expect(emergency).toHaveCount(1);
    await expect(emergency).toBeVisible();
    for (const phrase of phrases[locale]) await expect(emergency).toContainText(phrase);

    // One quiet line, no leftover alert card.
    await expect(page.locator(".consultation-terminal, .consultation-alert__badge")).toHaveCount(0);

    const order = await page.evaluate(() =>
      [...document.querySelectorAll("main > *")].map((element) => [...element.classList].join(" ")),
    );
    const position = (name: string) => order.findIndex((classes) => classes.split(" ").includes(name));
    expect(position("consultation-emergency")).toBeGreaterThan(position("consultation-hero"));
    expect(position("consultation-emergency")).toBeLessThan(position("consultation-shell"));

    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(emergency).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }

    await page.setViewportSize({ width: 1280, height: 900 });
  }
});

test("the layout keeps one hierarchy: hero, two equal columns, three numbered steps", async ({ page }) => {
  for (const locale of locales) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/remote-consultation`);

    const type = await page.evaluate(() => {
      const style = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const computed = getComputedStyle(element);
        return { fontSize: computed.fontSize, lineHeight: computed.lineHeight };
      };
      const card = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const computed = getComputedStyle(element);
        return { border: computed.borderTopWidth, radius: computed.borderRadius, shadow: computed.boxShadow };
      };
      const box = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) };
      };

      return {
        h1: style(".consultation-hero h1"),
        h2: style(".consultation-panel h2"),
        intro: style(".consultation-panel__intro"),
        note: style(".consultation-panel__note"),
        step: style(".consultation-flow__list li"),
        cta: box("[data-consultation-whatsapp-cta]"),
        panelBox: box(".consultation-panel"),
        flowBox: box(".consultation-flow"),
        panelCard: card(".consultation-panel"),
        flowCard: card(".consultation-flow"),
        columns: getComputedStyle(document.querySelector(".consultation-shell") as Element).gridTemplateColumns,
        steps: document.querySelectorAll(".consultation-flow__list li").length,
        numbers: [...document.querySelectorAll(".consultation-flow__number")].map((element) => {
          const computed = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return { text: element.textContent, radius: computed.borderRadius, size: Math.round(rect.width) };
        }),
      };
    });

    // H1 clearly leads the scale, headings breathe, reading text stays legible.
    expect(pixels(type.h1!.fontSize)).toBeGreaterThan(pixels(type.h2!.fontSize) * 1.4);
    expect(pixels(type.h1!.lineHeight) / pixels(type.h1!.fontSize)).toBeGreaterThanOrEqual(1.15);
    expect(pixels(type.h2!.lineHeight) / pixels(type.h2!.fontSize)).toBeGreaterThanOrEqual(1.15);
    expect(pixels(type.intro!.fontSize)).toBeGreaterThanOrEqual(16);
    expect(pixels(type.note!.fontSize)).toBeGreaterThanOrEqual(14);
    expect(pixels(type.step!.lineHeight) / pixels(type.step!.fontSize)).toBeGreaterThanOrEqual(1.5);
    expect(type.cta!.height).toBeGreaterThanOrEqual(48);

    // Two columns of the same height and the same card treatment.
    expect(type.columns.split(" ").length).toBe(2);
    expect(type.panelBox!.height).toBe(type.flowBox!.height);
    expect(type.panelCard).toEqual(type.flowCard);

    // The primary column leads on the right in Arabic and on the left in English.
    if (locale === "ar") expect(type.panelBox!.left).toBeGreaterThan(type.flowBox!.left);
    else expect(type.panelBox!.left).toBeLessThan(type.flowBox!.left);

    // Exactly three steps, numbered 01–03 inside circles.
    expect(type.steps).toBe(3);
    expect(type.numbers.map((number) => number.text)).toEqual(["01", "02", "03"]);
    for (const number of type.numbers) {
      expect(pixels(number.radius)).toBeGreaterThanOrEqual(900);
      expect(number.size).toBeGreaterThanOrEqual(32);
    }

    // Tablet stays a single column.
    await page.setViewportSize({ width: 768, height: 900 });
    await expect(page.locator(".consultation-shell")).toHaveCSS("grid-template-columns", /^[\d.]+px$/);

    // The "collects nothing" line and the not-a-confirmation line each appear once.
    const text = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    const collect = locale === "en" ? /collects nothing/g : /لا يجمع هذا الموقع أي بيانات/g;
    const confirmation = locale === "en" ? /does not confirm an appointment/g : /لا تُؤكد موعداً/g;
    expect(text.match(collect) ?? []).toHaveLength(1);
    expect(text.match(confirmation) ?? []).toHaveLength(1);
  }

  await page.setViewportSize({ width: 1280, height: 900 });
});

test("no other page links straight to WhatsApp, so the consultation page stays the single hand-off", async ({ page }) => {
  for (const path of ["", "/biography", "/conditions", "/e-learning", "/contact", "/legal"]) {
    await page.goto(`/en${path}`);
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  }
});

test("loading the consultation page sends no request to WhatsApp or any third party", async ({ page }) => {
  const externalRequests: string[] = [];

  page.on("request", (request) => {
    const hostname = new URL(request.url()).hostname;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") externalRequests.push(request.url());
  });

  for (const locale of locales) await page.goto(`/${locale}/remote-consultation`);

  expect(externalRequests).toEqual([]);
});

test("remote consultation stays usable in EN/AR across the required viewport matrix", async ({ page }) => {
  // 28 locale × width page loads on a cold dev server need more than the
  // default 30s budget, like the other viewport sweeps in this suite.
  test.setTimeout(180_000);

  for (const locale of locales) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/remote-consultation`);
      await expect(page.locator("main[data-consultation-page]")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      await expect(page.locator("[data-consultation-whatsapp-cta]")).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  }

  // The primary action is reachable without scrolling on a 390×844 phone.
  for (const locale of locales) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/remote-consultation`);
    const ctaBox = await page.locator("[data-consultation-whatsapp-cta]").boundingBox();
    expect(ctaBox, `${locale} CTA box`).not.toBeNull();
    expect(ctaBox!.y).toBeGreaterThanOrEqual(0);
    expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(844);
    expect(ctaBox!.width).toBeGreaterThanOrEqual(300);
  }

  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/en/remote-consultation");
  await expectNoHorizontalOverflow(page);
  await expect(page.locator("[data-consultation-whatsapp-cta]")).toBeVisible();
  await expect(page.locator("[data-consultation-emergency]")).toBeVisible();
});
