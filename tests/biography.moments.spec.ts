import { expect, test, type Page } from "@playwright/test";

import { biographyContent, biographyContentArabic, type BiographyMoments } from "../content/biography";
import { placeholderMomentsPair } from "../content/biography-moments-placeholder";
import { collectBiographyMoments, validateBiographyMoments } from "../lib/biography-moments";

import { biographyMomentsFixture, fixtureCounts, type FixtureCount } from "./fixtures/biography-moments";
import { devPreviewServed } from "./helpers/server-mode";

type Locale = "en" | "ar";

const locales: readonly Locale[] = ["en", "ar"];
const widths = [320, 390, 768, 1024, 1440] as const;

function pair(en?: BiographyMoments, ar?: BiographyMoments) {
  return { en, ar };
}

function gallery(count: FixtureCount, locale: Locale = "en"): BiographyMoments {
  return biographyMomentsFixture(locale, count);
}

/** An extra, seventh photo: `moments` only ever holds six. */
function tooMany(locale: Locale): BiographyMoments {
  const base = gallery(6, locale);
  return { ...base, moments: [...base.moments, base.moments[0]] };
}

async function overflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

/**
 * The same check, scoped to the gallery. The site header nav itself overflows
 * the viewport at 200% root size (a pre-existing, page-wide behaviour that
 * shows up on every route with or without the gallery), so the zoom test holds
 * the gallery to the stronger local promise: nothing inside it leaves the
 * viewport.
 */
async function galleryOverflow(page: Page) {
  const worst = await page.evaluate(() => {
    const root = document.documentElement;
    const gallery = document.querySelector("section.bio-moments");
    if (!gallery) return Number.POSITIVE_INFINITY;

    let excess = 0;
    for (const node of [gallery, ...gallery.querySelectorAll("*")]) {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      excess = Math.max(excess, rect.right - root.clientWidth, -rect.left);
    }
    return Math.round(excess * 100) / 100;
  });

  expect(worst).toBeLessThanOrEqual(0);
}

async function gridBoxes(page: Page) {
  return page.locator(".bio-moments__grid > li").evaluateAll((items) =>
    items.map((item) => {
      const box = item.getBoundingClientRect();
      return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width) };
    }),
  );
}

async function mediaRatios(page: Page) {
  return page.locator(".bio-moment__media").evaluateAll((boxes) =>
    boxes.map((box) => {
      const rect = box.getBoundingClientRect();
      return Number((rect.width / rect.height).toFixed(2));
    }),
  );
}

