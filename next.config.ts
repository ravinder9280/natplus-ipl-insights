import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds: true, // Ignore ESLint errors during the build process
  }
};

export default nextConfig;
