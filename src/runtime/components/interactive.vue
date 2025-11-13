<template>
  <div
    ref="root"
    :class="[
      'yu-interactive yu-component',
      { 'yu-focus-ring': finalFocusRing },
      { 'yu-ripple': finalRipple },
      { 'yu-state-layer': finalStateLayer },
    ]"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, type PropType } from 'vue'
import { useRuntimeConfig } from '#app'

/**
 * Properties and states
 */
const parseDuration = (duration: string | number): number => {
  if (typeof duration === 'number') return duration
  const match = duration.match(/^(\d+)(ms|s)$/)
  if (!match) return 0
  const [, value, unit] = match
  return unit === 's' ? Number.parseInt(value as string) * 1000 : Number.parseInt(value as string)
}

const materialYu = useRuntimeConfig().public.materialYu
const defaultConfig = materialYu.components.interactive

interface RippleBehavior {
  fadeInDuration?: string
  fadeInTimingFunction?: string
  expandDuration?: string
  expandTimingFunction?: string
  fadeOutDuration?: string
  fadeOutTimingFunction?: string
  opacity?: string
  debug?: boolean
}

interface StateLayerBehavior {
  fadeInDuration?: string
  fadeInTimingFunction?: string
  fadeOutDuration?: string
  fadeOutTimingFunction?: string
  opacity?: string
  focusOpacity?: string
}

const props = defineProps({
  yuFocusRing: {
    type: Boolean,
    default: undefined,
  },
  yuRipple: {
    type: Boolean,
    default: undefined,
  },
  yuStateLayer: {
    type: Boolean,
    default: undefined,
  },
  yuRippleBehavior: {
    type: Object as PropType<RippleBehavior>,
    default: undefined,
  },
  yuStateLayerBehavior: {
    type: Object as PropType<StateLayerBehavior>,
    default: undefined,
  },
  yuLayerColor: {
    type: String,
    default: undefined,
  },
})

const root = ref<HTMLElement | null>(null)

/**
 * Computed final values
 */

const finalFocusRing = computed(() => props.yuFocusRing ?? defaultConfig.focusRing)
const finalRipple = computed(() => props.yuRipple ?? defaultConfig.ripple)
const finalStateLayer = computed(() => props.yuStateLayer ?? defaultConfig.stateLayer)
const finalRippleBehavior = computed(() => ({
  fadeInDuration: props.yuRippleBehavior?.fadeInDuration ?? defaultConfig.rippleBehavior.fadeInDuration,
  fadeInTimingFunction: props.yuRippleBehavior?.fadeInTimingFunction ?? defaultConfig.rippleBehavior.fadeInTimingFunction,
  expandDuration: props.yuRippleBehavior?.expandDuration ?? defaultConfig.rippleBehavior.expandDuration,
  expandTimingFunction: props.yuRippleBehavior?.expandTimingFunction ?? defaultConfig.rippleBehavior.expandTimingFunction,
  fadeOutDuration: props.yuRippleBehavior?.fadeOutDuration ?? defaultConfig.rippleBehavior.fadeOutDuration,
  fadeOutTimingFunction: props.yuRippleBehavior?.fadeOutTimingFunction ?? defaultConfig.rippleBehavior.fadeOutTimingFunction,
  opacity: props.yuRippleBehavior?.opacity ?? defaultConfig.rippleBehavior.opacity,
  debug: props.yuRippleBehavior?.debug ?? false,
}))
const finalStateLayerBehavior = computed(() => ({
  fadeInDuration: props.yuStateLayerBehavior?.fadeInDuration ?? defaultConfig.stateLayerBehavior.fadeInDuration,
  fadeInTimingFunction: props.yuStateLayerBehavior?.fadeInTimingFunction ?? defaultConfig.stateLayerBehavior.fadeInTimingFunction,
  fadeOutDuration: props.yuStateLayerBehavior?.fadeOutDuration ?? defaultConfig.stateLayerBehavior.fadeOutDuration,
  fadeOutTimingFunction: props.yuStateLayerBehavior?.fadeOutTimingFunction ?? defaultConfig.stateLayerBehavior.fadeOutTimingFunction,
  opacity: props.yuStateLayerBehavior?.opacity ?? defaultConfig.stateLayerBehavior.opacity,
  focusOpacity: props.yuStateLayerBehavior?.focusOpacity ?? defaultConfig.stateLayerBehavior.focusOpacity,
}))
const parentColor = ref('currentColor')
const finalLayerColor = computed(() => props.yuLayerColor ?? parentColor.value)

