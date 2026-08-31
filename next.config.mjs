/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // All /api/* calls proxy to the standalone lexi-api service (X1 三端分家).
  // Same-origin from the browser's perspective — no CORS needed anywhere.
  async rewrites() {
    const api = process.env.API_URL || "http://localhost:4000";
    return [{ source: "/api/:path*", destination: `${api}/api/:path*` }];
  },
};
export default nextConfig;
