/** @type {import('next').NextConfig} */
const enablePWA = !(process.env.NEXT_DISABLE_PWA === '1' || process.env.NEXT_DISABLE_PWA === 'true');
const withPWA = enablePWA
    ? require('next-pwa')({
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development'
    })
    : (config) => config;

const nextConfig = {
    transpilePackages: ['@ufficient/ui', '@ufficient/core'],
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        const adminUrl = process.env.ADMIN_API_URL || 'http://localhost:3001';
        return [
            // Proxy all API calls to the Admin app
            {
                source: '/api/:path*',
                destination: `${adminUrl}/api/:path*`,
            },
        ];
    },
};

module.exports = withPWA(nextConfig);
