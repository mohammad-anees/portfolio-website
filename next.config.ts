import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/experience/query',
      permanent: false,
    }
  ],
  turbopack: {
    resolveAlias: {
      canvas: { browser: './empty-module.js' },
    },
  },
};

export default nextConfig;
