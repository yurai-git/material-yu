import { useRuntimeConfig } from '#app'
import { useStorage } from '@vueuse/core'
import type { ModuleOptions } from '../../module'

export const useMaterialYu = () => {
  const config = useRuntimeConfig().public.materialYu as ModuleOptions
  const theme = useStorage('material-yu:theme', () => config.theme)
  const contrast = useStorage('material-yu:contrast', () => config.contrast)

  const setColorScheme = (value: 'system' | 'light' | 'dark') => {
    theme.value = value
  }

  const setContrast = (value: 'system' | 'default' | 'medium' | 'high') => {
    contrast.value = value
  }

  const toToken = (systemToken: string, componentToken?: string) => {
    if (componentToken) {
      return `var(--${componentToken.replace(/\./g, '-')}, var(--${systemToken.replace(/\./g, '-')}))`
    }
    else {
      return `var(--${systemToken.replace(/\./g, '-')})`
    }
  }

  return {
    config,
    theme,
    setColorScheme,
    contrast,
    setContrast,
    toToken,
  }
}
