export default defineNuxtConfig({
  modules: ['nuxt-icons', '@pinia/nuxt'],
  devtools: { enabled: true, },
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ['~/assets/styles/main.sass'],
})
