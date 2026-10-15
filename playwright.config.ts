import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || "3002";
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  // Keep the single dev server stable while Next.js 16/Turbopack generates locale pages.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Webpack, not Turbopack: Turbopack requires the native SWC binding, which
    // Smart App Control blocks on the current Windows machine (WASM fallback).
    command: `pnpm dev:webpack -p ${PORT}`,
    url: `${BASE_URL}/en`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
