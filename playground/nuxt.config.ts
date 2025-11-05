export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Material Yu playground',
    },
  },
  compatibilityDate: '2025-09-22',
  vite: {
    server: {
      allowedHosts: [],
    },
  },
  materialYu: {
    theme: 'system',
    contrast: 'system',
  },
})
