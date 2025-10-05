<template>
  <div class="yu-layout">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#app'
import { useMaterialYu } from '#imports'
import { computed } from 'vue'

/**
 * Properties and states
 */

const { toToken } = useMaterialYu()

const defaultConfig = useRuntimeConfig().public.materialYu.components.yuLayout

const props = defineProps<{
  yuPaneColor?: string
  yuWindowColor?: string
}>()

const _finalPaneColor = computed(() => {
  const token = props.yuPaneColor ?? defaultConfig.paneColor
  return toToken(token)
})
const finalWindowColor = computed(() => {
  const token = props.yuWindowColor ?? defaultConfig.windowColor
  return toToken(token, 'md.comp.layout.window.container.color')
})
</script>

<style lang="scss" scoped>
:global(body) {
  margin: 0;
  height: 100dvh;
  width: 100dvw;
}
.yu-layout {
  background-color: v-bind(finalWindowColor);
  color: var(--md-comp-layout-window-content-color, var(--md-sys-color-on-surface));
  padding: 1rem;
  height: 100dvh;
  width: 100dvw;
  box-sizing: border-box;
}
</style>
