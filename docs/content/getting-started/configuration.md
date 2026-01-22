---
title: Configuration
description: The module is configured with sensible defaults.
---

You can customize the module by providing the `materialYu` property in your `nuxt.config.ts`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@yurai/material-yu'],
  materialYu: {
    // Module options
  },
});
```

## `image`

Turn on or off the `@nuxt/image` module.

- **Type:** `boolean`
- **Default:** `true`

## `colorScheme`

Define the default color scheme.

- **Type:** `'system'` | `'light'` | `'dark'`
- **Default:** `'system'`

## `contrast`

Define the default contrast.

- **Type:** `'standard'` | `'medium'` | `'high'`
- **Default:** `'standard'`

## `reduceMotion`

Turn on or off motion reduction.

- **Type:** `boolean`
- **Default:** `false`

## `motionScheme`

Define the default motion scheme.

- **Type:** `'standard'` | `'expressive'`
- **Default:** `'expressive'`

## `components`

Additional component configurations.

### `YuIcon`

Additional configurations for the `YuIcon` component.

#### `style`

Define the default `yuStyle` value.

- **Type:** `'outlined'` | `'rounded'` | `'sharp'`
- **Default:** `'outlined'`

#### `weight`

Define the default `yuWeight` value.

- **Type:** `number`
- **Default:** `400`

#### `fill`

Define the default `yuFill` value.

- **Type:** `boolean`
- **Default:** `false`

#### `emphasis`

Define the default `yuEmphasis` value.

- **Type:** `boolean`
- **Default:** `false`

#### `size`

Define the default `yuSize` value.

- **Type:** `number`
- **Default:** `24`
