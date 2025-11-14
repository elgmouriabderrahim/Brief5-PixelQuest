/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.{html,js,css}',
    './**/*.{html,js,css}',
    '!./node_modules/**/*'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
