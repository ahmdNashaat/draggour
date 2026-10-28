import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  biographyContent,
  biographyContentArabic,
  type BiographyMoment,
  type BiographyMoments,
} from "@/content/biography";

/** A gallery renders nothing at 0 items; any other count must be a full row set. */
const VALID_MIN = 3;
const VALID_MAX = 6;
/** "Two to three lines, about 35 words": 45 is the hard ceiling. */
const CAPTION_MAX_WORDS = 45;

type Locale = "en" | "ar";

export type BiographyMomentsPair = Readonly<{
  en?: BiographyMoments;
  ar?: BiographyMoments;
}>;

function publicFileExists(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src.replace(/^\/+/, "")));
}

function wordCount(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function validateLocale(locale: Locale, moments: BiographyMoments | undefined, errors: string[]): void {
  if (!moments) return;

  const list = moments.moments;

  // 0 is valid and means "no section": only a non-empty gallery is checked
  // for a usable count, and the title that heads it.
  if (list.length > 0) {
    if (!moments.title.trim()) errors.push(`${locale}: moments title is empty`);
    if (list.length < VALID_MIN || list.length > VALID_MAX) {
      errors.push(`${locale}: ${list.length} moments — a gallery holds 0 or ${VALID_MIN} to ${VALID_MAX}`);
    }
  }

  list.forEach((moment: BiographyMoment, index: number) => {
    const where = `${locale} moment ${index + 1}`;

    if (!moment.src.trim()) errors.push(`${where}: src is empty`);
    else if (!moment.src.startsWith("/")) errors.push(`${where}: src must be an absolute public path`);
    else if (!publicFileExists(moment.src)) errors.push(`${where}: ${moment.src} does not exist under public/`);

    if (!Number.isInteger(moment.width) || moment.width <= 0) errors.push(`${where}: width must be positive`);
    if (!Number.isInteger(moment.height) || moment.height <= 0) errors.push(`${where}: height must be positive`);

    if (!moment.alt.trim()) errors.push(`${where}: alt is empty`);
    if (!moment.meta.trim()) errors.push(`${where}: meta is empty`);
    if (!moment.caption.trim()) errors.push(`${where}: caption is empty`);
    else if (wordCount(moment.caption) > CAPTION_MAX_WORDS) {
      errors.push(`${where}: caption is ${wordCount(moment.caption)} words, limit is ${CAPTION_MAX_WORDS}`);
    }

    if (moment.focus) {
      const { x, y } = moment.focus;
      if (x < 0 || x > 100 || y < 0 || y > 100) errors.push(`${where}: focus must be between 0 and 100`);
    }
  });
}

/**
 * Every rule an approved gallery must satisfy, returned as messages instead
 * of thrown, so a test can print all of them at once. `0` items and an absent
 * block are both valid: the section stays hidden.
 */
export function validateBiographyMoments(pair: BiographyMomentsPair): readonly string[] {
  const errors: string[] = [];

  validateLocale("en", pair.en, errors);
  validateLocale("ar", pair.ar, errors);

  const en = pair.en?.moments ?? [];
  const ar = pair.ar?.moments ?? [];

  if (en.length !== ar.length) {
    errors.push(`en has ${en.length} moments but ar has ${ar.length}: both locales carry the same gallery`);
  } else {
    en.forEach((moment, index) => {
      if (moment.src !== ar[index].src) {
        errors.push(`moment ${index + 1}: en src ${moment.src} and ar src ${ar[index].src} are not the same photo`);
      }
    });
  }

  return errors;
}

/** The gallery as published in `content/biography.ts`, per locale. */
export function collectBiographyMoments(): BiographyMomentsPair {
  return { en: biographyContent.moments, ar: biographyContentArabic.moments };
}

/** Thrown while the biography route renders, so an invalid gallery fails `next build`. */
export function assertBiographyMomentsValid(pair: BiographyMomentsPair = collectBiographyMoments()): void {
  const errors = validateBiographyMoments(pair);
  if (errors.length > 0) {
    throw new Error(`Invalid biography moments:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }
}