/**
 * Lifecycle hooks and logic
 */

onMounted(() => {
  const el = root.value
  if (!el) return

  const host = el.parentElement
  if (!host) return

  const container = el.parentElement
  if (!container) return

  const onFocusIn = (e: Event) => {
    if ((e.target as HTMLElement).matches(':focus-visible')) {
      el.classList.add('is-focused')
    }
  }
  const onFocusOut = () => el.classList.remove('is-focused')

  host.addEventListener('focusin', onFocusIn)
  host.addEventListener('focusout', onFocusOut)

  onUnmounted(() => {
    host.removeEventListener('focusin', onFocusIn)
    host.removeEventListener('focusout', onFocusOut)
  })

  const prevPosition = container.style.position
  if (!prevPosition || prevPosition === 'static') {
    container.style.position = 'relative'
  }

  /**
   * Ripple implementation
   */

  if (finalRipple.value) {
    interface RippleElement extends HTMLElement {
      __rippleExpandTimeout?: number
    }
    let ripples: RippleElement[] = []

    const beginFade = (ripple: RippleElement) => {
      const t = ripple.__rippleExpandTimeout
      if (typeof t === 'number') {
        clearTimeout(t)
        delete ripple.__rippleExpandTimeout
      }

      ripple.classList.add('yu-ripple-leaving')
      ripple.addEventListener('transitionend', () => {
        if (el.contains(ripple)) el.removeChild(ripple)
      }, { once: true })
    }

    const removeRipplesInstantly = () => {
      if (!el) return
      for (const ripple of ripples) {
        const t = ripple.__rippleExpandTimeout
        if (typeof t === 'number') {
          clearTimeout(t)
        }
        if (el.contains(ripple)) {
          el.removeChild(ripple)
        }
      }
      ripples = []
    }

    const createRipple = (event?: PointerEvent): RippleElement | undefined => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const size = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2
      const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2
      const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2

      const ripple = document.createElement('div') as RippleElement
      ripple.classList.add('yu-ripple-effect')
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      const onExpandEnd = (ev: AnimationEvent) => {
        if (ev.animationName !== 'ripple-expand') return
        ripple.dataset.expanded = 'true'
        ripple.classList.remove('yu-ripple-animating')
        const t = ripple.__rippleExpandTimeout
        if (typeof t === 'number') clearTimeout(t)
        if (ripple.dataset.removeRequested === 'true') beginFade(ripple)
      }
      ripple.addEventListener('animationend', onExpandEnd, { once: true })

      void ripple.offsetHeight
      ripple.classList.add('yu-ripple-animating')

      ripple.__rippleExpandTimeout = window.setTimeout(() => {
        ripple.dataset.expanded = 'true'
        ripple.classList.remove('yu-ripple-animating')
        delete ripple.__rippleExpandTimeout
        if (ripple.dataset.removeRequested === 'true') beginFade(ripple)
      }, parseDuration(finalRippleBehavior.value.expandDuration))

      el.appendChild(ripple)
      ripples.push(ripple)
      return ripple
    }

    const removeRipples = () => {
      for (const ripple of ripples) {
        if (ripple.dataset.expanded === 'true') {
          beginFade(ripple)
        }
        else {
          ripple.dataset.removeRequested = 'true'
          const onAnimEnd = (ev: AnimationEvent) => {
            if (ev.animationName !== 'ripple-expand') return
            ripple.removeEventListener('animationend', onAnimEnd)
            beginFade(ripple)
          }
          ripple.addEventListener('animationend', onAnimEnd, { once: true })
        }
      }
      ripples = []
    }

    const onPointerDown = (e: Event) => createRipple(e as PointerEvent)
    const onPointerUp = () => removeRipples()
    const onPointerLeave = () => removeRipples()

    const pulsingKeys = ['Enter']
    const holdingKeys = [' ']
    let isHolding = false

    const onKeyDown = (e: KeyboardEvent) => {
      if (pulsingKeys.includes(e.key)) {
        removeRipplesInstantly()
        createRipple()
      }
      else if (holdingKeys.includes(e.key)) {
        if (!isHolding && !e.repeat) {
          isHolding = true
          createRipple()
        }
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (pulsingKeys.includes(e.key)) {
        removeRipples()
      }
      else if (holdingKeys.includes(e.key)) {
        if (isHolding) {
          isHolding = false
          removeRipples()
        }
      }
    }

    host.addEventListener('pointerdown', onPointerDown)
    host.addEventListener('pointerup', onPointerUp)
    host.addEventListener('pointerleave', onPointerLeave)
    host.addEventListener('keydown', onKeyDown)
    host.addEventListener('keyup', onKeyUp)

    const cleanup = () => {
      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointerup', onPointerUp)
      host.removeEventListener('pointerleave', onPointerLeave)
      host.removeEventListener('keydown', onKeyDown)
      host.removeEventListener('keyup', onKeyUp)

      for (const r of ripples) {
        const t = r.__rippleExpandTimeout
        if (typeof t === 'number') {
          clearTimeout(t)
          delete r.__rippleExpandTimeout
        }
      }
      ripples = []

      if (!prevPosition || prevPosition === 'static') {
        container.style.position = prevPosition
      }
    }

    onUnmounted(cleanup)
  }
})
</script>

