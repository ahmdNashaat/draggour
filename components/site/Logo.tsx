import { Fragment } from "react";
import Image from "next/image";

import type { Locale } from "@/content/site";

/**
 * One reusable brand lockup (D-044).
 *
 * The emblem is always one of the supplied SVG vectors; the name and tagline are
 * live HTML text, never baked into an image. The header wordmark follows the page
 * language — "AGGOUR" on the English site, "عجـــور" on the Arabic site — while
 * the footer lockup and the tagline stay English in every locale.
 */
export const LOGO_NAME = "AGGOUR";
/** Arabic header wordmark, used verbatim (tatweel included) on `/ar`. */
export const LOGO_NAME_ARABIC = "عجـــور";
/** Tagline segments; the stacked lockup renders one segment per line, centred. */
export const LOGO_TAGLINE_LINES = ["Interventional Neuroradiology", "Brain & Spine"] as const;
/** Alt used when the emblem is rendered on its own, identical in both locales. */
export const LOGO_STANDALONE_ALT = "AGGOUR - Interventional Neuroradiology";

/** Wordmark the shell shows for a locale; every other locale keeps Latin. */
export function logoNameFor(locale: Locale): string {
  return locale === "ar" ? LOGO_NAME_ARABIC : LOGO_NAME;
}

const ARABIC_SCRIPT = /[\u0600-\u06ff]/u;

const EMBLEM_SRC = {
  color: "/brand/aggour-emblem-flat.svg",
  dark: "/brand/aggour-emblem-mono-dark.svg",
  light: "/brand/aggour-emblem-mono-light.svg",
} as const;

/** The supplied emblem vectors are square; this is their intrinsic size. */
const EMBLEM_DIMENSION = 751;

export type LogoVariant = "horizontal" | "stacked" | "emblem";
export type LogoTone = "color" | "light" | "dark";

type LogoProps = Readonly<{
  variant: LogoVariant;
  tone: LogoTone;
  /** Wordmark to render; defaults to the Latin name (footer, and EN shell). */
  name?: string;
  /** Extra classes for the lockup's own element (the brand link stays with its caller). */
  className?: string;
  preload?: boolean;
}>;

/**
 * - `horizontal` (header): emblem + name. The caller owns the link and supplies
 *   the localized accessible name, so the visible wordmark can be dropped on
 *   narrow screens without losing the link's name.
 * - `stacked` (footer): emblem + name + tagline, one tagline segment per line,
 *   all centred — the footer mirror of the hero lockup.
 * - `emblem`: the mark on its own, with a fixed English alt in both locales.
 *
 * The lockup is ordered emblem-then-name and only its *position* inside the
 * header/footer follows the page direction. The wrapper keeps `lang="en"`;
 * an Arabic wordmark carries its own `lang="ar" dir="rtl"` so it is announced
 * and shaped as Arabic while the emblem stays first in the box order.
 */
export function Logo({ variant, tone, name = LOGO_NAME, className, preload }: LogoProps) {
  const lockupClassName = ["logo", `logo--${variant}`, `logo--${tone}`, className].filter(Boolean).join(" ");
  const isArabicName = ARABIC_SCRIPT.test(name);

  return (
    <span className={lockupClassName} dir="ltr" lang="en">
      <Image
        alt={variant === "emblem" ? LOGO_STANDALONE_ALT : ""}
        className="logo__emblem"
        height={EMBLEM_DIMENSION}
        preload={preload}
        src={EMBLEM_SRC[tone]}
        width={EMBLEM_DIMENSION}
      />
      {variant === "emblem" ? null : (
        <span className="logo__text">
          <span className="logo__name" dir={isArabicName ? "rtl" : "ltr"} lang={isArabicName ? "ar" : "en"}>
            {name}
          </span>
          {variant === "stacked" ? (
            <span className="logo__tagline">
              {LOGO_TAGLINE_LINES.map((line, index) => (
                <Fragment key={line}>
                  {/* A single space keeps the screen-reader sentence whole; the
                      whitespace-only run renders no line between the blocks. */}
                  {index > 0 ? " " : null}
                  <span className="logo__tagline-line">{line}</span>
                </Fragment>
              ))}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}
