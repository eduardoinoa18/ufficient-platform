/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Ensure CSS is properly handled
        optimizeCss: true,
    },
    compiler: {
        // Remove console.logs in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Ensure proper static file handling
    trailingSlash: false,
}

module.exports = nextConfig
