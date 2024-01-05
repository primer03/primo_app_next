/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      animation:{
        'heartBeat':'heartBeat 1s ease-in-out',
        'SequenceLeftRight':'SequenceLeftRight 1s ease-in-out infinite',
      }
    },
  },
  plugins: [require("daisyui")],
}
