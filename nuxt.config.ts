import svgLoader from 'vite-svg-loader'


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/color_defs.css', ],
  ssr: true,
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
    },
  },
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
