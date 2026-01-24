import { useRuntimeConfig } from '#app'
import { useMediaQuery, useStorage } from '@vueuse/core'
import { computed, readonly } from 'vue'
import type { DeepRequired, ModuleOptions } from '../../module'
import type { Contrast } from '../types'

export const useContrast = () => {
  const config = useRuntimeConfig().public
    .materialYu as DeepRequired<ModuleOptions>
  const contrastPreference = useStorage<Contrast>(
    'material-yu:contrast',
    () => config.contrast,
  )
  const isSystemHighContrast = useMediaQuery('(prefers-contrast: more)')

  const resolvedContrast = readonly(
    computed<Exclude<Contrast, 'system'>>(() => {
      if (contrastPreference.value === 'system')
        return isSystemHighContrast.value ? 'high' : 'default'
      return contrastPreference.value
    }),
  )

  return {
    contrastPreference,
    resolvedContrast,
  }
}
