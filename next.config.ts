import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*unsplash.com" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
