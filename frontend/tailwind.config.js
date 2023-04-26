/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    spacing: {
      0: '0px',
      1: '8px',
      2: '12px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '48px',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        heebo: ['Heebo', 'sans-serif'],
      },
      colors: {
        'purple': {
          DEFAULT: '#731EA7',
          100: '#FCEBFF',
          200: '#E6A5F6',
          300: '#C774E4',
          400: '#A24DCA',
          500: '#731EA7',
        }, black: '#333333',
        gray: '#AFADB9',
        red: '#BB0038',
        'green': {
          DEFAULT: '#26CDBA',
          100: '#D3FCE8',
          200: '#A8FADA',
          300: '#7AF0CD          ',
          400: '#57E1C4          ',
          500: '#26CDBA',
        }
      },
    },
    maxWidth: {
      6: '96px',
      12: '192px',
    },
    minWidth: {
      8: '128px',
    },
    maxHeight: {
      12: '192px',
    },
  },
  plugins: [],
};
