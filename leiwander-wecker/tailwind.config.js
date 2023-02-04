/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '2.5px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {

      height: {
        '18': '4.5rem',
      },
      colors: {
        'wien-it-blue': '#006274',
        'wien-it-blue-borders': '#003E4F',
         'whiteish': '#F2F2F2'
      },
    },
  },
  plugins: [],
}
