import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@prisma/client", "prisma"],
  transpilePackages: ["swiper"],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'www.kolaymama.com' },
      { protocol: 'https', hostname: 'cdn-img.pttavm.com' },
      { protocol: 'https', hostname: 'pecpets.com' },
      { protocol: 'https', hostname: 'productimages.hepsiburada.net' },
      { protocol: 'https', hostname: 'cdn03.ciceksepeti.com' },
      { protocol: 'https', hostname: 'cdn.akakce.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'cdn.dsmcdn.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: '**.bing.com' },
      { protocol: 'https', hostname: '**.bing.net' },
    ],
  },
};

export default nextConfig;
