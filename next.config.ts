import path from "node:path";

import type { NextConfig } from "next";

const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/strapi-media/**",
      },
    ],
    minimumCacheTTL: 14400,
  },
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
