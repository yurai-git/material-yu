import { useRuntimeConfig } from '#app'
import { useStorage } from '@vueuse/core'
import type { DeepRequired, ModuleOptions } from '../../module'
import type { MotionScheme } from '../types'

export const useMotionScheme = () => {
  const config = useRuntimeConfig().public
    .materialYu as DeepRequired<ModuleOptions>
  const motionSchemePreference = useStorage<MotionScheme>(
    'material-yu:motion-scheme',
    () => config.motionScheme,
  )

  return {
    motionSchemePreference,
  }
}
