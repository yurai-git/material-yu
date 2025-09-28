export default defineNuxtConfig({
  modules: ['../src/module'],
  materialYu: {
    components: {
      yuIcon: {
        // size: 256,
      }
    }
  },
  devtools: { enabled: false },
  compatibilityDate: '2025-09-22'
})
