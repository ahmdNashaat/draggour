import { expect, test, type Page } from "@playwright/test";

import { patientConditions, type ConditionMedia } from "../content/patient-conditions";
import { collectConditionMedia, validateConditionMedia } from "../lib/condition-media";

import { imageFixture, videoFixture } from "./fixtures/condition-media";

const locales = ["en", "ar"] as const;

/** Every host a YouTube player would talk to. */
const YOUTUBE_HOSTS = /youtube|ytimg|googlevideo|gstatic.*yt/i;

function entry(media: ConditionMedia, locale: "en" | "ar" = "en") {
  return [{ slug: "fixture", locale, media }];
}

function recordYouTube(page: Page): string[] {
  const urls: string[] = [];
  page.on("request", (request) => {
    if (YOUTUBE_HOSTS.test(request.url())) urls.push(request.url());
  });
  return urls;
}

test("no condition declares media, and both fixtures satisfy every rule", () => {
  // The capability ships dormant: nothing is published until the doctor
  // approves an image or a video, so the declared set starts empty.
  expect(collectConditionMedia()).toEqual([]);
  expect(validateConditionMedia(collectConditionMedia())).toEqual([]);

  expect(validateConditionMedia(entry(imageFixture))).toEqual([]);
  expect(validateConditionMedia(entry(videoFixture))).toEqual([]);
  expect(validateConditionMedia(entry(imageFixture, "ar"))).toEqual([]);
  expect(validateConditionMedia(entry(videoFixture, "ar"))).toEqual([]);
});

test("invalid media is reported with a readable reason", () => {
  const cases: ReadonlyArray<readonly [ConditionMedia, RegExp]> = [
    [{ ...videoFixture, videoId: "short" }, /videoId must be 11 characters/],
    // A YouTube thumbnail host cannot be used, even as a path: the poster must
    // be a file the site serves itself.
    [{ ...videoFixture, poster: "/brand/youtube-poster.png" }, /poster must be self-hosted/],
    [{ ...videoFixture, poster: "https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg" }, /absolute public path/],
    [{ ...videoFixture, poster: "/brand/does-not-exist.png" }, /does not exist under public/],
    [{ ...videoFixture, posterWidth: 0 }, /poster width must be positive/],
    [{ ...imageFixture, src: "brand/aggour-emblem-flat-1024.png" }, /absolute public path/],
    [{ ...imageFixture, src: "/brand/nope.png" }, /does not exist under public/],
    [{ ...imageFixture, width: -1 }, /image width must be positive/],
    [{ ...imageFixture, alt: "" }, /alt is empty without decorative: true/],
    [{ ...imageFixture, alt: "Anything", decorative: true }, /decorative image must keep alt/],
  ];

  for (const [media, pattern] of cases) {
    const errors = validateConditionMedia(entry(media));
    expect(errors.length, JSON.stringify(media)).toBeGreaterThan(0);
    expect(errors.join("\n"), JSON.stringify(media)).toMatch(pattern);
  }
});

test("pages without media render none and request nothing from a video host", async ({ page }) => {
  const youtube = recordYouTube(page);

  for (const locale of locales) {
    await page.goto(`/${locale}/conditions`);
    await expect(page.locator(".condition-media")).toHaveCount(0);
    await expect(page.locator("main figure")).toHaveCount(0);
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator(".condition-video")).toHaveCount(0);

    for (const condition of patientConditions) {
      await page.goto(`/${locale}/conditions/${condition.slug}`);
      await expect(page.locator(".condition-media")).toHaveCount(0);
      await expect(page.locator(".condition-video")).toHaveCount(0);
      await expect(page.locator("iframe")).toHaveCount(0);
    }
  }

  expect(youtube).toEqual([]);
});

test("the dormant player code is not part of a media-free page's download", async ({ page }) => {
  // A condition page that has no video must not download the player module:
  // the click-to-play facade lives in its own lazy chunk.
  await page.goto("/en/conditions/angiography");
  const scripts = await page.locator('script[src]').evaluateAll((nodes) =>
    nodes.map((node) => (node as HTMLScriptElement).src).filter(Boolean),
  );
  expect(scripts.length).toBeGreaterThan(0);

  for (const src of scripts) {
    const response = await page.request.get(src);
    expect(response.ok(), src).toBeTruthy();
    const body = await response.text();
    expect(body, src).not.toContain("youtube-nocookie.com/embed");
  }
});

