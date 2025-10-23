export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  compatibilityDate: '2025-09-22',
  materialYu: {
    theme: 'system',
    contrast: 'system',
  },
})
