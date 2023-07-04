/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        main: "#00C9A7",
/*         accent: "#12141A", */
        accent: "#12141A",

        accentHover: "#343a4b"
      },

    },
  },
  plugins: [
      // eslint-disable-next-line no-undef
      require('flowbite/plugin')
]

}