import type { NextConfig } from "next";

// Speed: fewer image widths (shorter srcsets, fewer variants to cache), WebP (fast to encode), and long
// browser caching for the media in public/ so repeat visits load from disk.
const media = "public, max-age=2592000, stale-while-revalidate=86400";
const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [128, 200, 256, 384, 480],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return ["/Results/:path*", "/Logos/:path*", "/karan.jpg"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: media }],
    }));
  },
};

// Locally, pin the workspace root so a stray lockfile in a parent directory
// isn't inferred as the root. On Vercel we must NOT set this: the platform
// forces `outputFileTracingRoot` to the repo root, and a mismatching
// `turbopack.root` breaks the "Deploying outputs" step on subfolder builds.
if (!process.env.VERCEL) {
  nextConfig.turbopack = { root: __dirname };
}

export default nextConfig;
