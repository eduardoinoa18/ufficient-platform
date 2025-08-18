/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Apps
        "../../apps/*/src/**/*.{js,ts,jsx,tsx,mdx}",
        // Packages  
        "../*/src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // UFFICIENT Brand Fonts
                'montserrat': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
                'poppins': ['var(--font-poppins)', 'Poppins', 'sans-serif'],
                'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
            },
            colors: {
                // UFFICIENT Brand Colors
                'ufficient': {
                    // Primary Electric Violet
                    'purple': '#6C00FF',
                    'purple-dark': '#29006E',
                    'purple-light': '#E3D9FF',

                    // Accent Mint Blue  
                    'blue': '#4CD7F8',
                    'blue-dark': '#0BC5EA',
                    'blue-light': '#E6FFFA',

                    // Success & Actions
                    'green': '#00D27F',
                    'green-dark': '#00B86B',
                    'green-light': '#E6FFF5',

                    // Neutral Grays
                    'gray': {
                        50: '#F9FAFB',
                        100: '#F3F4F6',
                        200: '#E5E7EB',
                        300: '#D1D5DB',
                        400: '#9CA3AF',
                        500: '#6B7280',
                        600: '#4B5563',
                        700: '#374151',
                        800: '#1F2937',
                        900: '#111827',
                    }
                },
                primary: {
                    50: '#f0f3ff',
                    100: '#e0e7ff',
                    500: '#6C00FF', // brand purple
                    600: '#5B00D9',
                    700: '#4A00B3',
                    900: '#29006E',
                },
            },
            backgroundImage: {
                // UFFICIENT Brand Gradients
                'gradient-ufficient': 'linear-gradient(135deg, #6C00FF 0%, #4CD7F8 100%)',
                'gradient-purple': 'linear-gradient(135deg, #6C00FF 0%, #29006E 100%)',
                'gradient-blue': 'linear-gradient(135deg, #4CD7F8 0%, #0BC5EA 100%)',
                'gradient-success': 'linear-gradient(135deg, #00D27F 0%, #00B86B 100%)',
            },
            animation: {
                // UFFICIENT Brand Animations
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #6C00FF' },
                    '100%': { boxShadow: '0 0 20px #6C00FF, 0 0 30px #4CD7F8' },
                },
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            }
        },
    },
    plugins: [],
};
