<template>
  <span
    class="yu-icon"
    :aria-hidden="finalAriaHidden"
    :aria-label="ariaLabel"
    :role="finalRole"
  >
    <slot>{{ finalIconName }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { useHead, useRuntimeConfig } from '#app'
import { computed } from 'vue'

/**
 * Utility functions
 */

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)

const getFontName = (style: string) => {
  switch (style) {
    case 'rounded':
      return 'Rounded'
    case 'sharp':
      return 'Sharp'
    default:
      return 'Outlined'
  }
}

const buildFontUrl = (
  styleName: string,
  opsz: number,
  wght: number,
  fill: number,
  grad: string,
) =>
  `https://fonts.googleapis.com/css2?family=Material+Symbols+${styleName}:opsz,wght,FILL,GRAD@${opsz},${wght},${fill},${grad}`

/**
 * Properties and states
 */

const defaultConfig = useRuntimeConfig().public.materialYu.components.yuIcon

const props = defineProps<{
  yuStyle?: 'outlined' | 'rounded' | 'sharp'
  yuWeight?: number | string
  yuFill?: boolean | string
  yuEmphasis?: boolean | string
  yuSize?: number | string
  yuIconName?: string
  ariaLabel?: string
}>()

const finalStyle = computed(() => props.yuStyle ?? defaultConfig.style)
const finalWeight = computed(() => Number(props.yuWeight ?? defaultConfig.weight))
const finalFill = computed(() => {
  const fill = props.yuFill ?? defaultConfig.fill
  return fill === 'true' || fill === '' || fill === true
})
const finalEmphasis = computed(() => {
  const emphasis = props.yuEmphasis ?? defaultConfig.emphasis
  return emphasis === 'true' || emphasis === '' || emphasis === true
})
const finalSize = computed(() => Number(props.yuSize ?? defaultConfig.size))
const finalIconName = computed(() => props.yuIconName ?? 'search')

/**
 * Font variations
 */

const opsz = computed(() => clamp(finalSize.value, 20, 48))
const wght = computed(() => clamp(finalWeight.value, 100, 700))
const fill = computed(() => finalFill.value ? 1 : 0)
const gradLight = computed(() => finalEmphasis.value ? 200 : 0)
const gradDark = computed(() => finalEmphasis.value ? 200 : -25)

const fontName = computed(() => getFontName(finalStyle.value))
const styleValue = computed(() => `'Material Symbols ${fontName.value}'`)

/**
 * WAI-ARIA attributes
 */

const finalAriaHidden = computed(() => !props.ariaLabel ? 'true' : undefined)
const finalRole = computed(() => props.ariaLabel ? 'img' : undefined)

/**
 * Dynamic font loading
 */

useHead(computed(() => {
  const isAdditionalStyle = props.yuStyle && props.yuStyle !== (defaultConfig.style)
  if (!isAdditionalStyle) {
    return {}
  }

  const gradParam = finalEmphasis.value ? '200' : '-25..0'
  const url = buildFontUrl(
    fontName.value,
    opsz.value,
    wght.value,
    fill.value,
    gradParam,
  )
  return {
    link: [
      {
        id: `material-symbols-${fontName.value}-${opsz.value}-${wght.value}-${fill.value}-${gradParam}`,
        rel: 'stylesheet',
        href: url,
      },
    ],
  }
}))
</script>

<style lang="scss" scoped>
.yu-icon {
  --md-comp-icon-grade: v-bind(gradLight);

  font-size: var(--md-comp-icon-optical-size, v-bind("finalSize + 'px'"));
  font-variation-settings:
  'FILL' var(--md-comp-icon-fill, v-bind(fill)),
  'wght' var(--md-comp-icon-weight, v-bind(wght)),
  'GRAD' var(--md-comp-icon-grade),
  'opsz' var(--md-comp-icon-optical-size, v-bind(opsz));
  user-select: none;
  font-family: var(--md-comp-icon-style, v-bind(styleValue));
  width: 1em;
  height: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .yu-icon {
    --md-comp-icon-grade: v-bind(gradDark);
  }
}
</style>
