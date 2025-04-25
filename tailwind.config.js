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
          'bg': '#1a1a1a',
          'surface': '#2d2d2d',
          'text': '#d4d4d4',
          'accent': '#7c3aed',
          'muted': '#666666',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 