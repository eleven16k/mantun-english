import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  test: {
    environment: "node",
    pool: "forks",
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
    exclude: ["tests/integration/deeptutor-live.test.ts"],
    setupFiles: ["tests/unit/setup.ts"],
    testTimeout: 20_000,
    hookTimeout: 120_000,
    env: {
      JWT_SECRET: "test-secret",
      NEXT_PUBLIC_DEEPTUTOR_URL: "http://localhost:59999",
    },
  },
});
