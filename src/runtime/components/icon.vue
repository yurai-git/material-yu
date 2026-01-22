<template>
  <span
    class="yu-icon yu-component"
    :aria-hidden="ariaHidden"
    :role="role"
    translate="no"
  >
    <slot>{{ yuIconName }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { computed, useAttrs, toRef } from 'vue';
import { useTheme } from '@material-yu/use-theme';

/**
 * Utility functions
 */

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

/**
 * Properties and states
 */

const props = defineProps({
  yuIconName: {
    type: String,
    default: 'search',
  },
  yuStyle: {
    type: Object as import('vue').PropType<{
      weight?: number;
      fill?: boolean;
      emphasis?: boolean;
      size?: number;
    }>,
    default: () => ({
      weight: 400,
      fill: false,
      emphasis: false,
      size: 24,
    }),
  },
});

/**
 * Font variations
 */

const { isLightTheme } = useTheme();

const gradFallback = computed(() => (isLightTheme.value ? 0 : -25));
const opsz = computed(() => clamp(props.yuStyle.size ?? 24, 20, 48));
const wght = computed(() => clamp(props.yuStyle.weight ?? 400, 100, 700));
const fill = computed(() => (props.yuStyle.fill ? 1 : 0));
const grad = computed(() =>
  props.yuStyle.emphasis ? 200 : gradFallback.value,
);

/**
 * WAI-ARIA attributes
 */

const attributes = useAttrs();
const ariaLabel = toRef(attributes, 'aria-label');
const ariaHidden = computed(() => (!ariaLabel.value ? 'true' : undefined));
const role = computed(() => (ariaLabel.value ? 'img' : undefined));
</script>

<style lang="scss" scoped>
.yu-icon {
  // font-size: v-bind("finalSize + 'px'");
  font-variation-settings:
    'FILL' v-bind(fill),
    'wght' v-bind(wght),
    'GRAD' v-bind(grad),
    'opsz' v-bind(opsz);
  user-select: none;
  // font-family: v-bind(styleValue);
  width: 1em;
  height: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: font-variation-settings
    var(--md-sys-motion-expressive-fast-effects);
}
</style>
