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
    reference: {
      color: {
        // sourceColor: '#E04443',
      },
      typography: {
        brandTypeface: ['Google Sans Flex'],
        plainTypeface: ['Google Sans Flex'],
      },
    },
  },
})
