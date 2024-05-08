/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        "primary": "#ffa300"
      }
    },
  },
  plugins: [require('daisyui'),],
}

