import Image from "next/image";
import Link from "next/link";

import type { ConditionMedia } from "@/content/patient-conditions";

import { ConditionVideoLazy } from "./ConditionVideoLazy";

type ConditionMediaViewProps = Readonly<{
  media: ConditionMedia;
  /**
   * `index` (the hub) shows an image, and shows a video as its poster linked
   * to the condition page: ten players on one page would be far too heavy.
   * `detail` shows the image, or the click-to-play facade for the video.
   */
  surface: "index" | "detail";
  /** Localized "Play video: {title}". */
  playLabel: string;
  /** Where the hub's poster link goes. */
  detailHref: string;
  /** Locale code for the player interface and captions. */
  locale: string;
}>;

/**
 * Renders a condition's optional media, or nothing at all when it has none:
 * no wrapper, no placeholder, no reserved height and no extra request.
 *
 * Images carry their real width and height, so they never shift the layout,
 * and load lazily; the video is deferred to a client chunk that only pages
 * with a video ever download.
 */
export function ConditionMediaView({ media, surface, playLabel, detailHref, locale }: ConditionMediaViewProps) {
  const caption = media.caption;
  const credit = media.type === "image" ? media.credit : undefined;
  const durationLabel = media.type === "video" ? media.durationLabel : undefined;
  const hasCaption = Boolean(caption || credit || durationLabel);

  if (media.type === "image") {
    return (
      <figure className="condition-media">
        <Image
          alt={media.decorative ? "" : media.alt}
          className="condition-media__image"
          height={media.height}
          loading="lazy"
          sizes="(max-width: 60rem) calc(100vw - 2rem), 46rem"
          src={media.src}
          width={media.width}
        />
        {hasCaption ? (
          <figcaption className="condition-media__caption">
            {caption}
            {credit ? <span className="condition-media__credit">{credit}</span> : null}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (surface === "index") {
    return (
      <figure className="condition-media condition-media--poster">
        <Link aria-label={playLabel} className="condition-media__poster" href={detailHref}>
          <Image
            alt={media.title}
            className="condition-media__image"
            height={media.posterHeight}
            loading="lazy"
            sizes="(max-width: 60rem) calc(100vw - 2rem), 46rem"
            src={media.poster}
            width={media.posterWidth}
          />
        </Link>
        {hasCaption ? (
          <figcaption className="condition-media__caption">
            {caption}
            {durationLabel ? <span className="condition-media__duration">{durationLabel}</span> : null}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="condition-media condition-media--video">
      <ConditionVideoLazy locale={locale} media={media} playLabel={playLabel} />
      {hasCaption ? (
        <figcaption className="condition-media__caption">
          {caption}
          {durationLabel ? <span className="condition-media__duration">{durationLabel}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
