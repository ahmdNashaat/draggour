import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Always defined, even when unset: a build without the sample-gallery flag
  // then folds the branch to a constant and the bundler drops that module, so
  // none of its copy can reach a production bundle. Enable it in the Vercel
  // Preview scope only (value "1"), never in Production.
  env: {
    NEXT_PUBLIC_MOMENTS_PLACEHOLDER: process.env.NEXT_PUBLIC_MOMENTS_PLACEHOLDER ?? "",
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
