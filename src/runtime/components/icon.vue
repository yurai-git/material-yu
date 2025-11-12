<template>
  <span
    class="yu-icon yu-component"
    :aria-hidden="ariaHidden"
    :role="role"
  >
    <slot>{{ finalIconName }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#app'
import { computed, useAttrs, toRef, type Ref } from 'vue'
import { useTheme } from '@material-yu/use-theme'

/**
 * Utility functions
 */

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)
const getFontName = (style: string) => {
  switch (style) {
    case 'rounded': return 'Rounded'
    case 'sharp': return 'Sharp'
    default: return 'Outlined'
  }
}

/**
 * Properties and states
 */

const runtimePublic = useRuntimeConfig().public
const materialYu = runtimePublic.materialYu
const defaultConfig = materialYu.components.icon

const props = defineProps({
  yuIconName: {
    type: String,
    default: undefined,
  },
  yuStyle: {
    type: Object as () => {
      weight: number
      fill: boolean
      emphasis: boolean
      size: number
    },
    default: undefined,
  },
})

const finalWeight = computed(() => props.yuStyle?.weight ?? defaultConfig.weight)
const finalFill = computed(() => props.yuStyle?.fill ?? defaultConfig.fill)
const finalEmphasis = computed(() => props.yuStyle?.emphasis ?? defaultConfig.emphasis)
const finalSize = computed(() => props.yuStyle?.size ?? defaultConfig.size)
const finalIconName = computed(() => props.yuIconName ?? 'search')

/**
 * Font variations
 */

const { isLightTheme } = useTheme()

const gradFallback = computed(() => isLightTheme.value ? 0 : -25)
const opsz = computed(() => clamp(finalSize.value, 20, 48))
const wght = computed(() => clamp(finalWeight.value, 100, 700))
const fill = computed(() => finalFill.value ? 1 : 0)
const grad = computed(() => finalEmphasis.value ? 200 : gradFallback.value)
const styleValue = computed(() => `'Material Symbols ${getFontName(materialYu.iconStyle)}'`)

/**
 * WAI-ARIA attributes
 */

const attrs = useAttrs()
const ariaLabel = toRef(attrs, 'aria-label') as Ref<string | undefined>
const ariaHidden = computed(() => !ariaLabel.value ? 'true' : undefined)
const role = computed(() => ariaLabel.value ? 'img' : undefined)
</script>

<style lang="scss" scoped>
.yu-icon {
  font-size: v-bind("finalSize + 'px'");
  font-variation-settings:
  'FILL' v-bind(fill),
  'wght' v-bind(wght),
  'GRAD' v-bind(grad),
  'opsz' v-bind(opsz);
  user-select: none;
  font-family: v-bind(styleValue);
  width: 1em;
  height: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: font-variation-settings var(--md-sys-motion-expressive-fast-effects);
}
</style>
