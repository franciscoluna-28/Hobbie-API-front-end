/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        main: "#00C9A7",
        accent: "#12141A",
        accentHover: "#343a4b"
      },

    },
  },
  plugins: [],
}