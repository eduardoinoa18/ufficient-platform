/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // no experimental optimizeCss
    },
    compiler: {
        // Remove console.logs in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Ensure proper static file handling
    trailingSlash: false,
}

module.exports = nextConfig
