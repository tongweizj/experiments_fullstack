// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  server: {
    host: '0.0.0.0', // 修改成这个就可以适配所有网卡了
    port: 3000, // 这里修改端口
  },
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
  buildModules: ['@nuxtjs/eslint-module'],
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
}
