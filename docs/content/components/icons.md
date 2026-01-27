---
title: Icons
description: Use Material Symbols with ease.
---

- [Design guideline](https://m3.material.io/styles/icons){target="\_blank"}

## Interactive demo

::InteractiveDemosIcons
::

<!-- prettier-ignore-start -->

```vue
<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <MdIcon md-icon="search" />
    <MdIcon md-icon="&#xe88a;" />
    <MdIcon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M13.464 19.83h8.922c.283 0 .562-.073.807-.21a1.6 1.6 0 0 0 .591-.574a1.53 1.53 0 0 0 .216-.783a1.53 1.53 0 0 0-.217-.782L17.792 7.414a1.6 1.6 0 0 0-.591-.573a1.65 1.65 0 0 0-.807-.21c-.283 0-.562.073-.807.21a1.6 1.6 0 0 0-.59.573L13.463 9.99L10.47 4.953a1.6 1.6 0 0 0-.591-.573a1.65 1.65 0 0 0-.807-.21c-.284 0-.562.073-.807.21a1.6 1.6 0 0 0-.591.573L.216 17.481a1.53 1.53 0 0 0-.217.782c0 .275.074.545.216.783a1.6 1.6 0 0 0 .59.574c.246.137.525.21.808.21h5.6c2.22 0 3.856-.946 4.982-2.79l2.733-4.593l1.464-2.457l4.395 7.382h-5.859Zm-6.341-2.46l-3.908-.002l5.858-9.842l2.923 4.921l-1.957 3.29c-.748 1.196-1.597 1.632-2.916 1.632" />
      </svg>
    </MdIcon>
  </div>
</template>
```

<!-- prettier-ignore-end -->

## Usage

To display an icon, provide an icon name or a code point in the `md-icon` property, or an `<svg>` child element within the component's content.

<!-- prettier-ignore-start -->

```vue
<template>
  <!-- Using an icon name -->
  <MdIcon md-icon="search" />

  <!-- Using a code point -->
  <MdIcon md-icon="&#xe88a;" />

  <!-- Using an SVG child element -->
  <MdIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M13.464 19.83h8.922c.283 0 .562-.073.807-.21a1.6 1.6 0 0 0 .591-.574a1.53 1.53 0 0 0 .216-.783a1.53 1.53 0 0 0-.217-.782L17.792 7.414a1.6 1.6 0 0 0-.591-.573a1.65 1.65 0 0 0-.807-.21c-.283 0-.562.073-.807.21a1.6 1.6 0 0 0-.59.573L13.463 9.99L10.47 4.953a1.6 1.6 0 0 0-.591-.573a1.65 1.65 0 0 0-.807-.21c-.284 0-.562.073-.807.21a1.6 1.6 0 0 0-.591.573L.216 17.481a1.53 1.53 0 0 0-.217.782c0 .275.074.545.216.783a1.6 1.6 0 0 0 .59.574c.246.137.525.21.808.21h5.6c2.22 0 3.856-.946 4.982-2.79l2.733-4.593l1.464-2.457l4.395 7.382h-5.859Zm-6.341-2.46l-3.908-.002l5.858-9.842l2.923 4.921l-1.957 3.29c-.748 1.196-1.597 1.632-2.916 1.632" />
    </svg>
  </MdIcon>
</template>
```

<!-- prettier-ignore-end -->

## Properties

This component accepts the following properties.

| Property  | Attribute  | Type     | Default     | Description                                                     |
| :-------- | :--------- | :------- | :---------- | :-------------------------------------------------------------- |
| `mdIcon`  | `md-icon`  | `string` | `'search'`  | The name or code point of the Material Symbols icon to display. |
| `mdStyle` | `md-style` | `string` | `'default'` | The style of the icon.                                          |

## Accessibility

If the component does not have an `aria-label` attribute, the component will automatically add the `aria-hidden="true"` attribute. If it does, the component will automatically add the `role="img"` attribute.

<!-- prettier-ignore-start -->

- **Example input:**

  ```vue
  <template>
    <MdIcon md-icon="menu" />
    <MdIcon md-icon="menu" aria-label="Open navigation drawer" />
  </template>
  ```

- **Example output:**

  ```html
  <span aria-hidden="true">menu</span>
  <span role="img" aria-label="Open navigation drawer">menu</span>
  ```

<!-- prettier-ignore-end -->
