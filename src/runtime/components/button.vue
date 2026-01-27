<template>
  <component
    :is="element"
    v-if="mdTogglable == false"
    ref="root"
    :class="[
      'md-component',
      'md-button',
      'md-button-type-default',
      `md-button-size-${mdSize}`,
      `md-button-shape-${mdShape}`,
      `md-button-color-${mdColor}`,
      'md-button-input',
      { 'md-button-disabled': $attrs.disabled || props.softDisabled },
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
    <span
      v-if="props.mdText"
      class="md-button-label"
    >
      {{ props.mdText }}
    </span>
  </component>
  <label
    v-else
    ref="root"
    :class="[
      'md-component',
      'md-button',
      'md-button-type-toggle',
      `md-button-size-${mdSize}`,
      `md-button-shape-${mdShape}`,
      `md-button-color-${mdColor}`,
      { 'md-button-disabled': $attrs.disabled || props.softDisabled },
    ]"
    @click="handleClick"
  >
    <input
      :id="$attrs.id as string"
      type="checkbox"
      :disabled="$attrs.disabled as boolean"
      :name="$attrs.name as string"
      :checked="internalChecked"
      :class="['md-button-input']"
      @change="handleCheck"
    >
    <slot />
    <span
      v-if="props.mdText"
      :class="['md-button-label']"
    >
      {{ props.mdText }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  resolveComponent,
  useAttrs,
  watch,
  type ComponentPublicInstance,
} from 'vue'

/**
 * Properties and states
 */

const attributes = useAttrs()
const emits = defineEmits(['update:checked'])

const props = defineProps({
  mdTogglable: {
    type: Boolean,
    default: false,
  },
  mdSize: {
    type: String,
    default: 'small',
  },
  mdShape: {
    type: String as () => 'round' | 'square',
    default: 'round',
  },
  mdColor: {
    type: String,
    default: 'filled',
  },
  mdText: {
    type: String,
    default: 'Button',
  },
  mdIcon: {
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
watch(
  () => props.checked,
  (newValue) => {
    internalChecked.value = newValue
  },
)

const handleCheck = (event: Event) => {
  const newCheckedValue = (event.target as HTMLInputElement).checked
  internalChecked.value = newCheckedValue
  emits('update:checked', newCheckedValue)
}

const element = computed(() =>
  attributes.href ? resolveComponent('NuxtLink') : 'button',
)

const root = ref<ComponentPublicInstance | HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!root.value) return
    const el = (
      '$el' in root.value ? root.value.$el : root.value
    ) as HTMLElement
    if (!el) return
  })
})
</script>

<style lang="scss" scoped>
.md-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  width: fit-content;
  -webkit-tap-highlight-color: #fff0;

  .md-icon {
    --icon-size: var(--button-icon-size);
  }
}
.md-button-disabled {
  cursor: not-allowed;
}
.md-button-input {
  outline: none;
}
.md-button-label {
  width: max-content;
}
.md-button-type-toggle .md-button-input {
  appearance: none;
  position: absolute;
}
</style>
