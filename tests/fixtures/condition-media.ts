import type { ConditionMedia } from "../../content/patient-conditions";

/** Precise sub-types, so tests can read `.alt` / `.videoId` without a cast. */
export type ImageFixture = Extract<ConditionMedia, { type: "image" }>;
export type VideoFixture = Extract<ConditionMedia, { type: "video" }>;

/**
 * Test-only media fixtures. They live under tests/, never in
 * content/patient-conditions.ts, so no condition page can pick them up by
 * accident and nothing here ships as published content.
 *
 * Both entries point at files that already exist under public/, so the same
 * objects can be pushed through the build-time media validation.
 */
export const imageFixture: ImageFixture = {
  type: "image",
  src: "/brand/aggour-brain-and-spine-emblem.png",
  width: 1254,
  height: 1254,
  alt: "Illustration used as a fixture for the condition media layout",
  caption: "Fixture illustration caption",
  credit: "Fixture credit",
};

export const videoFixture: VideoFixture = {
  type: "video",
  provider: "youtube",
  videoId: "abcdefghijk",
  title: "Fixture condition video",
  poster: "/brand/aggour-emblem-flat-1024.png",
  posterWidth: 1024,
  posterHeight: 1024,
  caption: "Fixture video caption",
  durationLabel: "1:20",
};
