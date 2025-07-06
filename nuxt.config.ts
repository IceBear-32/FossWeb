import svgLoader from 'vite-svg-loader'


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/color_defs.css', ],
  ssr: true,
  vite: {
    plugins: [svgLoader()]
  },
  build: {
    transpile: ['qrcode.vue']
  },
  nitro: {
    preset: 'cloudflare'
  }
})
