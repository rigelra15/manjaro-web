/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend-deca': ['Lexend Deca', 'sans-serif'],
      },
      colors: {
        "red-manjaro": "#DC143C",
        "cyan-manjaro": "#49B8D3",
        "yellow-manjaro": "#FFD801",
        "blue-manjaro": "#0066CC",
        "light-white": "rgba(255, 255, 255, 0.17)",
      }
    },
  },
  plugins: [],
}

