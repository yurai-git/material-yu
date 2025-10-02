---
title: Icons
description: Use Material Symbols with ease.
---

- [Design article](https://m3.material.io/styles/icons)

## Usage

To display an icon, provide an icon name or a unicode code point in the `yu-icon-name` property, or an `<svg>` child element within the element's content.

```vue
<template>
  <!-- Using an icon name -->
  <YuIcon yu-icon-name="home" />
  <!-- Using a unicode code point -->
  <YuIcon yu-icon-name="&#xe8b8;" />
  <!-- Using an SVG child element -->
  <YuIcon>
    <svg viewBox="0 0 24 24"><path fill="#4285f4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" /><path fill="#34a853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" /><path fill="#fbbc05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" /><path fill="#ea4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" /></svg>
  </YuIcon>
</template>
```

## Properties

This component accepts the following properties.

| Property | Attribute | Type | Default | Description |
| :- | :- | :- | :- | :- |
| `yuIconName` | `yu-icon-name` | `string` | `'search'` | The name or code point of the Material Symbol to display. |
| `yuStyle` | `yu-style` | `'outlined'`, `'rounded'`, or `'sharp'` | `'outlined'` | The style of the icon. |
| `yuWeight` | `yu-weight` | `number` | `400` | The font weight of the icon, ranging from 100 to 700. |
| `yuFill` | `yu-fill` | `boolean` | `false` | If set to `true`, the icon will be filled. |
| `yuEmphasis` | `yu-emphasis` | `boolean` | `false` | If set to `true`, the icon will have a higher emphasis. |
| `yuSize` | `yu-size` | `number` | `24` | The size of the icon in `px`. |
| `ariaLabel` | `aria-label` | `string` | `undefined` | The ARIA label for the icon. If provided, the component will have `role="img"`. If not, it will have `aria-hidden="true"`. |

## Accessibility

If used on their own, Icons should be given an accessible name if they are focusable.

```vue
<template>
  <YuIcon yu-icon-name="menu" tabindex="-1" aria-label="Open navigation drawer" />
</template>
```

If the icon is purely decorative, omit the `aria-label` prop, and the component will automatically add `aria-hidden="true"`.
