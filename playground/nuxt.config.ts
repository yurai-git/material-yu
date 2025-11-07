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
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com/',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com/',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,XTRA@8..144,150,900,600&display=swap',
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
  },
})
