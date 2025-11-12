import { useStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

export const useReducedTransparency = () => {
  const reducedTransparency = useStorage('material-yu:reduced-transparency', () => 'system')

  const isSystemReducedTransparency = ref(false)

  onMounted(() => {
    const reducedTransparencyMatcher = window.matchMedia('(prefers-reduced-transparency: reduce)')
    isSystemReducedTransparency.value = reducedTransparencyMatcher.matches
    reducedTransparencyMatcher.addEventListener('change', e => (isSystemReducedTransparency.value = e.matches))
  })

  const currentReducedTransparency = computed(() => {
    if (reducedTransparency.value === 'system') return isSystemReducedTransparency.value ? 'reduced' : 'unreduced'
    return reducedTransparency.value
  })

  const setReducedTransparency = (value: 'system' | 'reduced' | 'unreduced') => {
    reducedTransparency.value = value
  }

  const isUnreducedTransparency = computed(() => currentReducedTransparency.value === 'unreduced')
  const isReducedTransparency = computed(() => currentReducedTransparency.value === 'reduced')

  return {
    reducedTransparency,
    currentReducedTransparency,
    setReducedTransparency,
    isUnreducedTransparency,
    isReducedTransparency,
  }
}
