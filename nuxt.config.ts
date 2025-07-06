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
  },
  app: {
    head: {
      link: [{rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'}]
    }
  }
})
