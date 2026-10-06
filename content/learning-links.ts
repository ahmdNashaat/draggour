import type { Locale } from "@/content/site";

/**
 * Single source of truth for the "Learning links" section of `/e-learning`.
 *
 * Adding a destination = adding an entry to `learningLinks` below. The section
 * renders every entry in both launch locales; no component or message file has
 * to change. An entry whose `url` is empty or whitespace-only is never
 * rendered, so a placeholder cannot leak a dead link onto the page.
 */
export type LearningLinkPlatform = "youtube" | "facebook" | "platform" | "other";

export type LearningLink = Readonly<{
  /** Stable, unique key. Also exposed as `data-learning-link`. */
  id: string;
  /** Selects the inline SVG mark rendered next to the title. */
  platform: LearningLinkPlatform;
  /** Absolute `https` destination. Empty/whitespace-only hides the entry. */
  url: string;
  title: Readonly<{ en: string; ar: string }>;
  description: Readonly<{ en: string; ar: string }>;
  /** The promoted destination, rendered as the large card. */
  primary: boolean;
}>;

export type VisibleLearningLink = Readonly<{
  id: string;
  platform: LearningLinkPlatform;
  url: string;
  title: string;
  description: string;
  primary: boolean;
}>;

export const learningLinks: readonly LearningLink[] = [
  {
    id: "youtube-channel",
    platform: "youtube",
    // TODO(learning-links): temporary placeholder — replace with the final
    // channel URL supplied by the doctor. Once that exact URL is in place, add
    // it to `approvedSameAs` in lib/seo/person-entity.ts as well. A generic
    // platform homepage is never a publishable channel address.
    url: "https://www.youtube.com",
    title: { en: "YouTube Channel", ar: "قناة يوتيوب" },
    description: {
      en: "Educational videos for physicians in interventional neuroradiology.",
      ar: "فيديوهات تعليمية للأطباء في مجال الأشعة العصبية التداخلية.",
    },
    primary: true,
  },
];

/** Localizes and drops entries without a usable `url`. */
export function selectLearningLinks(
  links: readonly LearningLink[],
  locale: Locale,
): readonly VisibleLearningLink[] {
  const language = locale === "ar" ? "ar" : "en";

  return links
    .filter((link) => link.url.trim().length > 0)
    .map((link) => ({
      id: link.id,
      platform: link.platform,
      url: link.url.trim(),
      title: link.title[language],
      description: link.description[language],
      primary: link.primary,
    }));
}

export function getLearningLinks(locale: Locale): readonly VisibleLearningLink[] {
  return selectLearningLinks(learningLinks, locale);
}
