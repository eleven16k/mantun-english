/**
 * Unit test setup — runs before every test file.
 * Silence server logs, pin the JWT secret (vitest env also sets it).
 */
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";
process.env.NEXT_PUBLIC_DEEPTUTOR_URL = "http://localhost:59999";
