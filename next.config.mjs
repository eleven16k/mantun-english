/** @type {import('next').NextConfig} */
// NEXT_BASE_PATH — deploy the student app under a URL prefix (e.g. /app on
// english.mt-health.com). Build-time env; unset/"" keeps root-level routes.
// Raw <img src> and fetch()-able asset URLs must use NEXT_PUBLIC_BASE_PATH
// (see lib/config.ts BASE_PATH) — only <Link>/router get the prefix for free.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  basePath,
  // All /api/* calls proxy to the standalone mt-teach-api service (X1 三端分家).
  // Same-origin from the browser's perspective — no CORS needed anywhere.
  // (With basePath set, nginx routes root-level /api/* straight to the API
  // service, so this rewrite only ever fires for /basePath/api/* requests.)
  async rewrites() {
    const api = process.env.API_URL || "http://localhost:4000";
    return [{ source: "/api/:path*", destination: `${api}/api/:path*` }];
  },
};
export default nextConfig;
