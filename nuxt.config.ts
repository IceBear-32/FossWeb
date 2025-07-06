import svgLoader from 'vite-svg-loader'


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/color_defs.css', 'bootstrap-icons/font/bootstrap-icons.css'],
  ssr: true,
  vite: {
    plugins: [svgLoader()]
  },
  build: {
    transpile: ['qrcode.vue']
  }
})
