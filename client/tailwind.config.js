/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      custom: ['Inter'],
    },
    extend: {
      fontFamily: ' Inter',
      colors: {
        dark: '#161616',
        main: '#1d4ed8',
        secondBg: '#1c1c1c',
        thirdBg: '#2e2e2e',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
