import { useRuntimeConfig, useState } from '#app'
import type { ModuleOptions } from '../../module'

export const useMaterialYu = () => {
  const config = useRuntimeConfig().public.materialYu as ModuleOptions
  const colorScheme = useState('material-yu:color-scheme', () => config.colorScheme)
  const contrast = useState('material-yu:contrast', () => config.contrast)

  const setColorScheme = (value: 'system' | 'light' | 'dark') => {
    colorScheme.value = value
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
    colorScheme,
    setColorScheme,
    contrast,
    setContrast,
    toToken,
  }
}
