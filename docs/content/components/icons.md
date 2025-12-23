---
title: Icons
description: Use Material Symbols with ease.
---

- [Design article](https://m3.material.io/styles/icons){target="_blank"}

## Usage

To display an icon, provide an icon name or a unicode code point in the `yu-icon-name` property, or an `<svg>` child element within the element's content.

```vue
<!-- Using an icon name -->
<YuIcon yu-icon-name="settings" />
<!-- Using a unicode code point -->
<YuIcon yu-icon-name="&#xe834;" />
<!-- Using an SVG child element -->
<YuIcon>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path d="M10 40V24H4L24 6l10 8.85V9h4v9.55L44 24h-6v16H26.5V28h-5v12Zm3-3h5.5V25h11v12H35V19.95l-11-10-11 10Zm5.5-12h11-11Zm1.25-5.5h8.5q0-1.65-1.275-2.725Q25.7 15.7 24 15.7q-1.7 0-2.975 1.075Q19.75 17.85 19.75 19.5Z" />
  </svg>
</YuIcon>
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
