/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Emerald primary
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        african: {
          gold: '#f59e0b',
          amber: '#d97706',
          sunset: '#f97316',
          coral: '#ef4444',
          savannah: '#10b981',
          slate: '#0f172a',
          obsidian: '#090d16'
        },
        fahmrise: {
          teal: '#0B2F2D',
          'teal-dark': '#072120',
          'teal-light': '#124542',
          gold: '#E5B869',
          'gold-light': '#F0C775',
          'gold-dark': '#C99D4E',
          cream: '#FAF8F5',
          'cream-dark': '#F0EBE1',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
