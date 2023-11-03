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
      colors:{
        tealCyan: '#337179',
        lightCyan:  '#49c5b1',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
