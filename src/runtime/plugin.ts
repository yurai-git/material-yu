import { defineNuxtPlugin } from '#app'
import { useMaterialYu, watch } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.client) {
    const { colorScheme, contrast } = useMaterialYu()

    const updateHtmlClass = () => {
      const isDark = colorScheme.value === 'dark' || (colorScheme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      const themeClass = isDark ? 'dark' : 'light'

      let contrastClass = ''
      if (contrast.value === 'system') {
        if (window.matchMedia('(prefers-contrast: more)').matches) {
          contrastClass = '-high-contrast'
        }
        else if (window.matchMedia('(prefers-contrast: less)').matches) {
          contrastClass = '-medium-contrast'
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

    watch([colorScheme, contrast], updateHtmlClass, { immediate: true })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateHtmlClass)
    window.matchMedia('(prefers-contrast: more)').addEventListener('change', updateHtmlClass)
    window.matchMedia('(prefers-contrast: less)').addEventListener('change', updateHtmlClass)
  }
})