test.describe("biography moments — validator", () => {
  test("the published gallery passes every rule and carries the reviewed preview copy", () => {
    // D-062: six stand-in entries per locale ship as live content. The same
    // validation `next build` runs must come back empty — the build publishes
    // them or fails.
    expect(validateBiographyMoments(collectBiographyMoments())).toEqual([]);

    const sample = placeholderMomentsPair();
    for (const locale of locales) {
      const published = locale === "en" ? biographyContent.moments : biographyContentArabic.moments;
      expect(published, locale).toBeDefined();
      expect(published!.moments, locale).toHaveLength(6);
      expect(published!.title, locale).toBe(sample[locale].title);

      published!.moments.forEach((moment, index) => {
        const standIn = sample[locale].moments[index];
        const at = `${locale} #${index + 1}`;
        // The transfer kept the reviewed copy byte for byte…
        expect(moment.src, `${at} src`).toBe(standIn.src);
        expect(moment.width, `${at} width`).toBe(standIn.width);
        expect(moment.height, `${at} height`).toBe(standIn.height);
        expect(moment.focus, `${at} focus`).toEqual(standIn.focus);
        expect(moment.meta, `${at} meta`).toBe(standIn.meta);
        expect(moment.caption, `${at} caption`).toBe(standIn.caption);
        // …and dropped the trial wording from the alt the live site serves.
        expect(moment.alt, `${at} alt`).not.toContain("placeholder");
        expect(moment.alt, `${at} alt`).not.toContain("مؤقتة");
      });
    }

    expect(collectBiographyMoments()).toEqual({
      en: biographyContent.moments,
      ar: biographyContentArabic.moments,
    });

    for (const count of fixtureCounts) {
      expect(validateBiographyMoments(pair(gallery(count), gallery(count, "ar"))), `count ${count}`).toEqual([]);
    }
  });

  test("an impossible photo count is rejected", () => {
    const one = gallery(6);
    const two = gallery(6);

    const cases = [
      { ...one, moments: one.moments.slice(0, 1) },
      { ...two, moments: two.moments.slice(0, 2) },
      tooMany("en"),
    ];

    for (const moments of cases) {
      const errors = validateBiographyMoments(pair(moments, { ...moments }));
      expect(errors.length, `${moments.moments.length} moments`).toBeGreaterThan(0);
      expect(errors.join("\n")).toMatch(/holds 0 or 3 to 6/);
    }
  });

  test("a photo without a file under public/ is rejected", () => {
    const moments = gallery(6);
    const broken = { ...moments, moments: [{ ...moments.moments[0], src: "/biography/moments/missing.webp" }, ...moments.moments.slice(1)] };

    const errors = validateBiographyMoments(pair(broken, broken));
    expect(errors.join("\n")).toMatch(/missing\.webp does not exist under public/);
  });

  test("empty copy is rejected in either locale", () => {
    const moments = gallery(3);
    const empty = (field: "alt" | "meta" | "caption") => ({
      ...moments,
      moments: [{ ...moments.moments[0], [field]: "   " }, ...moments.moments.slice(1)],
    });

    expect(validateBiographyMoments(pair(empty("alt"), gallery(3, "ar"))).join("\n")).toMatch(/alt is empty/);
    expect(validateBiographyMoments(pair(gallery(3), empty("meta"))).join("\n")).toMatch(/meta is empty/);
    expect(validateBiographyMoments(pair(empty("caption"), gallery(3, "ar"))).join("\n")).toMatch(/caption is empty/);
  });

  test("a caption over 45 words is rejected", () => {
    const moments = gallery(3);
    const long = {
      ...moments,
      moments: [{ ...moments.moments[0], caption: Array.from({ length: 46 }, (_, i) => `word${i}`).join(" ") }, ...moments.moments.slice(1)],
    };

    const errors = validateBiographyMoments(pair(long, gallery(3, "ar")));
    expect(errors.join("\n")).toMatch(/caption is 46 words, limit is 45/);

    // The fixtures themselves stay inside the limit.
    const captions = [...gallery(6).moments, ...gallery(6, "ar").moments].map((moment) => moment.caption);
    for (const caption of captions) expect(caption.trim().split(/\s+/).length).toBeLessThanOrEqual(45);
  });

  test("the two locales must carry the same photos in the same order", () => {
    const en = gallery(6);
    const ar = gallery(6, "ar");

    const shorter = { ...ar, moments: ar.moments.slice(0, 3) };
    expect(validateBiographyMoments(pair(en, shorter)).join("\n")).toMatch(/en has 6 moments but ar has 3/);

    // Same photos, different order: the caption of one language would sit
    // under the wrong picture.
    const photos = [en.moments[0].src, "/brand/aggour-emblem-flat-1024.png", "/brand/aggour-og-1200x630.png"];
    const inOrder = { ...en, moments: photos.map((src) => ({ ...en.moments[0], src })) };
    const shuffled = { ...ar, moments: [photos[1], photos[0], photos[2]].map((src) => ({ ...ar.moments[0], src })) };

    const errors = validateBiographyMoments(pair(inOrder, shuffled));
    expect(errors.join("\n")).toMatch(/en src .* and ar src .* are not the same photo/);
  });
});

