export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Material Yu playground',
      meta: [
        {
          name: 'description',
          content: 'Material Yu playground',
        },
      ],
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
    reference: {
      color: {
        sourceColor: '#7f7f7f',
      },
      typography: {
        brandTypeface: 'Roboto Flex',
      },
    },
  },
})
