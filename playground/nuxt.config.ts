export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: false },
  compatibilityDate: '2025-09-22',
  materialYu: {
    components: {
      yuIcon: {
        // size: 256,
      },
    },
  },
})
