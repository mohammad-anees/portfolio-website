import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/experience/query',
      permanent: false,
    }
  ]

};

export default nextConfig;
