export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  plugins: [
    { src: '~/plugins/vue3-toastify.ts', }
  ],
  hooks: {
    'pages:extend' (pages) {
      pages.push({
        name: 'files',
        path: '/files/:hash?',
        file: '~/pages/files/[hash].vue',
      })
    },
  },
  devtools: { enabled: true, },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://127.0.0.1:9456/',
      SOCKET_URL: process.env.SOCKET_URL || 'ws://127.0.0.1:9458/',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ['~/assets/styles/main.sass'],
})
