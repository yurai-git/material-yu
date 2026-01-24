import { defineNuxtPlugin } from '#app'
import { useContrast, useMotionScheme, useTheme, watch } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.client) {
    const { resolvedTheme } = useTheme()
    const { resolvedContrast } = useContrast()
    const { motionSchemePreference } = useMotionScheme()

    let previousThemeContrastClass = ''
    let previousMotionSchemeClass = ''

    const updateThemeContrast = () => {
      const themeClass = resolvedTheme.value
      let contrastClass = ''
      if (resolvedContrast.value === 'high') {
        contrastClass = 'high-contrast'
      }
      else if (resolvedContrast.value === 'medium') {
        contrastClass = 'medium-contrast'
      }

      const newClass = [themeClass, contrastClass].filter(Boolean).join('-')

      if (previousThemeContrastClass) {
        document.documentElement.classList.remove(previousThemeContrastClass)
      }
      document.documentElement.classList.add(newClass)
      previousThemeContrastClass = newClass
    }

    const updateMotionScheme = () => {
      const newMotionSchemeClass = motionSchemePreference.value

      if (previousMotionSchemeClass) {
        document.documentElement.classList.remove(previousMotionSchemeClass)
      }
      document.documentElement.classList.add(newMotionSchemeClass)
      previousMotionSchemeClass = newMotionSchemeClass
    }

    watch([resolvedTheme, resolvedContrast], updateThemeContrast, {
      immediate: true,
    })
    watch(motionSchemePreference, updateMotionScheme, {
      immediate: true,
    })
  }
})
