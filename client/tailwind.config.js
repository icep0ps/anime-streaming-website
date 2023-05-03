/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: '#161616',
      main: '#5e05ee',
      secondBg: '#1f1f1f',
      thirdBg: '#2e2e2e',
      white: '#FFFFFF',
    },
    extend: {
      colors: {},
    },
    fontFamily: {
      custom: ['Inter'],
    },
    extend: {
      fontFamily: ' Inter',
    },
  },
  plugins: [],
};
