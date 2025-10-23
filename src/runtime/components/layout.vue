<template>
  <div class="yu-layout yu-component">
    <slot name="navigation-region" />
    <div class="yu-layout__body">
      <slot name="body" />
    </div>
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
}
.yu-layout {
  --md-comp-layout-spacing: 16px;

  background-color: v-bind(finalWindowColor);
  color: var(--md-comp-layout-window-content-color, var(--md-sys-color-on-surface));
  padding: 24px;
  height: 100%;
  min-height: 100dvh;
  width: 100dvw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--md-comp-layout-spacing);
}

@media screen and (min-width: 600px) and (max-width: 839px) {
  .yu-layout {
    --md-comp-layout-spacing: 24px;
  }
}
@media screen and (min-width: 840px) and (max-width: 1199px) {
  .yu-layout {
    --md-comp-layout-spacing: 24px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1599px) {
  .yu-layout {
    --md-comp-layout-spacing: 24px;
  }
}
@media screen and (min-width: 1600px) {
  .yu-layout {
    --md-comp-layout-spacing: 24px;
  }
}
</style>
