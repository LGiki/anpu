/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'rainbow-1': 'linear-gradient(135deg, #e1dbff, #d5eeff, #feffdb, #e8fad7, #ffe4cc, #ffcccc)',
        'rainbow-2': 'linear-gradient(135deg, #BCC4FF, #B1E9FF, #BCFFEE, #FEFFDD, #D1FF9B)',
        'rainbow-3': 'linear-gradient(135deg, #87D8FD, #BBE9A5, #FFFBAC, #FFC79A, #FF9DA8)',
        'purple-1': 'linear-gradient(135deg, #957DAD, #E0BBE4, #D291BC, #FFDFD3)',
        dawn: 'linear-gradient(45deg, #7E5072, #AB5A74, #E27E7E, #EA9E79, #E9B661, #EB8126)',
        fire: 'linear-gradient(45deg, #F5BCBC, #FAD1B6, #FFE0BD, #FFE8C7, #F7F2DA)',
      },
    },
  },
  plugins: [],
}
