import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['antd'],
  experimental: {
    optimizePackageImports: ['antd']
  },
  // Tắt chế độ Strict Mode để tránh component bị mount 2 lần
  reactStrictMode: false
};

export default nextConfig;
