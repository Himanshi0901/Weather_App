/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Weather_App/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        aqi: {
          1: 'var(--aqi-1)',
          2: 'var(--aqi-2)',
          3: 'var(--aqi-3)',
          4: 'var(--aqi-4)',
          5: 'var(--aqi-5)',
        },
      },
    },
  },
  plugins: [],
}

