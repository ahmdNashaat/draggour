import { expect, test } from "@playwright/test";

import { patientConditions } from "../content/patient-conditions";
import {
  getLearningLinks,
  selectLearningLinks,
  type LearningLink,
} from "../content/learning-links";

const locales = ["en", "ar"] as const;

test("all ten condition pages keep the supplied copy, review label, disclaimer and return link", async ({ page }) => {
  for (const locale of locales) {
    const headings: string[] = [];

    for (const condition of patientConditions) {
      const route = `/${locale}/conditions/${condition.slug}`;
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main[data-condition-page]")).toHaveAttribute("data-condition-page", condition.slug);
      await expect(page.locator(".condition-reviewed-by")).toHaveText(locale === "en"
        ? "Reviewed by Dr. Mohamed Aggour آ· Last reviewed 4 October 2026"
        : "ط±ط§ط¬ط¹ظ‡ ط¯. ظ…ط­ظ…ط¯ ط¹ط¬ظˆط± آ· ط¢ط®ط± ظ…ط±ط§ط¬ط¹ط© 4 ط£ظƒطھظˆط¨ط± 2026");
      await expect(page.locator(".condition-paragraph").first()).toBeVisible();
      await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(2);
      await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/legal"]`)).toHaveCount(1);

      const heading = (await page.locator("h1").textContent())?.trim() ?? "";
      headings.push(heading);
      expect(heading).toBe(locale === "en" ? condition.en.title : condition.ar.title);
      const pageText = await page.locator("main").innerText();
      expect(pageText).toContain(locale === "en"
        ? "This page explains a condition in general terms. It is not advice about your own case"
        : "طھط´ط±ط­ ظ‡ط°ظ‡ ط§ظ„طµظپط­ط© ط§ظ„ط­ط§ظ„ط© ط¨ط´ظƒظ„ ط¹ط§ظ…طŒ ظˆظ„ظٹط³طھ ظ†طµظٹط­ط© ط·ط¨ظٹط© ظ„ط­ط§ظ„طھظƒ ط§ظ„ط®ط§طµط©");
      expect(pageText).not.toContain("ظٹظڈط¤ظƒظژظ‘ط¯ ظ…ظƒط§ظ† ط¥ط¬ط±ط§ط، ط§ظ„ط¯ظƒطھظˆط± ط¹ط¬ظˆط±");

      // Every link names itself. The only names longer than the guard are the
      // "other conditions" links, whose text is the approved condition title
      // itself (up to 80 chars after D-049: AR AVM title is 77 chars) --
      const conditionTitles = new Set(patientConditions.map((item) => item[locale].title));
      const anchors = (await page.locator("main a[href]").allTextContents())
        .map((text) => text.trim())
        .filter((text) => !conditionTitles.has(text));
      expect(anchors.every((text) => text.length > 0 && text.length < 80)).toBe(true);
      expect(anchors.join(" ")).not.toMatch(/best|leading|world.?class|number one|#1/i);
    }

    expect(new Set(headings).size).toBe(10);
  }
});

test("stroke guidance in both languages directs urgent cases away from the website", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/conditions/stroke-thrombectomy`);
    const text = await page.locator("main").innerText();
    if (locale === "en") {
      expect(text).toContain("call emergency services now. Do not use this website or send a message.");
    } else {
      expect(text).toContain("ظپط§طھطµظ„ ط¨ط§ظ„ط¥ط³ط¹ط§ظپ ظپظˆط±ظ‹ط§. ظ„ط§ طھط³طھط®ط¯ظ… ظ‡ط°ط§ ط§ظ„ظ…ظˆظ‚ط¹ ظˆظ„ط§ طھط±ط³ظ„ ط±ط³ط§ظ„ط©.");
    }
  }
});

test("legacy condition paths route to the matching document slug in both locales", async ({ page }) => {
  const aliases = [
    ["stroke", "stroke-thrombectomy"],
    ["carotid-stenosis", "carotid-intracranial-stenting"],
    ["venous-sinus-disorders", "venous-sinus-stenting"],
  ] as const;

  for (const locale of locales) {
    for (const [oldSlug, newSlug] of aliases) {
      await page.goto(`/${locale}/conditions/${oldSlug}`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/conditions/${newSlug}$`));
      await expect(page.locator(`main[data-condition-page="${newSlug}"]`)).toBeVisible();
    }
  }
});

