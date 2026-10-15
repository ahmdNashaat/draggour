import { existsSync } from "node:fs";
import { join } from "node:path";

import { patientConditions, type ConditionMedia } from "@/content/patient-conditions";

type MediaEntry = Readonly<{
  slug: string;
  locale: "en" | "ar";
  media: ConditionMedia;
}>;

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

function publicFileExists(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src.replace(/^\/+/, "")));
}

/**
 * Every rule an added illustration or video must satisfy, returned as messages
 * instead of thrown, so a test can print all of them at once.
 *
 * The build calls `assertConditionMediaValid()` from the condition route's
 * `generateStaticParams()`, so an invalid entry fails `next build` rather than
 * reaching a page.
 */
export function validateConditionMedia(entries: readonly MediaEntry[]): readonly string[] {
  const errors: string[] = [];

  for (const { slug, locale, media } of entries) {
    const where = `${slug} (${locale})`;

    if (media.type === "image") {
      if (!media.src.trim()) errors.push(`${where}: image src is empty`);
      else if (!media.src.startsWith("/")) errors.push(`${where}: image src must be an absolute public path`);
      else if (!publicFileExists(media.src)) errors.push(`${where}: ${media.src} does not exist under public/`);
      if (!Number.isInteger(media.width) || media.width <= 0) errors.push(`${where}: image width must be positive`);
      if (!Number.isInteger(media.height) || media.height <= 0) errors.push(`${where}: image height must be positive`);
      if (!media.decorative && !media.alt.trim()) errors.push(`${where}: image alt is empty without decorative: true`);
      if (media.decorative && media.alt.trim()) errors.push(`${where}: a decorative image must keep alt: ""`);
      continue;
    }

    if (media.provider !== "youtube") errors.push(`${where}: unsupported video provider`);
    if (!VIDEO_ID.test(media.videoId)) errors.push(`${where}: videoId must be 11 characters`);
    if (!media.title.trim()) errors.push(`${where}: video title is empty`);
    if (!media.poster.trim()) errors.push(`${where}: video poster is empty`);
    else if (!media.poster.startsWith("/")) errors.push(`${where}: poster must be an absolute public path`);
    else if (media.poster.includes("youtube") || media.poster.includes("ytimg")) {
      errors.push(`${where}: poster must be self-hosted, not a YouTube thumbnail host`);
    } else if (!publicFileExists(media.poster)) errors.push(`${where}: ${media.poster} does not exist under public/`);
    if (!Number.isInteger(media.posterWidth) || media.posterWidth <= 0) errors.push(`${where}: poster width must be positive`);
    if (!Number.isInteger(media.posterHeight) || media.posterHeight <= 0) errors.push(`${where}: poster height must be positive`);
  }

  return errors;
}

/** All media entries currently declared in `patientConditions`. */
export function collectConditionMedia(): readonly MediaEntry[] {
  return patientConditions.flatMap((condition) =>
    (["en", "ar"] as const).flatMap((locale) => {
      const media = condition[locale].media;
      return media ? [{ slug: condition.slug, locale, media }] : [];
    }),
  );
}

export function assertConditionMediaValid(): void {
  const errors = validateConditionMedia(collectConditionMedia());
  if (errors.length > 0) {
    throw new Error(`Invalid condition media:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }
}