<style lang="scss" scoped>
/**
 * Main style
 */

.yu-interactive {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.yu-ripple {
  overflow: v-bind('finalRippleBehavior.debug ? "visible" : "hidden"');
}

/**
 * State layer
 */

.yu-state-layer::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: v-bind('finalLayerColor');
  opacity: 0;
  transition-property: opacity;
  transition-duration: v-bind('finalStateLayerBehavior.fadeOutDuration');
  transition-timing-function: v-bind('finalStateLayerBehavior.fadeOutTimingFunction');
}
.yu-state-layer.is-hovered::after,
:global(:hover > .yu-state-layer::after) {
  opacity: v-bind('finalStateLayerBehavior.opacity');
  transition-property: opacity;
  transition-duration: v-bind('finalStateLayerBehavior.fadeInDuration');
  transition-timing-function: v-bind('finalStateLayerBehavior.fadeInTimingFunction');
}
.yu-state-layer.is-focused::after {
  opacity: v-bind('finalStateLayerBehavior.focusOpacity');
  transition-property: opacity;
  transition-duration: v-bind('finalStateLayerBehavior.fadeInDuration');
  transition-timing-function: v-bind('finalStateLayerBehavior.fadeInTimingFunction');
}

/**
 * Ripple effect
 */

:global(.yu-ripple-effect) {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background-color: v-bind('finalLayerColor');
  opacity: v-bind('finalRippleBehavior.opacity');
  transform: scale(1);
  will-change: transform;
  animation: none;
}
:global(.yu-ripple-effect.yu-ripple-animating) {
  animation-name: ripple-expand;
  animation-duration: v-bind('finalRippleBehavior.expandDuration');
  animation-timing-function: v-bind('finalRippleBehavior.expandTimingFunction');
  animation-fill-mode: forwards;
}
:global(.yu-ripple-leaving) {
  opacity: 0;
  transition-property: opacity;
  transition-duration: v-bind('finalRippleBehavior.fadeOutDuration');
  transition-timing-function: v-bind('finalRippleBehavior.fadeOutTimingFunction');
}

/**
 * Focus ring
 */

.yu-focus-ring {
  outline: none;
  animation-delay: 0s, 150ms;
  animation-duration: 150ms, 450ms;
  animation-timing-function: cubic-bezier(.2, 0, 0, 1);
}
.yu-focus-ring.is-focused {
  outline: var(--md-sys-state-focus-indicator-thickness) solid var(--md-sys-color-secondary);
  outline-offset: var(--md-sys-state-focus-indicator-outer-offset);
  animation-name: outward-grow, outward-shrink;
}

/**
 * Animations
 */

@keyframes ripple-expand {
  from {
    transform: scale(0.2);
  }
}
@keyframes outward-grow {
  from {
    outline-width: 0;
  }
  to {
    outline-width: calc(var(--md-sys-state-focus-indicator-thickness) * 2.666666666666667);
  }
}
@keyframes outward-shrink {
  from {
    outline-width: calc(var(--md-sys-state-focus-indicator-thickness) * 2.666666666666667);
  }
}

/**
 * Accessibility
 */

@media (prefers-reduced-motion: reduce) {
}
</style>
