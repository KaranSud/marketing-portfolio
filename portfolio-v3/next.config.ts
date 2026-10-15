import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

// Locally, pin the workspace root so a stray lockfile in a parent directory
// isn't inferred as the root. On Vercel we must NOT set this: the platform
// forces `outputFileTracingRoot` to the repo root, and a mismatching
// `turbopack.root` breaks the "Deploying outputs" step on subfolder builds.
if (!process.env.VERCEL) {
  nextConfig.turbopack = { root: __dirname };
}

export default nextConfig;
