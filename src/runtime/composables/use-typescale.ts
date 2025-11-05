import { computed } from 'vue'
import type { TypescaleRole, TypescaleSize, TypescaleTone } from '../types'

export interface TypescaleOptions {
  role: TypescaleRole
  size: TypescaleSize
  tone: TypescaleTone
}

export const useTypescale = (
  options: TypescaleOptions,
) => {
  const { role, size, tone } = options
  const typescale = computed(() => `yu-typescale-` + (tone === 'emphasized' ? 'emphasized-' : '') + `${role}-${size}`)
  return typescale
}
