import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Parent /Development/pnpm-lock.yaml confuses workspace detection
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
