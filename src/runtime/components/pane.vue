<template>
  <div class="yu-pane yu-component">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useToken } from '#imports'

const { getColor } = useToken()

const finalPaneContainerColor = getColor('surface')
</script>

<style lang="scss" scoped>
.yu-pane {
  background-color: var(--md-comp-layout-pane-container-color, v-bind(finalPaneContainerColor));
  height: 100%;
  width: 100%;
  padding: 24px;
}
</style>
