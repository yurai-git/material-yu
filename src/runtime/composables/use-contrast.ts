import { useRuntimeConfig } from '#app'
import { useStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import type { ModuleOptions } from '../../module'

export const useContrast = () => {
  const config = useRuntimeConfig().public.materialYu as ModuleOptions
  const contrast = useStorage('material-yu:contrast', () => config.contrast)

  const isSystemHighContrast = ref(false)

  onMounted(() => {
    const contrastMatcher = window.matchMedia('(prefers-contrast: more)')
    isSystemHighContrast.value = contrastMatcher.matches
    contrastMatcher.addEventListener('change', e => (isSystemHighContrast.value = e.matches))
  })

  const currentContrast = computed(() => {
    if (contrast.value === 'system') return isSystemHighContrast.value ? 'high' : 'default'
    return contrast.value
  })

  const setContrast = (value: 'system' | 'default' | 'medium' | 'high') => {
    contrast.value = value
  }

  const isDefaultContrast = computed(() => currentContrast.value === 'default')
  const isMediumContrast = computed(() => currentContrast.value === 'medium')
  const isHighContrast = computed(() => currentContrast.value === 'high')

  return {
    contrast,
    currentContrast,
    setContrast,
    isDefaultContrast,
    isMediumContrast,
    isHighContrast,
  }
}
