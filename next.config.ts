import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // Behind Hostinger's reverse proxy the Host header Next.js sees doesn't match
      // the browser's Origin, so Server Actions (the contact and consultation forms)
      // get rejected as cross-site. List the public domains that may submit them.
      allowedOrigins: [
        "healthorbit.support",
        "www.healthorbit.support",
        "healthorbit.com",
        "www.healthorbit.com",
        "*.hostingersite.com",
      ],
    },
  },
};

export default nextConfig;