const playLabels = {
  en: `Play video: ${videoFixture.title}`,
  ar: `تشغيل الفيديو: ${videoFixture.title}`,
} as const;

for (const locale of locales) {
  test(`${locale} media fixture renders an image, a poster link and a click-to-play facade`, async ({ page }) => {
    const youtube = recordYouTube(page);

    await page.goto(`/${locale}/condition-media-fixture`);
    await expect(page.locator("[data-media-fixture]")).toBeVisible();

    // Illustration: real dimensions, lazy, caption and credit in the figure.
    const image = page.locator("#fixture-image .condition-media");
    await expect(image).toBeVisible();
    await expect(image.locator("img")).toHaveAttribute("alt", imageFixture.alt);
    await expect(image.locator("img")).toHaveAttribute("width", String(imageFixture.width));
    await expect(image.locator("img")).toHaveAttribute("height", String(imageFixture.height));
    await expect(image.locator("img")).toHaveAttribute("loading", "lazy");
    await expect(image.locator(".condition-media__caption")).toContainText(imageFixture.caption ?? "");
    await expect(image.locator(".condition-media__credit")).toHaveText(imageFixture.credit ?? "");

    // The hub never hosts a player: a video shows as its poster, linked to the
    // condition page, with no button and no frame.
    const poster = page.locator("#fixture-video-index .condition-media--poster");
    await expect(poster.locator("a")).toHaveAttribute("href", `/${locale}/conditions/angiography`);
    await expect(poster.locator("a")).toHaveAttribute("aria-label", playLabels[locale]);
    // next/image rewrites the src through the optimizer, but the fixture file
    // is still what gets served.
    await expect(poster.locator("img")).toHaveAttribute("src", /aggour-emblem-flat-1024\.png/);
    await expect(poster.locator(".condition-media__duration")).toHaveText(videoFixture.durationLabel ?? "");
    await expect(page.locator("#fixture-video-index button")).toHaveCount(0);
    await expect(page.locator("#fixture-video-index iframe")).toHaveCount(0);

    // Detail: the facade is 16:9 from the first paint and nothing is requested
    // until it is clicked.
    const facade = page.locator("[data-fixture-detail] .condition-video__facade");
    await expect(facade).toBeVisible();
    await expect(facade).toHaveAttribute("aria-label", playLabels[locale]);
    await expect(facade.locator(".condition-video__poster")).toHaveAttribute("src", /aggour-emblem-flat-1024\.png/);
    await expect(facade.locator(".condition-video__play")).toBeVisible();
    await expect(facade.locator(".condition-video__duration")).toHaveText(videoFixture.durationLabel ?? "");
    const box = await facade.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width / box!.height).toBeCloseTo(16 / 9, 1);
    await expect(page.locator("[data-fixture-detail] iframe")).toHaveCount(0);
    expect(youtube).toEqual([]);

    await facade.click();

    const frame = page.locator("[data-fixture-detail] iframe");
    await expect(frame).toHaveCount(1);
    await expect(frame).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/abcdefghijk\?autoplay=1/);
    await expect(frame).toHaveAttribute("title", videoFixture.title);
    await expect(frame).toHaveAttribute("allow", /autoplay/);
    // React renders allowFullScreen as a boolean attribute.
    await expect(frame).toHaveAttribute("allowfullscreen", "");
    await expect(frame).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    // Focus follows the swap into the player.
    await expect(frame).toBeFocused();
    expect(youtube.length).toBeGreaterThan(0);
    await expect(page.locator("[data-fixture-detail] .condition-video__facade")).toHaveCount(0);
  });
}

test("the two-column row mirrors in RTL and stays single-column below 60rem", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  const positions = async () =>
    page.locator("#fixture-image").evaluate((item) => {
      const title = item.querySelector("h2")!.getBoundingClientRect();
      const content = item.querySelector(".condition-row__content")!.getBoundingClientRect();
      return { titleX: title.x, contentX: content.x };
    });

  await page.goto("/en/condition-media-fixture");
  const en = await positions();
  expect(en.titleX).toBeLessThan(en.contentX);

  await page.goto("/ar/condition-media-fixture");
  const ar = await positions();
  expect(ar.titleX).toBeGreaterThan(ar.contentX);

  // Narrow: one column, no horizontal overflow, media full width.
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/ar/condition-media-fixture");
  const narrow = await positions();
  expect(Math.abs(narrow.titleX - narrow.contentX)).toBeLessThan(1);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
