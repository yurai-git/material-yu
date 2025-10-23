<template>
  <div
    ref="root"
    class="yu-wrapper yu-component"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

/**
 * Properties and states
 */

const props = defineProps<{
  yuBadge: boolean
  yuTooltip: boolean
}>()

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = root.value
  if (!el) return

  if (props.yuBadge) {
    el.classList.add('yu-badge')
  }
  if (props.yuTooltip) {
    el.classList.add('yu-tooltip')
  }
})
</script>

<style lang="scss" scoped>
</style>
