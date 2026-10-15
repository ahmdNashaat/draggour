"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { ConditionMedia } from "@/content/patient-conditions";

export type ConditionVideoProps = Readonly<{
  media: Extract<ConditionMedia, { type: "video" }>;
  /** Locale code sent to YouTube for the interface and caption language. */
  locale: string;
  /** Localized "Play video: {title}" label, also used by the noscript link. */
  playLabel: string;
}>;

/**
 * A privacy-friendly YouTube facade: the page ships a self-hosted poster and a
 * button, and nothing is requested from YouTube or Google until the visitor
 * asks for the player. The swap happens in place, so the surrounding column
 * never reflows and focus lands inside the player.
 *
 * The play icon is a plain right-pointing triangle: it is deliberately not
 * mirrored in RTL, because a play control reads the same way in both
 * directions.
 */
export default function ConditionVideo({ media, locale, playLabel }: ConditionVideoProps) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const watchUrl = `https://www.youtube.com/watch?v=${media.videoId}`;

  if (playing) {
    const src = `https://www.youtube-nocookie.com/embed/${media.videoId}` +
      `?autoplay=1&rel=0&hl=${locale}&cc_lang_pref=${locale}&cc_load_policy=1`;

    return (
      <div className="condition-video">
        <iframe
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="condition-video__frame"
          ref={frameRef}
          referrerPolicy="strict-origin-when-cross-origin"
          src={src}
          title={media.title}
        />
      </div>
    );
  }

  return (
    <div className="condition-video">
      <button
        aria-label={playLabel}
        className="condition-video__facade"
        onClick={() => setPlaying(true)}
        type="button"
      >
        <Image
          alt=""
          className="condition-video__poster"
          height={media.posterHeight}
          loading="lazy"
          sizes="(max-width: 60rem) calc(100vw - 2rem), 46rem"
          src={media.poster}
          width={media.posterWidth}
        />
        <span aria-hidden="true" className="condition-video__play">
          <svg fill="none" viewBox="0 0 24 24">
            <path d="M8.5 5.75v12.5L18.25 12 8.5 5.75Z" fill="currentColor" />
          </svg>
        </span>
        {media.durationLabel ? <span className="condition-video__duration">{media.durationLabel}</span> : null}
      </button>
      <noscript>
        <p className="condition-video__noscript">
          <a href={watchUrl}>{playLabel}</a>
        </p>
      </noscript>
    </div>
  );
}
