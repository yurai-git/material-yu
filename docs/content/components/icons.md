---
title: Icons
description: Use Material Symbols icons easily.
---

- [Design guideline](https://m3.material.io/styles/icons){target="\_blank"}

## Interactive demo

::IconsDemo
::

```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <MdIcon md-icon="search" />
    <MdIcon md-icon="&#xe88a;" />
    <MdIcon>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9998 22C10.6211 22 9.31818 21.7425 8.09071 21.2275C6.87865 20.6971 5.81825 19.985 4.90911 19.0908C4.01496 18.1821 3.30289 17.1213 2.7729 15.9092C2.25708 14.6817 2 13.3788 2 12C2 10.6063 2.25749 9.30292 2.77248 8.09083C3.30289 6.87875 4.01496 5.82583 4.90911 4.93167C5.81825 4.02292 6.87865 3.31083 8.09071 2.79542C9.31818 2.265 10.6211 2 11.9998 2C13.3939 2 14.6968 2.265 15.9089 2.79583C17.1209 3.31083 18.1738 4.02292 19.068 4.93167C19.9771 5.82583 20.6888 6.87875 21.2042 8.09083C21.7346 9.30333 22 10.6063 22 12C22 13.3792 21.7346 14.6817 21.2042 15.9092C20.6892 17.1213 19.9771 18.1821 19.068 19.0908C18.1738 19.985 17.1209 20.6971 15.9089 21.2275C14.6964 21.7425 13.3939 22 11.9998 22ZM5.63617 17.1138V6.88625C5.05627 7.59088 4.60277 8.39061 4.29579 9.25C3.97746 10.1137 3.81871 11.0304 3.81871 12C3.81871 12.9696 3.97746 13.8938 4.29579 14.7729C4.60658 15.6237 5.05958 16.4153 5.63617 17.1138ZM6.88615 5.63625H17.1359C16.4315 5.05623 15.6319 4.60259 14.7727 4.29542C13.8935 3.97708 12.9694 3.81833 11.9998 3.81833C11.0302 3.81833 10.1061 3.97708 9.22735 4.29542C8.37647 4.60617 7.58475 5.0596 6.88615 5.63625ZM11.9998 14.2729L15.4314 7.45458H8.5907L11.9998 14.2729ZM12.9089 16.5454H16.5451V9.27292L12.9089 16.5454ZM7.45447 16.5454H11.0906L7.45447 9.27292V16.5454ZM11.9998 20.1817C12.9689 20.1817 13.8931 20.0229 14.7722 19.7046C15.651 19.3863 16.4389 18.9396 17.1355 18.3638H6.88573C7.58433 18.9404 8.37606 19.3938 9.22693 19.7046C10.1057 20.0229 11.0302 20.1817 11.9998 20.1817ZM18.363 17.1138C18.9396 16.4153 19.393 15.6237 19.7038 14.7729C20.0221 13.8938 20.1809 12.9696 20.1809 12C20.1809 11.0304 20.0221 10.1137 19.7038 9.25C19.3855 8.37083 18.9388 7.58333 18.363 6.88625V17.1138Z" />
      </svg>
    </MdIcon>
  </div>
</template>

<style lang="scss">
@import 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25..0';
</style>
```

## Usage

Provide an icon name or a code point in the `md-icon` property, or an `<svg>` child element within the component's content.

**Example:**

```vue
<template>
  <!-- Using an icon name -->
  <MdIcon md-icon="search" />

  <!-- Using a code point -->
  <MdIcon md-icon="&#xe88a;" />

  <!-- Using an SVG child element -->
  <MdIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11.9998 22C10.6211 22 9.31818 21.7425 8.09071 21.2275C6.87865 20.6971 5.81825 19.985 4.90911 19.0908C4.01496 18.1821 3.30289 17.1213 2.7729 15.9092C2.25708 14.6817 2 13.3788 2 12C2 10.6063 2.25749 9.30292 2.77248 8.09083C3.30289 6.87875 4.01496 5.82583 4.90911 4.93167C5.81825 4.02292 6.87865 3.31083 8.09071 2.79542C9.31818 2.265 10.6211 2 11.9998 2C13.3939 2 14.6968 2.265 15.9089 2.79583C17.1209 3.31083 18.1738 4.02292 19.068 4.93167C19.9771 5.82583 20.6888 6.87875 21.2042 8.09083C21.7346 9.30333 22 10.6063 22 12C22 13.3792 21.7346 14.6817 21.2042 15.9092C20.6892 17.1213 19.9771 18.1821 19.068 19.0908C18.1738 19.985 17.1209 20.6971 15.9089 21.2275C14.6964 21.7425 13.3939 22 11.9998 22ZM5.63617 17.1138V6.88625C5.05627 7.59088 4.60277 8.39061 4.29579 9.25C3.97746 10.1137 3.81871 11.0304 3.81871 12C3.81871 12.9696 3.97746 13.8938 4.29579 14.7729C4.60658 15.6237 5.05958 16.4153 5.63617 17.1138ZM6.88615 5.63625H17.1359C16.4315 5.05623 15.6319 4.60259 14.7727 4.29542C13.8935 3.97708 12.9694 3.81833 11.9998 3.81833C11.0302 3.81833 10.1061 3.97708 9.22735 4.29542C8.37647 4.60617 7.58475 5.0596 6.88615 5.63625ZM11.9998 14.2729L15.4314 7.45458H8.5907L11.9998 14.2729ZM12.9089 16.5454H16.5451V9.27292L12.9089 16.5454ZM7.45447 16.5454H11.0906L7.45447 9.27292V16.5454ZM11.9998 20.1817C12.9689 20.1817 13.8931 20.0229 14.7722 19.7046C15.651 19.3863 16.4389 18.9396 17.1355 18.3638H6.88573C7.58433 18.9404 8.37606 19.3938 9.22693 19.7046C10.1057 20.0229 11.0302 20.1817 11.9998 20.1817ZM18.363 17.1138C18.9396 16.4153 19.393 15.6237 19.7038 14.7729C20.0221 13.8938 20.1809 12.9696 20.1809 12C20.1809 11.0304 20.0221 10.1137 19.7038 9.25C19.3855 8.37083 18.9388 7.58333 18.363 6.88625V17.1138Z" />
    </svg>
  </MdIcon>
</template>
```

### Translation

The component automatically adds the `translate="no"` attribute to itself. This prevents icons from being translated by machine translation and breaking their appearance.

**Example input:**

```vue
<template>
  <MdIcon md-icon="search" />
</template>
```

**Example output:**

```html
<span translate="no">search</span>
```

## Properties

The component accepts the following properties.

| Property  | Attribute  | Type     | Default     | Description                                                                               |
| :-------- | :--------- | :------- | :---------- | :---------------------------------------------------------------------------------------- |
| `mdIcon`  | `md-icon`  | `string` | `'search'`  | The name or code point of the Material Symbols icon.                                      |
| `mdStyle` | `md-style` | `string` | `'default'` | The style of the icon. The component adds the `md-icon-style-${mdStyle}` class to itself. |

## Accessibility

If you use the component by itself, you should give it an accessible name if it is focusable.

**Example:**

```vue
<template>
  <MdIcon md-icon="menu" tabindex="-1" aria-label="Open navigation drawer" />
</template>
```

If the component does not have the `aria-label` attribute, the component will automatically add the `aria-hidden="true"` attribute to itself. If it does, the component will automatically add the `role="img"` attribute to itself.

**Example input:**

```vue
<template>
  <MdIcon md-icon="menu" />
  <MdIcon md-icon="menu" aria-label="Open navigation drawer" />
</template>
```

**Example output:**

```html
<span aria-hidden="true">menu</span>
<span aria-label="Open navigation drawer" role="img">menu</span>
```

## Theming

You can theme the component using the `icon-style` and `icon` mixins.

### `icon-style`

Override existing styles and define new styles based on existing styles.

**Example:**

```scss
@use '@yurai/material-yu';

// Override the default style for icons
.md-icon-style-default {
  @include material-yu.icon-style('default', (
    style: "'Material Symbols Rounded'",
  ));
}
// Define a filled style for icons based on the default style
.md-icon-style-filled {
  @include material-yu.icon-style('default', (
    fill: 1,
  ));
}
```

| Key                     | Type                                                 | Description                           |
| :---------------------- | :--------------------------------------------------- | :------------------------------------ |
| `size`                  | `<font-size>`                                        | The size of the icon.                 |
| `fill`                  | `<number [0,1]>`                                     | Whether the icon is filled.           |
| `weight`                | `<number [100,700]>`                                 | The weight of the icon.               |
| `grade-light`           | `<number [-50,200]>`                                 | The grade of the icon for light mode. |
| `grade-dark`            | `<number [-50,200]>`                                 | The grade of the icon for dark mode.  |
| `style`                 | `<font-family>`                                      | The style of the icon.                |
| `axes-spring-animation` | `<transition-duration> <transition-timing-function>` | The spring animation for axes.        |

#### Default values of `'default'`

| Key                     | Default                                    |
| :---------------------- | :----------------------------------------- |
| `size`                  | `24px`                                     |
| `fill`                  | `0`                                        |
| `weight`                | `400`                                      |
| `grade-light`           | `0`                                        |
| `grade-dark`            | `-25`                                      |
| `style`                 | `"'Material Symbols Outlined'"`            |
| `axes-spring-animation` | `var(--md-sys-motion-spring-fast-effects)` |

### `icon`

Override global style declarations for icons.

**Example:**

```scss
@use '@yurai/material-yu';

// Override CSS declarations for icons
.md-icon {
  @include material-yu.icon((
    font-family: "'Material Symbols Rounded'",
  ));
}
```

| Key                       | Type                        | Default                                                                                                                                                                                                           | Description                                                                             |
| :------------------------ | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `font-size`               | `<font-size>`               | `var(--icon-size)`                                                                                                                                                                                                | The `font-size` property of the icon.                                                   |
| `font-variation-settings` | `<font-variation-settings>` | <pre><code>(<br>&nbsp;&nbsp;"'FILL'" var(--icon-fill),<br>&nbsp;&nbsp;"'wght'" var(--icon-weight),<br>&nbsp;&nbsp;"'GRAD'" var(--icon-grade),<br>&nbsp;&nbsp;"'opsz'" var(--icon-optical-size),<br>)</code></pre> | The `font-variation-settings` property of the icon.                                     |
| `grade-light`             | `<number [-50,200]>`        | `var(--icon-grade-light)`                                                                                                                                                                                         | The `'GRAD'` axis in the `font-variation-settings` property of the icon for light mode. |
| `grade-dark`              | `<number [-50,200]>`        | `var(--icon-grade-dark)`                                                                                                                                                                                          | The `'GRAD'` axis in the `font-variation-settings` property of the icon for dark mode.  |
| `user-select`             | `<user-select>`             | `none`                                                                                                                                                                                                            | The `user-select` property of the icon.                                                 |
| `font-family`             | `<font-family>`             | `var(--icon-style)`                                                                                                                                                                                               | The `font-family` property of the icon.                                                 |
| `inline-size`             | `<inline-size>`             | `1em`                                                                                                                                                                                                             | The `inline-size` property of the icon.                                                 |
| `block-size`              | `<block-size>`              | `1em`                                                                                                                                                                                                             | The `block-size` property of the icon.                                                  |
| `display`                 | `<display>`                 | `flex`                                                                                                                                                                                                            | The `display` property of the icon.                                                     |
| `align-items`             | `<align-items>`             | `center`                                                                                                                                                                                                          | The `align-items` property of the icon.                                                 |
| `justify-content`         | `<justify-content>`         | `center`                                                                                                                                                                                                          | The `justify-content` property of the icon.                                             |
| `transition`              | `<transition>`              | `font-variation-settings var(--icon-axes-spring-animation)`                                                                                                                                                       | The `transition` property of the icon.                                                  |
| `fill`                    | `<fill>`                    | `currentColor`                                                                                                                                                                                                    | The `fill` property of the icon.                                                        |
