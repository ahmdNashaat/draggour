import Image from "next/image";

import type { BiographyMoment, BiographyMoments } from "@/content/biography";

/** One, two or three columns depending on the viewport; the grid never crops a caption. */
const MOMENT_SIZES = "(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw";

function focusPosition(focus: BiographyMoment["focus"]): string {
  if (!focus) return "50% 50%";
  return `${focus.x}% ${focus.y}%`;
}

/**
 * The captioned photo gallery. Renders nothing while the doctor has not
 * approved photos, so the page carries no heading, no wrapper and no image
 * request for it (the `moments` key is absent from the content).
 *
 * `placeholder` marks the temporary sample gallery: it adds one visible,
 * plainly worded tag at the top of the section so nobody can mistake the
 * repeated portrait and the sample captions for real content.
 */
export function BiographyMoments({ moments, placeholder }: Readonly<{ moments: BiographyMoments | undefined; placeholder?: boolean }>) {
  if (!moments || moments.moments.length === 0) return null;

  const count = moments.moments.length;

  return (
    <section className="content-section bio-moments" aria-labelledby="bio-moments-title">
      <div className="site-container">
        {placeholder ? (
          <p className="bio-moments__placeholder" dir="ltr" lang="en">Placeholder: sample photos and captions, not real content.</p>
        ) : null}
        <h2 id="bio-moments-title">{moments.title}</h2>
        {moments.intro ? <p className="bio-moments__intro">{moments.intro}</p> : null}
        <ul className="bio-moments__grid" role="list" data-count={count}>
          {moments.moments.map((moment, index) => (
            // Static content, never reordered: the index keeps the key unique
            // even if the same photo is reused with a different crop.
            <li key={`${index}-${moment.src}`}>
              <figure className="bio-moment">
                <div className="bio-moment__media">
                  <Image
                    alt={moment.alt}
                    height={moment.height}
                    loading="lazy"
                    sizes={MOMENT_SIZES}
                    src={moment.src}
                    style={{ objectPosition: focusPosition(moment.focus) }}
                    width={moment.width}
                  />
                </div>
                <figcaption className="bio-moment__caption">
                  <p className="bio-moment__meta">{moment.meta}</p>
                  <p className="bio-moment__text">{moment.caption}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
