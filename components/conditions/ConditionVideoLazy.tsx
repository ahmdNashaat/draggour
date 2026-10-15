"use client";

import dynamic from "next/dynamic";

import type { ConditionVideoProps } from "./ConditionVideo";

// The player itself is the only chunk worth deferring, so `next/dynamic` lives
// here: in a Client Component it really code-splits, and the module graph of
// this wrapper is only reached by pages that actually carry a video.
const ConditionVideo = dynamic(() => import("./ConditionVideo"));

export function ConditionVideoLazy(props: ConditionVideoProps) {
  return <ConditionVideo {...props} />;
}
