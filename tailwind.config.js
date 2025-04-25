/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': {
          'bg': '#1f1f1f',
          'surface': '#2a2a2a',
          'text': '#e6e6e6',
          'accent': '#00ffff',
          'muted': '#808080',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 