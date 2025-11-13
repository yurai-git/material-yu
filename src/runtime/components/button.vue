<template>
  <component
    :is="tag"
    v-if="finalCheckable == false"
    ref="root"
    :class="[
      'yu-button',
      'yu-button-type-default',
      'yu-button-input',
      'yu-component',
      `yu-button-size-${finalSize}`,
      `yu-button-shape-${finalShape}`,
      `yu-button-color-${finalColor}`,
      { 'yu-button-disabled': $attrs.disabled || props.softDisabled },
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <YuIcon
      v-if="props.yuIcon"
      :yu-icon-name="props.yuIcon"
      :yu-style="{
        fill: (finalColor === 'filled'),
      }"
      class="yu-button-icon"
    />
    <slot />
    <span
      v-if="props.yuText"
      class="yu-button-label"
    >{{ props.yuText }}</span>
    <YuInteractive
      :yu-ripple="finalInteractive"
      :yu-state-layer="finalInteractive"
    />
  </component>
  <label
    v-else-if="finalCheckable == true"
    ref="root"
    :class="[
      'yu-button',
      'yu-button-type-toggle',
      'yu-component',
      `yu-button-size-${finalSize}`,
      `yu-button-shape-${finalShape}`,
      `yu-button-color-${finalColor}`,
      { 'yu-button-disabled': $attrs.disabled || props.softDisabled },
    ]"
    @click="handleClick"
  >
    <input
      :id="($attrs.id as string)"
      type="checkbox"
      :disabled="($attrs.disabled as boolean)"
      :name="($attrs.name as string)"
      :checked="internalChecked"
      class="yu-button-input"
      @change="handleCheck"
    >
    <YuIcon
      v-if="props.yuIcon"
      :yu-icon-name="props.yuIcon"
      :yu-style="{
        fill: internalChecked,
      }"
      class="yu-button-icon"
    />
    <slot />
    <span
      v-if="props.yuText"
      class="yu-button-label"
    >{{ props.yuText }}</span>
    <YuInteractive
      :yu-ripple="finalInteractive"
      :yu-state-layer="finalInteractive"
    />
  </label>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, resolveComponent, nextTick, type ComponentPublicInstance, useAttrs, watch } from 'vue'
import type { ButtonShapeValue, MotionSchemeValue, ButtonColorValue, ButtonSizeValue, MotionDuration, MotionTarget } from '../types'
import { useRuntimeConfig } from '#app'
import { useMotion } from '../composables/use-motion'

/**
 * Properties and states
 */

const attrs = useAttrs()
const emits = defineEmits(['update:checked'])

const materialYu = useRuntimeConfig().public.materialYu
const defaultConfig = materialYu.components.button

const props = defineProps({
  yuMotionScheme: {
    type: String as () => MotionSchemeValue,
    default: undefined,
  },
  yuCheckable: {
    type: Boolean,
    default: undefined,
  },
  yuSize: {
    type: String as () => ButtonSizeValue,
    default: undefined,
  },
  yuShape: {
    type: String as () => ButtonShapeValue,
    default: undefined,
  },
  yuColor: {
    type: String as () => ButtonColorValue,
    default: undefined,
  },
  yuText: {
    type: String,
    default: 'Button',
  },
  yuIcon: {
    type: String,
    default: undefined,
  },
  softDisabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
})

const handleClick = (event: MouseEvent) => {
  if (props.softDisabled) {
    event.preventDefault()
    event.stopPropagation()
  }
}

const internalChecked = ref(props.checked)
watch(() => props.checked, (newValue) => {
  internalChecked.value = newValue
})

const handleCheck = (event: Event) => {
  const newCheckedValue = (event.target as HTMLInputElement).checked
  internalChecked.value = newCheckedValue
  emits('update:checked', newCheckedValue)
}

const tag = computed(() => attrs.href ? resolveComponent('NuxtLink') : 'button')
const finalDisabled = computed(() => (attrs.disabled as boolean) || props.softDisabled)
const finalInteractive = computed(() => !finalDisabled.value)

const finalMotionScheme = computed<MotionSchemeValue>(() => props.yuMotionScheme ?? (materialYu.motionScheme as MotionSchemeValue))
const finalColor = computed(() => props.yuColor ?? defaultConfig.color)
const finalCheckable = computed(() => {
  const checkable = props.yuCheckable ?? defaultConfig.checkable
  if (finalColor.value === 'text' && checkable === true) {
    console.warn('[Material Yu warn]: `yuCheckable` cannot be `true` when `yuColor` is `\'text\'` on `YuButton` component. Falling back to `false`.')
    return false
  }
  return checkable
})
const finalSize = computed(() => props.yuSize ?? defaultConfig.size)
const finalShape = computed(() => props.yuShape ?? defaultConfig.shape)

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
  })
})
</script>

<style lang="scss" scoped>
@use '@material-yu/typescales';

.yu-button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  width: fit-content;
  -webkit-tap-highlight-color: #fff0;
}
.yu-button-disabled {
  cursor: not-allowed;
}
.yu-button-input {
  outline: none;
}
.yu-button-label {
  width: max-content;
}
.yu-button-type-toggle .yu-button-input {
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
  @include typescales.baseline('label', 'large');
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
  @include typescales.baseline('label', 'large');
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
  @include typescales.baseline('title', 'medium');
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
  @include typescales.baseline('headline', 'small');
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
  @include typescales.baseline('headline', 'large');
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
