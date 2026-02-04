<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@use '@yurai/material-yu';

body {
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}
a {
  color: var(--md-sys-color-primary);
}
h1 {
  @include material-yu.get-typescale('emphasized', 'display-large');
}
</style>
