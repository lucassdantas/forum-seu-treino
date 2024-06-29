/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "orange-seu-treino":"#FFB901",
        "yellow-seu-treino":"#F3D880",
        "red-seu-treino":"#FC0000",
      }
    },
  },
  plugins: [],
}

