import { useRuntimeConfig } from '#app'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { computed, readonly } from 'vue'
import type { DeepRequired, ModuleOptions } from '../../module'
import type { Theme } from '../types'

export const useTheme = () => {
  const config = useRuntimeConfig().public
    .materialYu as DeepRequired<ModuleOptions>
  const themePreference = useStorage<Theme>(
    'material-yu:theme',
    () => config.theme,
  )
  const isSystemDark = usePreferredDark()

  const resolvedTheme = readonly(
    computed<Exclude<Theme, 'system'>>(() => {
      if (themePreference.value === 'system')
        return isSystemDark.value ? 'dark' : 'light'
      return themePreference.value
    }),
  )

  return {
    themePreference,
    resolvedTheme,
  }
}
