import path from "node:path";

import type { NextConfig } from "next";

const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  experimental: {
    // Inline the small Tailwind/app CSS payload on first load to avoid a render-blocking
    // stylesheet request for visitors without a warm cache.
    inlineCss: true,
  },
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
