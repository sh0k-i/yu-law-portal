/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-red': '#AB1522',
        'brand-cream': '#EDECE9',
        'brand-gray': '#9F9C8D',
      },
    },
  },
  plugins: [],
}
