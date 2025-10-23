import { computed } from 'vue'
import type { MotionSchemeValue, MotionDuration, MotionTarget } from '../types'

export interface MotionOptions {
  duration: MotionDuration
  target: MotionTarget
}

export const useMotion = (
  motionScheme: MotionSchemeValue,
  options: MotionOptions,
) => {
  const { duration, target } = options
  const motion = computed(() => `var(--md-sys-motion-${motionScheme}-${duration}-${target})`)
  return motion
}