test.describe("biography moments — rendering", () => {
  test("the real pages render the published gallery, never the trial wording", async ({ page }) => {
    for (const locale of locales) {
      const response = await page.request.get(`/${locale}/biography`);
      expect(response.status(), locale).toBe(200);

      await page.goto(`/${locale}/biography`);
      await expect(page.locator("[data-biography-page]")).toBeVisible();
      await expect(page.locator("section.bio-moments")).toBeVisible();
      await expect(page.locator("ul.bio-moments__grid")).toHaveAttribute("data-count", "6");
      await expect(page.locator("figure.bio-moment")).toHaveCount(6);
      await expect(page.locator("h2#bio-moments-title")).toHaveText(
        locale === "en" ? "Moments from practice and teaching" : "من الممارسة والتدريس",
      );

      // The published section ships; the sample's visible tag and trial alts
      // are not part of either locale's page.
      await expect(page.locator(".bio-moments__placeholder")).toHaveCount(0);
      const html = await page.content();
      expect(html, locale).not.toContain("Placeholder: sample photos and captions");
      expect(html, locale).not.toContain(
        locale === "ar" ? "صورة مؤقتة بدل صورة الحدث" : "placeholder for the event photo",
      );
    }
  });

  for (const count of fixtureCounts) {
    for (const locale of locales) {
      test(`${locale} renders ${count} moments with their own copy`, async ({ page }) => {
        // The counted preview exists only in development (D-059).
        test.skip(!(await devPreviewServed()), "development-only `?moments` preview; production never resolves searchParams");
        const fixture = gallery(count, locale);
        await page.goto(`/${locale}/biography?moments=${count}`);

        const section = page.locator("section.bio-moments");
        await expect(section).toBeVisible();
        await expect(section).toHaveAttribute("aria-labelledby", "bio-moments-title");
        await expect(page.locator("h2#bio-moments-title")).toHaveText(fixture.title);

        const grid = page.locator("ul.bio-moments__grid");
        await expect(grid).toHaveAttribute("role", "list");
        await expect(grid).toHaveAttribute("data-count", String(count));

        await expect(page.locator("figure.bio-moment")).toHaveCount(count);
        // figcaption stays inside its figure.
        await expect(page.locator("figure.bio-moment > figcaption.bio-moment__caption")).toHaveCount(count);

        const images = page.locator("figure.bio-moment img");
        await expect(images).toHaveCount(count);
        for (let index = 0; index < count; index += 1) {
          const moment = fixture.moments[index];
          const image = images.nth(index);

          await expect(image).toHaveAttribute("alt", moment.alt);
          await expect(image).toHaveAttribute("width", String(moment.width));
          await expect(image).toHaveAttribute("height", String(moment.height));
          await expect(image).toHaveAttribute("loading", "lazy");
          await expect(image).toHaveAttribute("sizes", "(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw");

          const figure = page.locator("figure.bio-moment").nth(index);
          await expect(figure.locator(".bio-moment__meta")).toHaveText(moment.meta);
          await expect(figure.locator(".bio-moment__text")).toHaveText(moment.caption);
        }
      });
    }
  }

  test("the gallery stays free of horizontal overflow across the required widths", async ({ page }) => {
    test.skip(!(await devPreviewServed()), "development-only `?moments` preview; production never resolves searchParams");
    test.setTimeout(300_000);

    for (const count of fixtureCounts) {
      for (const locale of locales) {
        for (const width of widths) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(`/${locale}/biography?moments=${count}`);
          await expect(page.locator(".bio-moments")).toBeVisible();
          await overflow(page);
        }
      }
    }
  });

  test("Arabic mirrors the grid instead of duplicating its rules", async ({ page }) => {
    test.skip(!(await devPreviewServed()), "development-only `?moments` preview; production never resolves searchParams");
    await page.setViewportSize({ width: 1024, height: 900 });

    const firstTwo = async (locale: Locale) => {
      await page.goto(`/${locale}/biography?moments=4`);
      const boxes = await gridBoxes(page);
      return { left: boxes[0].x, right: boxes[1].x };
    };

    const english = await firstTwo("en");
    expect(english.left).toBeLessThan(english.right);

    const arabic = await firstTwo("ar");
    expect(arabic.left).toBeGreaterThan(arabic.right);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("no count leaves an orphan row, from a phone to a desktop", async ({ page }) => {
    test.skip(!(await devPreviewServed()), "development-only `?moments` preview; production never resolves searchParams");
    // Below 40rem: one column, every photo on its own row.
    await page.setViewportSize({ width: 390, height: 900 });
    for (const count of fixtureCounts) {
      await page.goto(`/en/biography?moments=${count}`);
      const boxes = await gridBoxes(page);
      for (let index = 1; index < boxes.length; index += 1) {
        expect(boxes[index].y, `390px, count ${count}, item ${index + 1}`).toBeGreaterThan(boxes[index - 1].y);
      }
      const ratios = await mediaRatios(page);
      for (const ratio of ratios) expect(ratio).toBeCloseTo(4 / 3, 1);
    }

    // From 40rem: two columns. An odd last photo takes the whole row.
    await page.setViewportSize({ width: 768, height: 900 });
    for (const count of fixtureCounts) {
      await page.goto(`/en/biography?moments=${count}`);
      const boxes = await gridBoxes(page);
      const ratios = await mediaRatios(page);
      const gridWidth = await page.locator(".bio-moments__grid").evaluate((el) => Math.round(el.getBoundingClientRect().width));
      const closesAlone = count === 3 || count === 5;

      for (let index = 0; index < boxes.length; index += 1) {
        const expected = closesAlone && index === count - 1 ? 16 / 9 : 4 / 3;
        expect(ratios[index], `768px, count ${count}, item ${index + 1}`).toBeCloseTo(expected, 1);
      }

      if (closesAlone) {
        const last = boxes[count - 1];
        expect(last.y, `768px, count ${count}: the last photo starts its own row`).toBeGreaterThan(boxes[count - 2].y);
        expect(Math.abs(last.width - gridWidth), `768px, count ${count}: the last photo spans the row`).toBeLessThan(4);
      } else {
        expect(boxes[count - 1].width, `768px, count ${count}: the last photo keeps a half row`).toBeLessThan(gridWidth - 8);
      }
    }

    // From 60rem: five and six photos run three across; three and four stay
    // in the two-column layout, so only an odd count needs the closing row.
    await page.setViewportSize({ width: 1024, height: 900 });
    for (const count of [3, 4, 5, 6] as const) {
      await page.goto(`/en/biography?moments=${count}`);
      const boxes = await gridBoxes(page);
      const ratios = await mediaRatios(page);
      const gridWidth = await page.locator(".bio-moments__grid").evaluate((el) => Math.round(el.getBoundingClientRect().width));

      if (count === 5 || count === 6) {
        expect(boxes[0].y, `count ${count}: first row holds three photos`).toBe(boxes[1].y);
        expect(boxes[1].y).toBe(boxes[2].y);
        expect(boxes[3].y, `count ${count}: the second row starts below`).toBeGreaterThan(boxes[0].y);
        expect(boxes[0].x).toBeLessThan(boxes[1].x);
        expect(boxes[1].x).toBeLessThan(boxes[2].x);

        if (count === 5) {
          expect(boxes[4].y, "count 5: the last row holds the remaining two").toBe(boxes[3].y);
          // The fourth photo starts in column 2, so the pair is centred.
          expect(boxes[3].x, "count 5: the fourth photo starts in column 2").toBeGreaterThan(boxes[0].x);
          const grid = await page.locator(".bio-moments__grid").boundingBox();
          expect(grid).not.toBeNull();
          const left = boxes[3].x - (grid!.x as number);
          const right = (grid!.x + grid!.width) - (boxes[4].x + boxes[4].width);
          expect(Math.abs(left - right), "count 5: the last row is centred").toBeLessThan(8);
        }
      } else {
        expect(boxes[0].y, `count ${count}: two columns keep the first row together`).toBe(boxes[1].y);
        if (count === 3) {
          expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
          expect(Math.abs(boxes[2].width - gridWidth), "count 3: the closing photo spans the row").toBeLessThan(4);
          expect(ratios[2]).toBeCloseTo(16 / 9, 1);
        } else {
          expect(boxes[3].y, "count 4: two tidy rows").toBe(boxes[2].y);
        }
      }

      // Every photo keeps one of the two intended shapes: the 4/3 cell, or
      // the 16/9 closing row. Nothing squashes between the two.
      for (let index = 0; index < ratios.length; index += 1) {
        const ratio = ratios[index];
        const cell = Math.abs(ratio - 4 / 3) < 0.05;
        const closingRow = Math.abs(ratio - 16 / 9) < 0.05;
        expect(cell || closingRow, `1024px, count ${count}, item ${index + 1}: ratio ${ratio}`).toBe(true);
      }
    }
  });

  test("the gallery sits after the overview", async ({ page }) => {
    test.skip(!(await devPreviewServed()), "development-only `?moments` preview; production never resolves searchParams");
    await page.goto("/en/biography?moments=6");

    const order = await page.evaluate(() => {
      const overview = document.querySelector('[aria-labelledby="biography-overview"]');
      const moments = document.querySelector("section.bio-moments");
      if (!overview || !moments) return { afterOverview: false };

      return {
        afterOverview: Boolean(overview.compareDocumentPosition(moments) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });

    expect(order.afterOverview).toBe(true);
  });

  test("captions survive 200% text zoom without clipping", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });

    // The published gallery renders in every mode (D-062), so the captions
    // on the live site are exactly what gets zoomed here — no preview switch.
    await page.goto("/en/biography");
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });

    await expect(page.locator(".bio-moments")).toBeVisible();
    await galleryOverflow(page);

    const withGallery = await page.evaluate(() => document.documentElement.scrollWidth);
    const clipped = await page.locator(".bio-moment__text, .bio-moment__meta").evaluateAll((nodes) =>
      nodes.filter((node) => node.scrollHeight > node.clientHeight + 1 || node.scrollWidth > node.clientWidth + 1).length,
    );
    expect(clipped).toBe(0);

    // A bare-page URL no longer exists: the gallery ships everywhere, so the
    // chrome-only baseline comes from removing the section on this very page.
    // Equal widths mean the gallery adds no horizontal scroll of its own;
    // any overflow present either way belongs to the shared header.
    const pageAlone = await page.evaluate(() => {
      document.querySelector("section.bio-moments")?.remove();
      return document.documentElement.scrollWidth;
    });
    expect(withGallery).toBe(pageAlone);
  });
});
