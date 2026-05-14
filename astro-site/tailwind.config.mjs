/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        green: '#10642a',
        'green-mid': '#2ecc71',
        'green-lt': '#e6f4ea'
      }
    },
  },
  plugins: [],
}
