<template>
  <component
    :is="tag"
    v-if="finalType == 'default'"
    ref="root"
    :class="[
      'yu-button',
      'yu-button-type-default',
      'yu-component',
      `yu-button-size-${finalSize}`,
      `yu-button-shape-${finalShape}`,
      `yu-button-color-${finalColor}`,
      { 'yu-button-disabled': props.disabled || props.softDisabled },
    ]"
    v-bind="defaultAttrs"
    @click="handleClick"
  >
    <slot />
    <YuInteractive
      :yu-ripple="!(props.disabled || props.softDisabled)"
      :yu-state-layer="!(props.disabled || props.softDisabled)"
    />
  </component>
  <label
    v-else-if="finalType == 'toggle'"
    ref="root"
    :class="[
      'yu-button',
      'yu-button-type-toggle',
      'yu-component',
      `yu-button-size-${finalSize}`,
      `yu-button-shape-${finalShape}`,
      `yu-button-color-${finalColor}`,
      { 'yu-button-disabled': props.disabled || props.softDisabled },
    ]"
    @click="handleClick"
  >
    <input
      :id="props.id"
      type="checkbox"
      :disabled="props.disabled"
      :name="props.name"
      :checked="props.checked"
      class="yu-button-type-toggle-input"
      @change="emits('update:checked', ($event.target as HTMLInputElement).checked)"
    >
    <slot />
    <YuInteractive
      :yu-ripple="!(props.disabled || props.softDisabled)"
      :yu-state-layer="!(props.disabled || props.softDisabled)"
    />
  </label>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, resolveComponent, nextTick, type ComponentPublicInstance } from 'vue'
import type { ButtonShapeValue, MotionSchemeValue, ButtonColorValue, ButtonSizeValue, MotionDuration, MotionTarget, ButtonTypeValue, TypescaleRole, TypescaleSize, TypescaleTone } from '../types'
import { useRuntimeConfig } from '#app'
import { useMotion } from '../composables/use-motion'
import { useTypescale } from '../composables/use-typescale'
import type { RouteLocationRaw } from 'vue-router'

/**
 * Properties and states
 */

const emits = defineEmits<{ (e: 'update:checked', value: boolean): void }>()

const runtimePublic = useRuntimeConfig().public
const materialYu = runtimePublic.materialYu
const defaultConfig = materialYu.components.button

const props = defineProps({
  /**
   * The motion scheme to use for the component.
   */
  yuMotionScheme: {
    type: String as () => MotionSchemeValue,
    default: undefined,
  },
  /**
   * The type of the button.
   * @values 'default', 'toggle'
   */
  yuType: {
    type: String as () => ButtonTypeValue,
    default: undefined,
  },
  /**
   * The size of the button.
   * @values 'xsmall', 'small', 'medium', 'large', 'xlarge'
   */
  yuSize: {
    type: String as () => ButtonSizeValue,
    default: undefined,
  },
  /**
   * The shape of the button.
   * @values 'round', 'square'
   */
  yuShape: {
    type: String as () => ButtonShapeValue,
    default: undefined,
  },
  /**
   * The color of the button.
   * @values 'elevated', 'filled', 'tonal', 'outlined', 'text'
   */
  yuColor: {
    type: String as () => ButtonColorValue,
    default: undefined,
  },
  /**
   * Whether the button is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether the button is soft-disabled (visually disabled but still focusable).
   */
  softDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * The name of the button, submitted with a form.
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * The ID of the button.
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * Whether the toggle button is checked.
   */
  checked: {
    type: Boolean,
    default: false,
  },
  /**
   * If provided, the button will be rendered as a link.
   */
  href: {
    type: String as () => RouteLocationRaw,
    default: undefined,
  },
  /**
   * The target attribute for the link.
   */
  target: {
    type: String as () => '_blank' | '_parent' | '_self' | '_top' | (string & {}),
    default: undefined,
  },
  /**
   * The rel attribute for the link.
   */
  rel: {
    type: String as () => 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}),
    default: undefined,
  },
})

