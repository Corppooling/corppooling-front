/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      main: ['Oswald', 'sans-serif'],
      content: ['Lato', 'sans-serif'],
    },

    colors: {
      white: 'rgb(var(--color-white) / <alpha-value>)',

      // black shades
      black: {
        base: 'rgb(var(--color-black-base) / <alpha-value>)',
        light: 'rgb(var(--color-black-light) / <alpha-value>)',
      },

      main: {
        base: 'rgb(var(--color-main-base) / <alpha-value>)',
      },

      content: {
        base: 'rgb(var(--color-content-base) / <alpha-value>)',
        light: 'rgb(var(--color-content-light) / <alpha-value>)',
        xlight: 'rgb(var(--color-content-xlight) / <alpha-value>)',
        glight: 'rgb(var(--color-content-glight) / <alpha-value>)',
        flight: 'rgb(var(--color-content-flight) / <alpha-value>)',
      },

      error: {
        base: 'rgb(var(--color-error-base) / <alpha-value>)',
      },

      contextual: {
        1: 'rgb(var(--color-contextual-1) / <alpha-value>)',
        2: 'rgb(var(--color-contextual-2) / <alpha-value>)',
        3: 'rgb(var(--color-contextual-3) / <alpha-value>)',
        4: 'rgb(var(--color-contextual-4) / <alpha-value>)',
      },
    },

    extend: {
      animation: {
        ripple: 'ripple .4s linear',
        floating: 'floating 6s ease-in-out infinite alternate',
      },

      keyframes: {
        ripple: {
          '0%': {
            opacity: '1',
            transform: 'scale(0)',
          },

          '100%': {
            opacity: '0',
            transform: 'scale(2.5)',
          },
        },
        floating: {
          '0%': {
            transform: 'translateY(0px)',
          },
          '25%': {
            rotate: '10deg',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0px)',
            rotate: '-10deg',
          },
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [],
};
