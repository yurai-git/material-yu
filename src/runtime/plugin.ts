import { defineNuxtPlugin } from '#app'
import { useTheme, useContrast, watch } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.client) {
    const { theme } = useTheme()
    const { contrast } = useContrast()

    const updateHtmlClass = () => {
      const isDark = theme.value === 'dark' || (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      const themeClass = isDark ? 'dark' : 'light'

      let contrastClass = ''
      if (contrast.value === 'system') {
        if (window.matchMedia('(prefers-contrast: more)').matches) {
          contrastClass = '-high-contrast'
        }
      }
      else if (contrast.value === 'medium') {
        contrastClass = '-medium-contrast'
      }
      else if (contrast.value === 'high') {
        contrastClass = '-high-contrast'
      }

      document.documentElement.className = themeClass + contrastClass
    }

    watch([theme, contrast], updateHtmlClass, { immediate: true })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateHtmlClass)
    window.matchMedia('(prefers-contrast: more)').addEventListener('change', updateHtmlClass)
  }
})