const handleClick = (event: MouseEvent) => {
  if (props.softDisabled) {
    event.preventDefault()
    event.stopPropagation()
  }
}

const tag = computed(() => props.href ? resolveComponent('NuxtLink') : 'button')

const defaultAttrs = computed(() => props.href
  ? {
      to: props.href,
      target: props.target,
    }
  : {
      id: props.id,
      type: 'button',
      disabled: props.disabled,
      name: props.name,
      rel: props.rel,
    },
)

const finalMotionScheme = computed<MotionSchemeValue>(() => props.yuMotionScheme ?? (materialYu.motionScheme as MotionSchemeValue))
const finalColor = computed(() => props.yuColor ?? defaultConfig.color)
const finalType = computed(() => {
  const type = props.yuType ?? defaultConfig.type
  if (finalColor.value === 'text' && type === 'toggle') {
    console.warn('[Material Yu warn]: `yuType` cannot be `\'toggle\'` when `yuColor` is `\'text\'` on `YuButton` component. Falling back to `\'default\'`.')
    return 'default'
  }
  return type
})
const finalSize = computed(() => props.yuSize ?? defaultConfig.size)
const finalShape = computed(() => props.yuShape ?? defaultConfig.shape)

const typescale = (role: TypescaleRole, size: TypescaleSize, tone: TypescaleTone) => {
  return useTypescale({
    role: role,
    size: size,
    tone: tone,
  }).value
}
const motion = (duration: MotionDuration, target: MotionTarget) => {
  return useMotion(finalMotionScheme.value, {
    duration: duration,
    target: target,
  }).value
}

const root = ref<ComponentPublicInstance | HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!root.value) return
    const el = ('$el' in root.value ? root.value.$el : root.value) as HTMLElement
    if (!el) return

    switch (finalSize.value) {
      case 'xsmall':
        el.classList.add(typescale('label', 'large', 'baseline'))
        break
      case 'medium':
        el.classList.add(typescale('title', 'medium', 'baseline'))
        break
      case 'large':
        el.classList.add(typescale('headline', 'small', 'baseline'))
        break
      case 'xlarge':
        el.classList.add(typescale('headline', 'large', 'baseline'))
        break
      default:
        el.classList.add(typescale('label', 'large', 'baseline'))
    }
  })
})
</script>

