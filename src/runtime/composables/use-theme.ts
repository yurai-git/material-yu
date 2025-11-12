import { useRuntimeConfig } from '#app'
import { useStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import type { ModuleOptions } from '../../module'

export const useTheme = () => {
  const config = useRuntimeConfig().public.materialYu as ModuleOptions
  const theme = useStorage('material-yu:theme', () => config.theme)

  const isSystemDark = ref(false)

  onMounted(() => {
    const darkMatcher = window.matchMedia('(prefers-color-scheme: dark)')
    isSystemDark.value = darkMatcher.matches
    darkMatcher.addEventListener('change', e => (isSystemDark.value = e.matches))
  })

  const currentTheme = computed(() => {
    if (theme.value === 'system') return isSystemDark.value ? 'dark' : 'light'
    return theme.value
  })

  const setTheme = (value: 'system' | 'light' | 'dark') => {
    theme.value = value
  }

  const isLightTheme = computed(() => currentTheme.value === 'light')
  const isDarkTheme = computed(() => currentTheme.value === 'dark')

  return {
    theme,
    currentTheme,
    setTheme,
    isLightTheme,
    isDarkTheme,
  }
}
