---
title: Configuration
description: The module is configured with sensible defaults.
---

You can customize the module by providing the `materialYu` property in your `nuxt.config.ts`.

<!-- prettier-ignore-start -->

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@yurai/material-yu'],
  materialYu: {
    // Module options
  }
})
```

<!-- prettier-ignore-end -->

## `image`

Turn on or off the `@nuxt/image` module.

- **Type:** `boolean`
- **Default:** `true`

## `theme`

Define the default theme.

- **Type:** `'system'` | `'light'` | `'dark'`
- **Default:** `'system'`

## `contrast`

Define the default contrast.

- **Type:** `'system'` | `'default'` | `'medium'` | `'high'`
- **Default:** `'system'`

## `reducedMotion`

Define the default motion reduction.

- **Type:** `'system'` | `'reduced'` | `'unreduced'`
- **Default:** `'system'`

## `reducedTransparency`

Define the default transparency reduction.

- **Type:** `'system'` | `'reduced'` | `'unreduced'`
- **Default:** `'system'`

## `motionScheme`

Define the default motion scheme.

- **Type:** `'standard'` | `'expressive'`
- **Default:** `'expressive'`

## `iconStyle`

Define the style of icons.

- **Type:** `'Material Symbols Outlined'` | `'Material Symbols Rounded'` | `'Material Symbols Sharp'`
- **Default:** `'Material Symbols Outlined'`

## `sourceColor`

Define the seed color for color scheme generation.

- **Type:** `string`
- **Default:** `'#6750a4'`
