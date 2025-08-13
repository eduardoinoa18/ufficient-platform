/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
    transpilePackages: ['@ufficient/ui', '@ufficient/core'],
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        return [
            // Proxy admin and shared APIs to Admin app (port 3001)
            {
                source: '/api/admin/:path*',
                destination: 'http://localhost:3001/api/admin/:path*',
            },
            {
                source: '/api/auth/:path*',
                destination: 'http://localhost:3001/api/auth/:path*',
            },
            {
                source: '/api/metrics',
                destination: 'http://localhost:3001/api/metrics',
            },
            {
                source: '/api/users',
                destination: 'http://localhost:3001/api/users',
            },
            {
                source: '/api/tasks',
                destination: 'http://localhost:3001/api/tasks',
            },
        ];
    },
};

module.exports = withPWA(nextConfig);
