<template>
  <div
    ref="root"
    class="yu-interactive yu-component"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

/**
 * Properties and states
 */

const props = defineProps<{
  yuFocusRing: boolean
  yuRipple: boolean
}>()

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = root.value
  if (!el) return

  if (props.yuFocusRing) {
    el.classList.add('yu-focus-ring')
  }
  if (props.yuRipple) {
    el.classList.add('yu-ripple')
  }

  const parent = el.parentElement
  if (parent) parent.style.position = 'relative'
})
</script>

<style lang="scss" scoped>
.yu-interactive {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.yu-focus-ring {
  outline: none;
}
:global(:focus-visible > .yu-focus-ring) {
  outline: var(--md-sys-state-focus-indicator-thickness) solid var(--md-sys-color-secondary);
  outline-offset: var(--md-sys-state-focus-indicator-outer-offset);
}
</style>
