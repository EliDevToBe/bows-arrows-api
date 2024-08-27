/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./api/public/*.{html,js}", "./style/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}

