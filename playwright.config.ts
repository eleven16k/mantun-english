import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: process.env.CI ? 4 : 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { outputFolder: "playwright/report", open: "never" }]],
  use: {
    baseURL: "http://localhost:3199",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "setup", testMatch: /setup\//, use: { ...devices["Desktop Chrome"] } },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/student.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "ai",
      testMatch: /ai-flows/,
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    command: "rm -rf .tmp/e2e && DATA_DIR=./.tmp/e2e/data PORT=3199 node server.js",
    url: "http://localhost:3199/chat",
    reuseExistingServer: !process.env.CI,
    timeout: 150_000,
  },
});
