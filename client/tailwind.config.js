/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'spin-slow': 'spin 1.5s linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translateX(-50%)',
          },
        },
      },
    },
  },
  plugins: [],
}