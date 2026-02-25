// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  routeRules: {
    // Add cors headers
    '/**': { cors: true },
  },
  runtimeConfig: {
    // can be overridden by NUXT_API_SECRET environment variable
    public: {
      newsKey: '',
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
})
