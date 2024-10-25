/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt323: ['VT323', 'monospace'], // Define Orbitron in Tailwind
        ethnocentric: ['var(--font-ethnocentric)', 'sans-serif'], 
        iceberg: ['var(--font-iceberg)', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'], // Adding Orbitron to Tailwind

        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'navcolor': "#040d13",
        'buttonc' : "#185b6e",
        'buttonhover' : "#399bac",
      },
    },
  },
  plugins: [],
};

