import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
  },
  poweredByHeader: false,
  compress: true,
};

let finalConfig = nextConfig;

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  try {
    const withSentryConfig = require("@sentry/nextjs/webpack")({
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      widenClientFileUpload: true,
      hideSourceMaps: true,
      disableLogger: true,
    });
    finalConfig = withSentryConfig(nextConfig);
  } catch (error) {
    console.warn("Sentry webpack plugin not available, skipping Sentry configuration");
  }
}

export default finalConfig;
