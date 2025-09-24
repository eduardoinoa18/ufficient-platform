// @ts-check
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true
  },
  // Enable if behind reverse proxy
  // headers: async () => [
  //   {
  //     source: '/(.*)',
  //     headers: [
  //       { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  //       { key: 'X-Content-Type-Options', value: 'nosniff' },
  //       { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
  //     ]
  //   }
  // ]
};

module.exports = withPWA(nextConfig);
