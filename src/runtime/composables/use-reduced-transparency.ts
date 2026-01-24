import { useRuntimeConfig } from '#app'
import { useMediaQuery, useStorage } from '@vueuse/core'
import { computed, readonly } from 'vue'
import type { DeepRequired, ModuleOptions } from '../../module'
import type { ReducedTransparency } from '../types'

export const useReducedTransparency = () => {
  const config = useRuntimeConfig().public
    .materialYu as DeepRequired<ModuleOptions>
  const reducedTransparencyPreference = useStorage<ReducedTransparency>(
    'material-yu:reduced-transparency',
    () => config.reducedTransparency,
  )
  const isSystemReducedTransparency = useMediaQuery(
    '(prefers-reduced-transparency: reduce)',
  )

  const resolvedReducedTransparency = readonly(
    computed<Exclude<ReducedTransparency, 'system'>>(() => {
      if (reducedTransparencyPreference.value === 'system')
        return isSystemReducedTransparency.value ? 'reduced' : 'unreduced'
      return reducedTransparencyPreference.value
    }),
  )

  return {
    reducedTransparencyPreference,
    resolvedReducedTransparency,
  }
}
