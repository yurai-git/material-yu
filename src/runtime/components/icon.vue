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
import { computed, onMounted, ref, toRef, useAttrs } from 'vue'

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
  if (el) {
    const fs = getComputedStyle(el).getPropertyValue('--icon-size').trim()
    if (fs) {
      const num = Number.parseFloat(fs)
      el.style.setProperty('--icon-optical-size', num.toString())
    }
  }
})

/**
 * Accessibility
 */

const ariaLabel = toRef(attributes, 'aria-label')
const ariaHidden = computed(() => (!ariaLabel.value ? 'true' : null))
const role = computed(() => (ariaLabel.value ? 'img' : null))
</script>
