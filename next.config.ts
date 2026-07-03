import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cms.alltechs.co.id",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['react'] = path.resolve(process.cwd(), 'node_modules/react');
    config.resolve.alias['react-dom'] = path.resolve(process.cwd(), 'node_modules/react-dom');
    return config;
  },
};

export default nextConfig;
