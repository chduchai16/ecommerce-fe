import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['antd'],
  experimental: {
    optimizePackageImports: ['antd']
  }
};

export default nextConfig;
