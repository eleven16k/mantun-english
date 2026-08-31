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
  webServer: [
    {
      // lexi-api (standalone backend + Socket.IO) on :4199 with an isolated DB
      command: "rm -rf .tmp/e2e-apidata && DATA_DIR=./.tmp/e2e-apidata PORT=4199 JWT_SECRET=test-secret node server.js",
      cwd: "../lexi-api",
      url: "http://localhost:4199/api/health",
      reuseExistingServer: !process.env.CI,
      timeout: 150_000,
    },
    {
      // lexi (student web) on :3199 — /api/* rewrites to the API at :4199
      command: "API_URL=http://localhost:4199 NEXT_PUBLIC_SOCKET_URL=http://localhost:4199 npx next dev -p 3199",
      url: "http://localhost:3199/chat",
      reuseExistingServer: !process.env.CI,
      timeout: 150_000,
    },
  ],
});
