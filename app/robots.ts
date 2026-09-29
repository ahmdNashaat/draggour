import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const sitemap = siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/sitemap.xml` : undefined;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(sitemap ? { sitemap } : {}),
  };
}
