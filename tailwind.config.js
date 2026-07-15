/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#059669',
          800: '#065F46',
          900: '#064E3B', /* Dark Green in Design */
          DEFAULT: '#059669',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D4A017',
          DEFAULT: '#D4A017',
        },
        warm: { 
          50: '#FDFCF8',
          100: '#FAF9F6', /* Main Background */
          200: '#F5F3EB',
          DEFAULT: '#FAF9F6' 
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        sans:   ['Cairo', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'primary': '0 8px 24px rgba(5,150,105,0.25)',
        'gold':    '0 8px 24px rgba(212,160,23,0.25)',
        'glass':   '0 4px 24px rgba(0,0,0,0.06)',
        'card':    '0 2px 16px rgba(0,0,0,0.04)',
        'floating': '0 12px 32px rgba(0,0,0,0.08)',
      },
      animation: {
        'ripple':    'ripple 0.8s ease-out forwards',
        'float':     'float 3s ease-in-out infinite',
        'pulse-soft':'pulse-soft 2s ease-in-out infinite',
        'count-up':  'countUp 0.4s ease-out forwards',
        'slide-up':  'slideUp 0.3s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        ripple:    { '0%': {transform:'scale(0)',opacity:'0.5'}, '100%': {transform:'scale(4)',opacity:'0'} },
        float:     { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-8px)'} },
        'pulse-soft':{ '0%,100%': {opacity:'1'}, '50%': {opacity:'0.6'} },
        countUp:   { from:{transform:'translateY(8px)',opacity:'0'}, to:{transform:'translateY(0)',opacity:'1'} },
        slideUp:   { from:{transform:'translateY(16px)',opacity:'0'}, to:{transform:'translateY(0)',opacity:'1'} },
        fadeIn:    { from:{opacity:'0'}, to:{opacity:'1'} },
      },
    },
  },
  plugins: [],
}
