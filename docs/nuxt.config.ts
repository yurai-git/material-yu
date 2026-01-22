// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '../src/module'],
  devtools: { enabled: false },
  content: {
    renderer: {
      anchorLinks: false,
    },
  },
  compatibilityDate: '2025-07-15',
});
