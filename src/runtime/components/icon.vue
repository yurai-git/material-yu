<template>
  <span
    v-bind="$attrs"
    ref="root"
    :class="['md-component', 'md-icon', `md-icon-style-${props.mdStyle}`]"
    :aria-hidden="ariaHidden"
    :role="role"
    translate="no"
  >
    <slot>{{ mdIcon }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, toRef, useAttrs } from 'vue'

const root = ref<HTMLElement | null>()
const attributes = useAttrs()

/**
 * Properties
 */

const props = defineProps({
  mdIcon: {
    type: String,
    default: 'search',
  },
  mdStyle: {
    type: String,
    default: 'default',
  },
})

/**
 * Style
 */

onMounted(() => {
  const el = root.value
  if (!el) return

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const fs = getComputedStyle(entry.target)
        .getPropertyValue('--icon-size')
        .trim()
      if (fs) {
        const num = Number.parseFloat(fs)
        const clamped = Math.max(20, Math.min(48, num))
        ;(entry.target as HTMLElement).style.setProperty(
          '--icon-optical-size',
          clamped.toString(),
        )
      }
    }
  })

  resizeObserver.observe(el)
  onBeforeUnmount(() => resizeObserver.disconnect())
})

/**
 * Accessibility
 */

const ariaLabel = toRef(attributes, 'aria-label')
const ariaHidden = computed(() => (!ariaLabel.value ? 'true' : null))
const role = computed(() => (ariaLabel.value ? 'img' : null))
</script>
