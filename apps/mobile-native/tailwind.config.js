/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f3ff',
                    100: '#e0e7ff',
                    500: '#6C00FF',
                    600: '#5B00D9',
                    700: '#4A00B3',
                    900: '#29006E'
                },
                secondary: {
                    400: '#4CD7F8',
                    500: '#2CC5F0'
                }
            },
            fontFamily: {
                'montserrat': ['Montserrat'],
                'poppins': ['Poppins'],
                'inter': ['Inter'],
                'roboto': ['Roboto']
            }
        },
    },
    plugins: [],
}
