---
title: Typography
description: Use typography with consistent styles.
---

- [Design guideline](https://m3.material.io/styles/typography){target="\_blank"}

## Usage

**Example:**

```vue
<template>
  <h1>Hello, world!</h1>
</template>

<style lang="scss">
@use '@yurai/material-yu';

// Apply the emphasized display large style to the heading
h1 {
  @include material-yu.get-typescale('emphasized', 'display-large');
}
</style>
```
