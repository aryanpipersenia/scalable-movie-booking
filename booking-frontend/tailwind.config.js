/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#E94560',     // The signature red/pink accent
        darkBase: '#1A1A2E',  // Deep navy background
        darkCard: '#16213E'   // Slightly lighter card background
      }
    },
  },
  plugins: [],
}