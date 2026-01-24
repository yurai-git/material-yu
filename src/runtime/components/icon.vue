<template>
  <span
    class="yu-component yu-icon"
    :aria-hidden="ariaHidden"
    :role="role"
    v-bind="$attrs"
    translate="no"
  >
    <slot>{{ yuIconName }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#app'
import { useTheme } from '@material-yu/use-theme'
import { computed, toRef, useAttrs } from 'vue'

const { resolvedTheme } = useTheme()
const iconStyle = useRuntimeConfig().public.materialYu.iconStyle

/**
 * Utility functions
 */

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)

/**
 * Properties
 */

const props = defineProps({
  yuIconName: {
    type: String,
    default: 'search',
  },
  yuFill: {
    type: Boolean,
    default: false,
  },
  yuWeight: {
    type: Number,
    default: 400,
  },
  yuEmphasis: {
    type: Boolean,
    default: false,
  },
  yuSize: {
    type: Number,
    default: 24,
  },
})

/**
 * Font variations
 */

const opticalSize = computed(() => clamp(props.yuSize, 20, 48))
const weight = computed(() => clamp(props.yuWeight, 100, 700))
const fill = computed(() => (props.yuFill ? 1 : 0))
const gradFallback = computed(() => (resolvedTheme.value === 'light' ? 0 : -25))
const grade = computed(() => (props.yuEmphasis ? 200 : gradFallback.value))

/**
 * Accessibility
 */

const attributes = useAttrs()
const ariaLabel = toRef(attributes, 'aria-label')
const ariaHidden = computed(() => (!ariaLabel.value ? 'true' : null))
const role = computed(() => (ariaLabel.value ? 'img' : null))
</script>

<style lang="scss" scoped>
.yu-icon {
  font-size: v-bind("yuSize + 'px'");
  font-variation-settings:
    'FILL' v-bind(fill),
    'wght' v-bind(weight),
    'GRAD' v-bind(grade),
    'opsz' v-bind(opticalSize);
  user-select: none;
  font-family: v-bind(iconStyle);
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: font-variation-settings var(--md-sys-motion-spring-fast-effects);
}
</style>
