/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeCss: true,
    },
    compiler: {
        // Remove console.logs in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Ensure CSS is included in production builds
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
    // Force CSS compilation
    cssLoaderOptions: {
        url: false,
    },
}

module.exports = nextConfig
