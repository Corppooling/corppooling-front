/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      main: ["Oswald", "sans-serif"],
      content: ["Lato", "sans-serif"],
    },

    colors: {
      white: "rgb(var(--color-white) / <alpha-value>)",

      // black shades
      black: {
        base: "rgb(var(--color-black-base) / <alpha-value>)",
      },

      main: {
        base: "rgb(var(--color-main-base) / <alpha-value>)",
      },

      content: {
        base: "rgb(var(--color-content-base) / <alpha-value>)",
        light: "rgb(var(--color-content-light) / <alpha-value>)",
        xlight: "rgb(var(--color-content-xlight) / <alpha-value>)",
        glight: "rgb(var(--color-content-glight) / <alpha-value>)",
        flight: "rgb(var(--color-content-flight) / <alpha-value>)",
      },
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/line-clamp")],
};