<style lang="scss" scoped>
.yu-button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  width: fit-content;
}
.yu-button-disabled {
  cursor: not-allowed;
}
.yu-button-type-toggle-input {
  appearance: none;
  position: absolute;
}
.yu-button-color-elevated {
  background-color: var(--md-comp-button-elevated-container-color, var(--md-sys-color-surface-container-low));
  box-shadow: var(--md-comp-button-elevated-elevation, var(--md-sys-elevation-level1));
  color: var(--md-comp-button-elevated-icon-label-color, var(--md-sys-color-primary));

  &.yu-button-type-toggle:not(.yu-button-disabled) {
    background-color: var(--md-comp-button-elevated-container-color-toggle-unselected, var(--md-sys-color-surface-container-low));
    color: var(--md-comp-button-elevated-icon-label-color-toggle-unselected, var(--md-sys-color-primary));

    &:has(:checked) {
      background-color: var(--md-comp-button-elevated-container-color-toggle-selected, var(--md-sys-color-primary));
      color: var(--md-comp-button-elevated-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
    }
  }
  &.yu-button-disabled {
    background-color: color-mix(in srgb, var(--md-comp-button-elevated-disabled-container-color, var(--md-sys-color-on-surface)) var(--md-comp-button-elevated-disabled-container-opacity, 10%), #fff0);
    box-shadow: var(--md-comp-button-elevated-disabled-container-elevation, var(--md-sys-elevation-level0));
    color: color-mix(in srgb, var(--md-comp-button-elevated-disabled-icon-label-color, var(--md-sys-color-on-surface)) var(--md-comp-button-elevated-disabled-icon-label-opacity, 38%), #fff0);
  }
  &:hover:not(.yu-button-disabled) {
    color: var(--md-comp-button-elevated-hovered-icon-label-color, var(--md-sys-color-primary));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-elevated-hovered-icon-label-color-toggle-unselected, var(--md-sys-color-primary));

      &:has(:checked) {
        color: var(--md-comp-button-elevated-hovered-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
      }
    }
  }
  &:focus:not(.yu-button-disabled) {
    color: var(--md-comp-button-elevated-focused-icon-label-color, var(--md-sys-color-primary));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-elevated-focused-icon-label-color-toggle-unselected, var(--md-sys-color-primary));

      &:has(:checked) {
        color: var(--md-comp-button-elevated-focused-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
      }
    }
  }
  &:active:not(.yu-button-disabled) {
    color: var(--md-comp-button-elevated-pressed-icon-label-color, var(--md-sys-color-primary));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-elevated-pressed-icon-label-color-toggle-unselected, var(--md-sys-color-primary));

      &:has(:checked) {
        color: var(--md-comp-button-elevated-pressed-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
      }
    }
  }
}
.yu-button-color-filled {
  background-color: var(--md-comp-button-filled-container-color, var(--md-sys-color-primary));
  box-shadow: var(--md-comp-button-filled-elevation, var(--md-sys-elevation-level0));
  color: var(--md-comp-button-filled-icon-label-color, var(--md-sys-color-on-primary));

  &.yu-button-type-toggle:not(.yu-button-disabled) {
    background-color: var(--md-comp-button-filled-container-color-toggle-unselected, var(--md-sys-color-surface-container));
    color: var(--md-comp-button-filled-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

    &:has(:checked) {
      background-color: var(--md-comp-button-filled-container-color-toggle-selected, var(--md-sys-color-primary));
      color: var(--md-comp-button-filled-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
    }
  }
  &.yu-button-disabled {
    background-color: color-mix(in srgb, var(--md-comp-button-filled-disabled-container-color, var(--md-sys-color-on-surface)) var(--md-comp-button-filled-disabled-container-opacity, 10%), #fff0);
    box-shadow: var(--md-comp-button-filled-disabled-container-elevation, var(--md-sys-elevation-level0));
    color: color-mix(in srgb, var(--md-comp-button-filled-disabled-icon-label-color, var(--md-sys-color-on-surface)) var(--md-comp-button-filled-disabled-icon-label-opacity, 38%), #fff0);
  }
  &:hover:not(.yu-button-disabled) {
    color: var(--md-comp-button-filled-hovered-icon-label-color, var(--md-sys-color-on-primary));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-filled-hovered-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

      &:has(:checked) {
        color: var(--md-comp-button-filled-hovered-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
      }
    }
  }
  &:focus:not(.yu-button-disabled) {
    color: var(--md-comp-button-filled-focused-icon-label-color, var(--md-sys-color-on-primary));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-filled-focused-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

      &:has(:checked) {
        color: var(--md-comp-button-filled-focused-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
      }
    }
  }
  &:active:not(.yu-button-disabled) {
    color: var(--md-comp-button-filled-pressed-icon-label-color, var(--md-sys-color-on-primary));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-filled-pressed-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

      &:has(:checked) {
        color: var(--md-comp-button-filled-pressed-icon-label-color-toggle-selected, var(--md-sys-color-on-primary));
      }
    }
  }
}
.yu-button-color-tonal {
  background-color: var(--md-comp-button-tonal-container-color, var(--md-sys-color-secondary-container));
  box-shadow: var(--md-comp-button-tonal-elevation, var(--md-sys-elevation-level0));
  color: var(--md-comp-button-tonal-icon-label-color, var(--md-sys-color-on-secondary-container));

  &.yu-button-type-toggle:not(.yu-button-disabled) {
    background-color: var(--md-comp-button-tonal-container-color-toggle-unselected, var(--md-sys-color-secondary-container));
    color: var(--md-comp-button-tonal-icon-label-color-toggle-unselected, var(--md-sys-color-on-secondary-container));

    &:has(:checked) {
      background-color: var(--md-comp-button-tonal-container-color-toggle-selected, var(--md-sys-color-secondary));
      color: var(--md-comp-button-tonal-icon-label-color-toggle-selected, var(--md-sys-color-on-secondary));
    }
  }
  &.yu-button-disabled {
    background-color: color-mix(in srgb, var(--md-comp-button-tonal-disabled-container-color, var(--md-sys-color-on-surface)) var(--md-comp-button-tonal-disabled-container-opacity, 10%), #fff0);
    box-shadow: var(--md-comp-button-tonal-disabled-container-elevation, var(--md-sys-elevation-level0));
    color: color-mix(in srgb, var(--md-comp-button-tonal-disabled-icon-label-color, var(--md-sys-color-on-surface)) var(--md-comp-button-tonal-disabled-icon-label-opacity, 38%), #fff0);
  }
  &:hover:not(.yu-button-disabled) {
    color: var(--md-comp-button-tonal-hovered-icon-label-color, var(--md-sys-color-on-secondary-container));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-tonal-hovered-icon-label-color-toggle-unselected, var(--md-sys-color-on-secondary-container));

      &:has(:checked) {
        color: var(--md-comp-button-tonal-hovered-icon-label-color-toggle-selected, var(--md-sys-color-on-secondary));
      }
    }
  }
  &:focus:not(.yu-button-disabled) {
    color: var(--md-comp-button-tonal-focused-icon-label-color, var(--md-sys-color-on-secondary-container));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-tonal-focused-icon-label-color-toggle-unselected, var(--md-sys-color-on-secondary-container));

      &:has(:checked) {
        color: var(--md-comp-button-tonal-focused-icon-label-color-toggle-selected, var(--md-sys-color-on-secondary));
      }
    }
  }
  &:active:not(.yu-button-disabled) {
    color: var(--md-comp-button-tonal-pressed-icon-label-color, var(--md-sys-color-on-secondary-container));

    &.yu-button-type-toggle {
      color: var(--md-comp-button-tonal-pressed-icon-label-color-toggle-unselected, var(--md-sys-color-on-secondary-container));

      &:has(:checked) {
        color: var(--md-comp-button-tonal-pressed-icon-label-color-toggle-selected, var(--md-sys-color-on-secondary));
      }
    }
  }
}
.yu-button-color-outlined {
  background-color: #fff0;
  color: var(--md-comp-button-outlined-icon-label-color, var(--md-sys-color-on-surface-variant));

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border-color: var(--md-comp-button-outlined-outline-color, var(--md-sys-color-outline-variant));
    border-style: solid;
  }
  &.yu-button-type-toggle:not(.yu-button-disabled) {
    background-color: #fff0;
    color: var(--md-comp-button-outlined-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

    &:has(:checked) {
      background-color: var(--md-comp-button-outlined-container-color-toggle-selected, var(--md-sys-color-inverse-surface));
      color: var(--md-comp-button-outlined-icon-label-color-toggle-selected, var(--md-sys-color-inverse-on-surface));

      &::after {
        border: none;
      }
    }
  }
  &.yu-button-disabled {
    background-color: #fff0;
    color: color-mix(in srgb, var(--md-comp-button-outlined-disabled-icon-label-color, var(--md-sys-color-on-surface)) var(--md-comp-button-outlined-disabled-icon-label-opacity, 38%), #fff0);

    &::after {
      border-color: var(--md-comp-button-outlined-disabled-outline-color, var(--md-sys-color-outline-variant));
      border-style: solid;
    }
    &.yu-button-type-toggle {
      &::after {
        border-color: var(--md-comp-button-outlined-disabled-outline-color-toggle-unselected, var(--md-sys-color-outline-variant));
        border-style: solid;
      }
      &:has(:checked) {
        background-color: color-mix(in srgb, var(--md-comp-button-outlined-disabled-container-color-toggle-selected, var(--md-sys-color-on-surface)) var(--md-comp-button-outlined-disabled-container-opacity, 10%), #fff0);

        &::after {
          border: none;
        }
      }
    }
  }
  &:hover:not(.yu-button-disabled) {
    color: var(--md-comp-button-outlined-hovered-icon-label-color, var(--md-sys-color-on-surface-variant));

    &::after {
      border-color: var(--md-comp-button-outlined-hovered-outline-color, var(--md-sys-color-outline-variant));
      border-style: solid;
    }
    &.yu-button-type-toggle {
      color: var(--md-comp-button-outlined-hovered-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

      &::after {
        border-color: var(--md-comp-button-outlined-hovered-outline-color-toggle-unselected, var(--md-sys-color-outline-variant));
        border-style: solid;
      }
      &:has(:checked) {
        color: var(--md-comp-button-outlined-hovered-icon-label-color-toggle-selected, var(--md-sys-color-inverse-on-surface));

        &::after {
          border: none;
        }
      }
    }
  }
  &:focus:not(.yu-button-disabled) {
    color: var(--md-comp-button-outlined-focused-icon-label-color, var(--md-sys-color-on-surface-variant));

    &::after {
      border-color: var(--md-comp-button-outlined-focused-outline-color, var(--md-sys-color-outline-variant));
      border-style: solid;
    }
    &.yu-button-type-toggle {
      color: var(--md-comp-button-outlined-focused-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

      &::after {
        border-color: var(--md-comp-button-outlined-focused-outline-color-toggle-unselected, var(--md-sys-color-outline-variant));
        border-style: solid;
      }
      &:has(:checked) {
        color: var(--md-comp-button-outlined-focused-icon-label-color-toggle-selected, var(--md-sys-color-inverse-on-surface));
      }
    }
  }
  &:active:not(.yu-button-disabled) {
    color: var(--md-comp-button-outlined-pressed-icon-label-color, var(--md-sys-color-on-surface-variant));

    &::after {
      border-color: var(--md-comp-button-outlined-pressed-outline-color, var(--md-sys-color-outline-variant));
      border-style: solid;
    }
    &.yu-button-type-toggle {
      color: var(--md-comp-button-outlined-pressed-icon-label-color-toggle-unselected, var(--md-sys-color-on-surface-variant));

      &::after {
        border-color: var(--md-comp-button-outlined-pressed-outline-color-toggle-unselected, var(--md-sys-color-outline-variant));
        border-style: solid;
      }
      &:has(:checked) {
        color: var(--md-comp-button-outlined-pressed-icon-label-color-toggle-selected, var(--md-sys-color-inverse-on-surface));
      }
    }
  }
}
.yu-button-color-text {
  background-color: #fff0;
  color: var(--md-comp-button-text-icon-label-color, var(--md-sys-color-primary));

  &.yu-button-disabled {
    background-color: color-mix(in srgb, var(--md-comp-button-text-disabled-container-color, var(--md-sys-color-on-surface)) var(--md-comp-button-text-disabled-container-opacity, 10%), #fff0);
    color: color-mix(in srgb, var(--md-comp-button-text-disabled-icon-label-color, var(--md-sys-color-on-surface)) var(--md-comp-button-text-disabled-icon-label-opacity, 38%), #fff0);
  }
  &:hover:not(.yu-button-disabled) {
    color: var(--md-comp-button-text-hovered-icon-label-color, var(--md-sys-color-primary));
  }
  &:focus:not(.yu-button-disabled) {
    color: var(--md-comp-button-text-focused-icon-label-color, var(--md-sys-color-primary));
  }
  &:active:not(.yu-button-disabled) {
    color: var(--md-comp-button-text-pressed-icon-label-color, var(--md-sys-color-primary));
  }
}
.yu-button-size-xsmall {
  height: var(--md-comp-button-xsmall-container-height, 32px);
  --md-comp-icon-optical-size: var(--md-comp-button-xsmall-icon-size, 20px);
  padding-inline: var(--md-comp-button-xsmall-leading-space, 12px) var(--md-comp-button-xsmall-trailing-space, 12px);
  gap: var(--md-comp-button-xsmall-between-icon-label-space, 8px);
  transition: border-radius v-bind('motion("fast", "spatial")');

  &::after {
    border-width: var(--md-comp-button-xsmall-outline-width, 1px);
  }
  &.yu-button-shape-round {
    border-radius: var(--md-comp-button-xsmall-shape-round, calc(var(--md-comp-button-xsmall-container-height, 32px) / 2));
  }
  &.yu-button-shape-square {
    border-radius: var(--md-comp-button-xsmall-shape-square, var(--md-sys-shape-corner-medium));
  }
  &:active:not(.yu-button-disabled) {
    border-radius: var(--md-comp-button-xsmall-shape-pressed-morph, var(--md-sys-shape-corner-small));
  }
  &:has(:checked):not(:active), &:has(:checked).yu-button-disabled {
    &.yu-button-shape-round {
      border-radius: var(--md-comp-button-xsmall-selected-container-shape-round, var(--md-sys-shape-corner-medium));
    }
    &.yu-button-shape-square {
      border-radius: var(--md-comp-button-xsmall-selected-container-shape-square, calc(var(--md-comp-button-xsmall-container-height, 32px) / 2));
    }
  }
}
.yu-button-size-small {
  height: var(--md-comp-button-small-container-height, 40px);
  --md-comp-icon-optical-size: var(--md-comp-button-small-icon-size, 20px);
  padding-inline: var(--md-comp-button-small-leading-space, 16px) var(--md-comp-button-small-trailing-space, 16px);
  gap: var(--md-comp-button-small-between-icon-label-space, 8px);
  transition: border-radius v-bind('motion("fast", "spatial")');

  &::after {
    border-width: var(--md-comp-button-small-outline-width, 1px);
  }
  &.yu-button-shape-round {
    border-radius: var(--md-comp-button-small-shape-round, calc(var(--md-comp-button-small-container-height, 40px) / 2));
  }
  &.yu-button-shape-square {
    border-radius: var(--md-comp-button-small-shape-square, var(--md-sys-shape-corner-medium));
  }
  &:active:not(.yu-button-disabled),
  &:has(:active):not(.yu-button-disabled) {
    border-radius: var(--md-comp-button-small-shape-pressed-morph, var(--md-sys-shape-corner-small));
  }
  &:has(:checked):not(:active),
  &:has(:checked).yu-button-disabled {
    &.yu-button-shape-round {
      border-radius: var(--md-comp-button-small-selected-container-shape-round, var(--md-sys-shape-corner-medium));
    }
    &.yu-button-shape-square {
      border-radius: var(--md-comp-button-small-selected-container-shape-square, calc(var(--md-comp-button-small-container-height, 40px) / 2));
    }
  }
}
.yu-button-size-medium {
  height: var(--md-comp-button-medium-container-height, 56px);
  --md-comp-icon-optical-size: var(--md-comp-button-medium-icon-size, 24px);
  padding-inline: var(--md-comp-button-medium-leading-space, 24px) var(--md-comp-button-medium-trailing-space, 24px);
  gap: var(--md-comp-button-medium-between-icon-label-space, 8px);
  transition: border-radius v-bind('motion("fast", "spatial")');

  &::after {
    border-width: var(--md-comp-button-medium-outline-width, 1px);
  }
  &.yu-button-shape-round {
    border-radius: var(--md-comp-button-medium-shape-round, calc(var(--md-comp-button-medium-container-height, 56px) / 2));
  }
  &.yu-button-shape-square {
    border-radius: var(--md-comp-button-medium-shape-square, var(--md-sys-shape-corner-large));
  }
  &:active:not(.yu-button-disabled),
  &:has(:active):not(.yu-button-disabled) {
    border-radius: var(--md-comp-button-medium-shape-pressed-morph, var(--md-sys-shape-corner-medium));
  }
  &:has(:checked):not(:active),
  &:has(:checked).yu-button-disabled {
    &.yu-button-shape-round {
      border-radius: var(--md-comp-button-medium-selected-container-shape-round, var(--md-sys-shape-corner-large));
    }
    &.yu-button-shape-square {
      border-radius: var(--md-comp-button-medium-selected-container-shape-square, calc(var(--md-comp-button-medium-container-height, 56px) / 2));
    }
  }
}
.yu-button-size-large {
  height: var(--md-comp-button-large-container-height, 96px);
  --md-comp-icon-optical-size: var(--md-comp-button-large-icon-size, 32px);
  padding-inline: var(--md-comp-button-large-leading-space, 48px) var(--md-comp-button-large-trailing-space, 48px);
  gap: var(--md-comp-button-large-between-icon-label-space, 12px);
  transition: border-radius v-bind('motion("fast", "spatial")');

  &::after {
    border-width: var(--md-comp-button-large-outline-width, 2px);
  }
  &.yu-button-shape-round {
    border-radius: var(--md-comp-button-large-shape-round, calc(var(--md-comp-button-large-container-height, 96px) / 2));
  }
  &.yu-button-shape-square {
    border-radius: var(--md-comp-button-large-shape-square, var(--md-sys-shape-corner-extra-large));
  }
  &:active:not(.yu-button-disabled),
  &:has(:active):not(.yu-button-disabled) {
    border-radius: var(--md-comp-button-large-shape-pressed-morph, var(--md-sys-shape-corner-large));
  }
  &:has(:checked):not(:active),
  &:has(:checked).yu-button-disabled {
    &.yu-button-shape-round {
      border-radius: var(--md-comp-button-large-selected-container-shape-round, var(--md-sys-shape-corner-extra-large));
    }
    &.yu-button-shape-square {
      border-radius: var(--md-comp-button-large-selected-container-shape-square, calc(var(--md-comp-button-large-container-height, 96px) / 2));
    }
  }
}
.yu-button-size-xlarge {
  height: var(--md-comp-button-xlarge-container-height, 136px);
  --md-comp-icon-optical-size: var(--md-comp-button-xlarge-icon-size, 40px);
  padding-inline: var(--md-comp-button-xlarge-leading-space, 64px) var(--md-comp-button-xlarge-trailing-space, 64px);
  gap: var(--md-comp-button-xlarge-between-icon-label-space, 16px);
  transition: border-radius v-bind('motion("fast", "spatial")');

  &::after {
    border-width: var(--md-comp-button-xlarge-outline-width, 3px);
  }
  &.yu-button-shape-round {
    border-radius: var(--md-comp-button-xlarge-shape-round, calc(var(--md-comp-button-xlarge-container-height, 136px) / 2));
  }
  &.yu-button-shape-square {
    border-radius: var(--md-comp-button-xlarge-shape-square, var(--md-sys-shape-corner-extra-large));
  }
  &:active:not(.yu-button-disabled),
  &:has(:active):not(.yu-button-disabled) {
    border-radius: var(--md-comp-button-xlarge-shape-pressed-morph, var(--md-sys-shape-corner-large));
  }
  &:has(:checked):not(:active),
  &:has(:checked).yu-button-disabled {
    &.yu-button-shape-round {
      border-radius: var(--md-comp-button-xlarge-selected-container-shape-round, var(--md-sys-shape-corner-extra-large));
    }
    &.yu-button-shape-square {
      border-radius: var(--md-comp-button-xlarge-selected-container-shape-square, calc(var(--md-comp-button-xlarge-container-height, 136px) / 2));
    }
  }
}
</style>
