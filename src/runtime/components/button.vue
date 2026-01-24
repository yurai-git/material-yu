<template>
  <component
    :is="element"
    v-if="yuTogglable == false"
    ref="root"
    :class="[
      'yu-component',
      'yu-button',
      'yu-button-type-default',
      `yu-button-size-${yuSize}`,
      `yu-button-shape-${yuShape}`,
      `yu-button-color-${yuColor}`,
      'yu-button-input',
      { 'yu-button-disabled': $attrs.disabled || props.softDisabled },
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
    <span
      v-if="props.yuText"
      class="yu-button-label"
    >
      {{ props.yuText }}
    </span>
  </component>
  <label
    v-else-if="yuTogglable == true"
    ref="root"
    :class="[
      'yu-component',
      'yu-button',
      'yu-button-type-toggle',
      `yu-button-size-${yuSize}`,
      `yu-button-shape-${yuShape}`,
      `yu-button-color-${yuColor}`,
      { 'yu-button-disabled': $attrs.disabled || props.softDisabled },
    ]"
    @click="handleClick"
  >
    <input
      :id="$attrs.id as string"
      type="checkbox"
      :disabled="$attrs.disabled as boolean"
      :name="$attrs.name as string"
      :checked="internalChecked"
      class="yu-button-input"
      @change="handleCheck"
    >
    <slot />
    <span
      v-if="props.yuText"
      class="yu-button-label"
    >
      {{ props.yuText }}
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

const attrs = useAttrs()
const emits = defineEmits(['update:checked'])

const props = defineProps({
  yuTogglable: {
    type: Boolean,
    default: false,
  },
  yuSize: {
    type: String,
    default: 'small',
  },
  yuShape: {
    type: String as () => 'round' | 'square',
    default: 'round',
  },
  yuColor: {
    type: String,
    default: 'filled',
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
  attrs.href ? resolveComponent('NuxtLink') : 'button',
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
.yu-button {
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
</style>
