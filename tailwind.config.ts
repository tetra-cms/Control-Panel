/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          primary: '#000000',
          secondary: '#252525'
        },
        secondary: {
          primary: '#FFFFFF',
          light: '#eeeeee',
          darklight: '#e7e7e7',
          wrapper: {
            dark: '#000000',
            invert: '#ffffff',
            light: '#b9b9b9'
          }
        }
      }
    }
  },

  plugins: []
}