/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d8efff',
          500: '#4ab8ff',
          600: '#1e93e0',
          700: '#1672b4',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.18)',
      },
    },
  },
  plugins: [],
};
