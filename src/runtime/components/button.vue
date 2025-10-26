<template>
  <button
    class="yu-button yu-component"
    type="button"
  >
    <slot />
    <YuInteractive />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { YuButtonShapeValue, MotionSchemeValue } from '../types'
import { useRuntimeConfig } from '#app'
import { useMotion } from '../composables/use-motion'

/**
 * Properties and states
 */

const runtimePublic = useRuntimeConfig().public
const materialYu = runtimePublic.materialYu
const defaultConfig = materialYu.components.button

const props = defineProps({
  yuMotionScheme: {
    type: String as () => MotionSchemeValue,
    default: undefined,
  },
  yuShape: {
    type: String as () => YuButtonShapeValue,
    default: undefined,
  },
})

const finalMotionScheme = computed<MotionSchemeValue>(() => props.yuMotionScheme ?? (materialYu.motionScheme as MotionSchemeValue))
const finalShape = computed(() => props.yuShape ?? defaultConfig.shape)

const borderRadius = computed(() => {
  if (finalShape.value === 'square') {
    return 'var(--md-sys-shape-corner-medium)'
  }
  return 'calc(var(--md-comp-button-container-height, 40px) / 2)'
})
const borderRadiusMotion = useMotion(finalMotionScheme.value, {
  duration: 'fast',
  target: 'spatial',
})
</script>

<style lang="scss" scoped>
@use '../assets/stylesheets/elevation';
@use '../assets/stylesheets/type-scales/baseline';

.yu-button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--md-comp-button-container-color, var(--md-sys-color-primary));
  box-shadow: elevation.elevation(0);
  color: var(--md-comp-button-label-color, var(--md-sys-color-on-primary));
  height: var(--md-comp-button-container-height, 40px);
  @include baseline.typescale(label, large);
  --md-comp-button-icon-size: 20px;
  border-radius: var(--md-comp-button-shape, v-bind(borderRadius));
  padding-inline: var(--md-comp-button-leading-space, 24px) var(--md-comp-button-trailing-space, 24px);
  gap: var(--md-comp-button-between-icon-label-space, 8px);
  transition: border-radius v-bind(borderRadiusMotion);

  &:active {
    border-radius: var(--md-comp-button-shape-pressed-morph, 8px);
  }
  &:disabled {
    background-color: var(--md-comp-button-disabled-container-color, var(--md-sys-color-on-surface));
  }
}
</style>
