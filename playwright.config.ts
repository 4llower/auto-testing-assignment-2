import { defineConfig, devices } from "@playwright/test";

const viewportWidth = process.env.VIEWPORT_WIDTH
  ? Number(process.env.VIEWPORT_WIDTH)
  : 1920;
const viewportHeight = process.env.VIEWPORT_HEIGHT
  ? Number(process.env.VIEWPORT_HEIGHT)
  : 1080;
const workers = process.env.workers ? Number(process.env.workers) : undefined;
const runThis = process.env.runThis
  ? new RegExp(process.env.runThis, "i")
  : undefined;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  workers,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "reports/report.json" }],
  ],
  grep: runThis,
  use: {
    baseURL: "https://demoqa.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: viewportWidth, height: viewportHeight },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: viewportWidth, height: viewportHeight },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: viewportWidth, height: viewportHeight },
      },
    },
  ],
});
