import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `https://medi-store-phi.vercel.app/api/auth/:path*`,
      },
    ];
  },
}




export default nextConfig;
