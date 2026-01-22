import { useStorage } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

export const useReducedTransparency = () => {
  const selectedReducedTransparency = useStorage(
    'material-yu:reduced-transparency',
    () => 'system',
  );

  const isSystemReducedTransparency = ref(false);

  onMounted(() => {
    const reducedTransparencyMatcher = window.matchMedia(
      '(prefers-reduced-transparency: reduce)',
    );
    isSystemReducedTransparency.value = reducedTransparencyMatcher.matches;
    reducedTransparencyMatcher.addEventListener(
      'change',
      (e) => (isSystemReducedTransparency.value = e.matches),
    );
  });

  const currentReducedTransparency = computed(() => {
    if (selectedReducedTransparency.value === 'system')
      return isSystemReducedTransparency.value ? 'reduced' : 'unreduced';
    return selectedReducedTransparency.value;
  });

  const setReducedTransparency = (
    value: 'system' | 'reduced' | 'unreduced',
  ) => {
    selectedReducedTransparency.value = value;
  };

  const isUnreducedTransparency = computed(
    () => currentReducedTransparency.value === 'unreduced',
  );
  const isReducedTransparency = computed(
    () => currentReducedTransparency.value === 'reduced',
  );

  return {
    selectedReducedTransparency,
    currentReducedTransparency,
    setReducedTransparency,
    isUnreducedTransparency,
    isReducedTransparency,
  };
};
