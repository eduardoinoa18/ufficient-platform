/******** Tailwind config ********/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2E6BFF',
          50: '#EEF4FF',
          100: '#D9E7FF',
          200: '#B4CEFF',
          300: '#8FB6FF',
          400: '#6A9EFF',
          500: '#2E6BFF',
          600: '#1C4FDB',
          700: '#143AA7',
          800: '#0E2873',
          900: '#091B4D'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
