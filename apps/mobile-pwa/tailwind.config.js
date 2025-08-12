/** @type {import('tailwindcss').Config} */
const sharedConfig = require('../../packages/config/tailwind.config.js');

module.exports = {
    ...sharedConfig,
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        // Include shared packages
        '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    ],
};
