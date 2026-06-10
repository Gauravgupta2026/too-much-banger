import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-prod",
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
