import { useRuntimeConfig } from '#app'
import { useMediaQuery, useStorage } from '@vueuse/core'
import { computed, readonly } from 'vue'
import type { DeepRequired, ModuleOptions } from '../../module'
import type { ReducedMotion } from '../types'

export const useReducedMotion = () => {
  const config = useRuntimeConfig().public
    .materialYu as DeepRequired<ModuleOptions>
  const reducedMotionPreference = useStorage<ReducedMotion>(
    'material-yu:reduced-motion',
    () => config.reducedMotion,
  )
  const isSystemReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  )

  const resolvedReducedMotion = readonly(
    computed<Exclude<ReducedMotion, 'system'>>(() => {
      if (reducedMotionPreference.value === 'system')
        return isSystemReducedMotion.value ? 'reduced' : 'unreduced'
      return reducedMotionPreference.value
    }),
  )

  return {
    reducedMotionPreference,
    resolvedReducedMotion,
  }
}
