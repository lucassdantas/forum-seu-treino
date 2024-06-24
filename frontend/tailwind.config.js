/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "orange-seu-treino":"#FFB900",
        "yellow-seu-treino":"#F1FC00",
        "red-seu-treino":"#FC0000",
      }
    },
  },
  plugins: [],
}

