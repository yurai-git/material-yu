import { defineNuxtPlugin } from '#app'
import { useTheme, useContrast, watch } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.client) {
    const { selectedTheme } = useTheme()
    const { selectedContrast } = useContrast()

    const updateHtmlClass = () => {
      const isDark = selectedTheme.value === 'dark' || (selectedTheme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      const themeClass = isDark ? 'dark' : 'light'

      let contrastClass = ''
      if (selectedContrast.value === 'system') {
        if (window.matchMedia('(prefers-contrast: more)').matches) {
          contrastClass = '-high-contrast'
        }
      }
      else if (selectedContrast.value === 'medium') {
        contrastClass = '-medium-contrast'
      }
      else if (selectedContrast.value === 'high') {
        contrastClass = '-high-contrast'
      }

      document.documentElement.className = themeClass + contrastClass
    }

    watch([selectedTheme, selectedContrast], updateHtmlClass, { immediate: true })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateHtmlClass)
    window.matchMedia('(prefers-contrast: more)').addEventListener('change', updateHtmlClass)
  }
})
