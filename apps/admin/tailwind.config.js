/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
                'poppins': ['var(--font-poppins)', 'Poppins', 'sans-serif'],
                'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
            },
            colors: {
                'ufficient-purple': '#6C00FF',
                'ufficient-blue': '#4CD7F8',
                'ufficient': {
                    purple: '#6C00FF',
                    blue: '#4CD7F8',
                    'purple-dark': '#29006E',
                    'blue-light': '#E3D9FF',
                },
            },
            backgroundImage: {
                'gradient-ufficient': 'linear-gradient(135deg, #6C00FF 0%, #4CD7F8 100%)',
            }
        },
    },
    plugins: [],
}
