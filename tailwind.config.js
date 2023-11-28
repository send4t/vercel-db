const { nextui } = require("@nextui-org/react");
import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {
      colors: {
        tealCyan: '#337179',
        lightCyan: '#49c5b1',
      },
    },
  },

  darkMode: "class",

  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
              // ... other color shades
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "rgb(17,24,39)",
            foreground: "#ECEDEE",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
              // ... other color shades
            },
            // ... rest of the colors
          },
        },
      },
    }),
  ],
}