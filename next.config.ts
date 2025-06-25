import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*unsplash.com" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
