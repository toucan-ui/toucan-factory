import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://images.unsplash.com",
  `connect-src 'self'${isDev ? ' ws://localhost:*' : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['@toucan-ui/core', '@toucan-ui/tokens', '@toucan-ui/patterns'],
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
  redirects: async () => [
    { source: '/components', destination: '/docs/components', permanent: true },
    { source: '/components/:slug', destination: '/docs/components/:slug', permanent: true },
    { source: '/patterns', destination: '/docs/patterns', permanent: true },
    { source: '/patterns/:slug', destination: '/docs/patterns/:slug', permanent: true },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: cspHeader },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
