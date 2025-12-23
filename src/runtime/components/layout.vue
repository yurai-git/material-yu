<template>
  <div class="yu-layout yu-component">
    <slot name="navigation-region" />
    <div class="yu-layout__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToken } from '#imports'

/**
 * Properties and states
 */

const { getColor } = useToken()

const finalWindowsContentColor = getColor('on-surface')
const finalWindowContainerColor = getColor('surface')
</script>

<style lang="scss" scoped>
:global(body) {
  margin: 0;
}
.yu-layout {
  --md-comp-layout-spacing: 16px;

  background-color: var(--md-comp-layout-window-container-color, v-bind(finalWindowContainerColor));
  color: var(--md-comp-layout-window-content-color, v-bind(finalWindowsContentColor));
  fill: var(--md-comp-layout-window-content-color, v-bind(finalWindowsContentColor));
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
