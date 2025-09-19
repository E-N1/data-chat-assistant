/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
          animation: {
            bounce: 'bounce 1s infinite',
          },
          transitionDelay: {
            150: '150ms',
            300: '300ms',
          },
        },
      },
    plugins: [],

};