test("E-learning renders the learning links with safe external anchors and no teaching list", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/e-learning`);
    await expect(page.locator("h1")).toHaveText(locale === "en" ? "E-learning for Physicians" : "ط§ظ„طھط¹ظ„ظٹظ… ط§ظ„ط·ط¨ظٹ ظ„ظ„ط£ط·ط¨ط§ط،");

    // Removed from this page: the hero index number and the teaching list.
    await expect(page.locator(".content-hero__index")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Teaching and education", exact: true })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "ط§ظ„طھط¹ظ„ظٹظ… ظˆط§ظ„طھط¯ط±ظٹط¨", exact: true })).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: locale === "en" ? "Learning links" : "ط±ظˆط§ط¨ط· ط§ظ„طھط¹ظ„ظ…", exact: true }),
    ).toBeVisible();

    const anchors = page.locator("main .learning-link__anchor");
    const rendered = await anchors.evaluateAll((items) =>
      items.map((anchor) => ({
        href: anchor.getAttribute("href") ?? "",
        target: anchor.getAttribute("target"),
        rel: anchor.getAttribute("rel") ?? "",
        text: anchor.textContent ?? "",
      })),
    );
    expect(rendered.length).toBeGreaterThan(0);

    for (const link of rendered) {
      const url = new URL(link.href);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).not.toMatch(/localhost|vercel\.app/i);
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
      expect(link.text).toMatch(locale === "en" ? /opens in a new tab/ : /ظٹظپطھط­ ظپظٹ طھط¨ظˆظٹط¨ ط¬ط¯ظٹط¯/);
    }

    // Everything published in content/learning-links.ts reaches this page.
    const expected = getLearningLinks(locale).map((link) => link.url);
    expect([...rendered.map((link) => link.href)].sort()).toEqual([...expected].sort());

    await expect(page.locator(".learning-link--primary")).toHaveCount(1);
    await expect(page.locator("main a[href$='/biography']")).toHaveCount(1);
    await expect(page.locator("main a[href$='/remote-consultation']")).toHaveCount(1);
  }
});

test("learning links drop entries without a URL and localize from a single content file", () => {
  const sample: readonly LearningLink[] = [
    {
      id: "visible",
      platform: "youtube",
      url: " https://www.youtube.com/@channel ",
      title: { en: "YouTube Channel", ar: "ظ‚ظ†ط§ط© ظٹظˆطھظٹظˆط¨" },
      description: { en: "English line", ar: "ط³ط·ط± ط¹ط±ط¨ظٹ" },
      primary: true,
    },
    {
      id: "hidden",
      platform: "other",
      url: "   ",
      title: { en: "Hidden entry", ar: "ط¹ظ†طµط± ظ…ط®ظپظٹ" },
      description: { en: "Hidden line", ar: "ط³ط·ط± ظ…ط®ظپظٹ" },
      primary: false,
    },
  ];

  const english = selectLearningLinks(sample, "en");
  const arabic = selectLearningLinks(sample, "ar");

  // An empty URL never reaches the page, so no dead link can be published.
  expect(english.map((link) => link.id)).toEqual(["visible"]);
  expect(arabic.map((link) => link.id)).toEqual(["visible"]);
  expect(english[0].url).toBe("https://www.youtube.com/@channel");
  expect(english[0].primary).toBe(true);
  // One entry carries both locales; the page picks the right one.
  expect(english[0].title).toBe("YouTube Channel");
  expect(arabic[0].title).toBe("ظ‚ظ†ط§ط© ظٹظˆطھظٹظˆط¨");
  expect(arabic[0].description).toBe("ط³ط·ط± ط¹ط±ط¨ظٹ");
});

test("medical disclaimers and consultation limits are visible, with no governance notes rendered", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/legal`);
    const legalText = await page.locator("main").innerText();
    expect(legalText).toMatch(locale === "en" ? /does not replace an individual consultation/i : /ظ„ط§ طھط­ظ„ ظ…ط­ظ„ ط§ط³طھط´ط§ط±ط© ظپط±ط¯ظٹط©/);
    expect(legalText).toMatch(locale === "en" ? /not an emergency service/i : /ظ„ظٹط³ ط®ط¯ظ…ط© ط·ظˆط§ط±ط¦/);

    await page.goto(`/${locale}/remote-consultation`);
    const consultation = page.locator("main");
    const consultationText = await consultation.innerText();
    expect(consultationText).toMatch(locale === "en" ? /collects nothing/i : /ظ„ط§ ظٹط¬ظ…ط¹ ظ‡ط°ط§ ط§ظ„ظ…ظˆظ‚ط¹ ط£ظٹ ط¨ظٹط§ظ†ط§طھ/);
    expect(consultationText).toMatch(locale === "en" ? /does not confirm an appointment/i : /ظ„ط§ طھظڈط¤ظƒط¯ ظ…ظˆط¹ط¯ط§ظ‹/);
    expect(consultationText).toMatch(locale === "en" ? /not an emergency service/i : /ظ„ظٹط³ ط®ط¯ظ…ط© ط·ظˆط§ط±ط¦/);
    await expect(page.locator(`main a[href="/${locale}/legal"]`)).toHaveCount(1);
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.locator("main input, main textarea")).toHaveCount(0);

    for (const path of ["", "/biography", "/conditions", "/conditions/stroke-thrombectomy", "/e-learning", "/remote-consultation", "/contact", "/legal"]) {
      await page.goto(`/${locale}${path}`);
      const visibleText = await page.locator("body").innerText();
      expect(visibleText).not.toMatch(/DOCTOR APPROVAL REQUIRED|Publish:\s*NO|CF[1-9]|T[123]\s*\/\s*Q/i);
    }
  }
});
