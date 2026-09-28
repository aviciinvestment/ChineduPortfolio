import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives inside the home directory, which contains an unrelated
  // pnpm-lock.yaml. Pin the root so Turbopack does not walk up to it.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
