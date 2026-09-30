import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8055" },
      { protocol: "http", hostname: "localhost", port: "8055" },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
