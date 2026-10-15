import Image from "next/image";

import type { ConditionMedia } from "@/content/patient-conditions";

import { ConditionVideoLazy } from "./ConditionVideoLazy";

type ConditionMediaViewProps = Readonly<{
  media: ConditionMedia;
  /** Localized "Play video: {title}". */
  playLabel: string;
  /** Locale code for the player interface and captions. */
  locale: string;
}>;

/**
 * Renders a condition's optional media, or nothing at all when it has none:
 * no wrapper, no placeholder, no reserved height and no extra request.
 *
 * One component serves both surfaces — the hub row and the detail page — so a
 * condition's illustration or video looks and behaves identically in both
 * places (round 2 replaced the hub's poster link with the real facade).
 *
 * Images carry their real width and height, so they never shift the layout,
 * and load lazily; the video is deferred to a client chunk that only pages
 * with a video ever download.
 */
export function ConditionMediaView({ media, playLabel, locale }: ConditionMediaViewProps) {
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
          sizes="(max-width: 60rem) calc(100vw - 2rem), 42rem"
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
