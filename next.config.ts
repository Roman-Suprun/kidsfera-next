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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kidsfera-strapi-media.s3.eu-west-1.amazonaws.com",
        pathname: "/**",
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
