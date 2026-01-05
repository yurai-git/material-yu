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
    iconStyle: 'Material Symbols Outlined',
    references: {
      color: {
        // sourceColor: '#E04443',
      },
      typography: {
        typefaces: {
          brand: ['Google Sans Flex'],
          plain: ['Google Sans'],
        },
      },
    },
  },
})
