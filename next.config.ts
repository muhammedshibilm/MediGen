import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pwa: withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    navigationPreload: true,
    cacheOnFrontEndNav: true,
  
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alternativemedicine.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com" 
      },
      {
        protocol: "https",
        hostname: "facenbodycare.com"
      },{
        protocol: "https",
        hostname: "s.w.org"
      }
    ],
  },
 
};

export default nextConfig;
