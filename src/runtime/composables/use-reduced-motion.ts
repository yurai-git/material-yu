import { useStorage } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

export const useReducedMotion = () => {
  const selectedReducedMotion = useStorage(
    'material-yu:reduced-motion',
    () => 'system',
  );

  const isSystemReducedMotion = ref(false);

  onMounted(() => {
    const reducedMotionMatcher = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    isSystemReducedMotion.value = reducedMotionMatcher.matches;
    reducedMotionMatcher.addEventListener(
      'change',
      (e) => (isSystemReducedMotion.value = e.matches),
    );
  });

  const currentReducedMotion = computed(() => {
    if (selectedReducedMotion.value === 'system')
      return isSystemReducedMotion.value ? 'reduced' : 'unreduced';
    return selectedReducedMotion.value;
  });

  const setReducedMotion = (value: 'system' | 'reduced' | 'unreduced') => {
    selectedReducedMotion.value = value;
  };

  const isUnreducedMotion = computed(
    () => currentReducedMotion.value === 'unreduced',
  );
  const isReducedMotion = computed(
    () => currentReducedMotion.value === 'reduced',
  );

  return {
    selectedReducedMotion,
    currentReducedMotion,
    setReducedMotion,
    isUnreducedMotion,
    isReducedMotion,
  };
};
