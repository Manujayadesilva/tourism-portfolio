import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'example.com',
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'unsplash.com',
      'res.cloudinary.com',
      'cdn.pixabay.com',
      'images.pexels.com',
      'www.pexels.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
