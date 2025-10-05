<template>
  <button
    class="yu-button"
    type="button"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.yu-button {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  height: 40px;
  border: none;

  .yu-icon {
    color: var(--md-sys-color-on-primary);
  }
}
</style>
