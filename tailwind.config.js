/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sustain: {
          deep: '#0F2318',
          forest: '#183827',
          moss: '#245238',
          sage: '#447A5A',
          leaf: '#10B981',
          lime: '#84CC16',
          sand: '#F7F5F0',
          cream: '#FDFAF4',
          border: '#E3DFD5',
          darkText: '#18241C',
          mutedText: '#5A6E61'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(24, 56, 39, 0.08)',
        'glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
