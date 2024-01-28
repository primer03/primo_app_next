const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'] // Ensure the font name matches the imported font
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes:{
        'heartBeat':{
          '0%':{transform:'scale(1)'},
          '14%':{transform:'scale(1.3)'},
          '28%':{transform:'scale(1)'},
          '42%':{transform:'scale(1.3)'},
          '70%':{transform:'scale(1)'},
        },
        'SequenceLeftRight':{
          '0%':{transform:'rotate(-10deg)'},
          '50%':{transform:'rotate(10deg)'},
          '100%':{transform:'rotate(-10deg)'},
        },
        'slideInRight':{
          '0%':{transform:'translateX(100%)'},
          '100%':{transform:'translateX(0)'},
        },
        'slideInDown':{
          '0%':{transform:'translateY(-100%)'},
          '100%':{transform:'translateY(0)'},
        },
      },
      animation:{
        'heartBeat':'heartBeat 1s ease-in-out',
        'SequenceLeftRight':'SequenceLeftRight 1s ease-in-out infinite',
        'slideInRight':'slideInRight 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        'slideInDown':'slideInDown 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
      }
    },
  },
  plugins: [require("daisyui")],
}
