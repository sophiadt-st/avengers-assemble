/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '4rem',
    },
    backgroundImage: {
      'hero': "url('/images/avengers-bg.jpeg')",
    },
  },
  plugins: [],
}
