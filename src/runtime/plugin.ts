import { defineNuxtPlugin } from '#app'
import {
  useContrast,
  useMotionScheme,
  useReducedMotion,
  useReducedTransparency,
  useTheme,
  watch,
} from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.client) {
    const { resolvedTheme } = useTheme()
    const { resolvedContrast } = useContrast()
    const { resolvedReducedMotion } = useReducedMotion()
    const { resolvedReducedTransparency } = useReducedTransparency()
    const { motionSchemePreference } = useMotionScheme()

    let previousThemeContrastClass = ''
    let previousReducedMotionClass = ''
    let previousReducedTransparencyClass = ''
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

    const updateReducedMotion = () => {
      let newReducedMotionClass = ''
      if (resolvedReducedMotion.value === 'reduced') {
        newReducedMotionClass = 'reduced-motion'
      }

      if (previousReducedMotionClass) {
        document.documentElement.classList.remove(previousReducedMotionClass)
      }
      if (newReducedMotionClass) {
        document.documentElement.classList.add(newReducedMotionClass)
      }
      previousReducedMotionClass = newReducedMotionClass
    }

    const updateReducedTransparency = () => {
      let newReducedTransparencyClass = ''
      if (resolvedReducedTransparency.value === 'reduced') {
        newReducedTransparencyClass = 'reduced-transparency'
      }

      if (previousReducedTransparencyClass) {
        document.documentElement.classList.remove(
          previousReducedTransparencyClass,
        )
      }
      if (newReducedTransparencyClass) {
        document.documentElement.classList.add(newReducedTransparencyClass)
      }
      previousReducedTransparencyClass = newReducedTransparencyClass
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
    watch(resolvedReducedMotion, updateReducedMotion, {
      immediate: true,
    })
    watch(resolvedReducedTransparency, updateReducedTransparency, {
      immediate: true,
    })
    watch(motionSchemePreference, updateMotionScheme, {
      immediate: true,
    })
  }
})
