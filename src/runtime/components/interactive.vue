<template>
  <div
    ref="root"
    class="yu-interactive yu-component"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRuntimeConfig } from '#app'

/**
 * Properties and states
 */

const runtimePublic = useRuntimeConfig().public
const materialYu = runtimePublic.materialYu
const defaultConfig = materialYu.components.interactive

interface RippleBehavior {
  fadeInDuration?: number
  fadeInTimingFunction?: string
  expandDuration?: number
  expandTimingFunction?: string
  fadeOutDuration?: number
  fadeOutTimingFunction?: string
  opacity?: number
}

interface StateLayerBehavior {
  fadeInDuration?: number
  fadeInTimingFunction?: string
  fadeOutDuration?: number
  fadeOutTimingFunction?: string
  opacity?: number
  focusOpacity?: number
}

const props = defineProps<{
  yuFocusRing: boolean
  yuRipple: boolean
  yuStateLayer: boolean
  yuRippleBehavior?: RippleBehavior
  yuStateLayerBehavior?: StateLayerBehavior
  yuLayerColor?: string
}>()

const root = ref<HTMLElement | null>(null)

/**
 * Computed final values
 */

const finalRipple = computed(() => ({
  fadeInDuration: props.yuRippleBehavior?.fadeInDuration ?? defaultConfig.rippleBehavior.fadeInDuration,
  fadeInTimingFunction: props.yuRippleBehavior?.fadeInTimingFunction ?? defaultConfig.rippleBehavior.fadeInTimingFunction,
  expandDuration: props.yuRippleBehavior?.expandDuration ?? defaultConfig.rippleBehavior.expandDuration,
  expandTimingFunction: props.yuRippleBehavior?.expandTimingFunction ?? defaultConfig.rippleBehavior.expandTimingFunction,
  fadeOutDuration: props.yuRippleBehavior?.fadeOutDuration ?? defaultConfig.rippleBehavior.fadeOutDuration,
  fadeOutTimingFunction: props.yuRippleBehavior?.fadeOutTimingFunction ?? defaultConfig.rippleBehavior.fadeOutTimingFunction,
  opacity: props.yuRippleBehavior?.opacity ?? defaultConfig.rippleBehavior.opacity
}))
const finalStateLayer = computed(() => ({
  fadeInDuration: props.yuStateLayerBehavior?.fadeInDuration ?? defaultConfig.stateLayerBehavior.fadeInDuration,
  fadeInTimingFunction: props.yuStateLayerBehavior?.fadeInTimingFunction ?? defaultConfig.stateLayerBehavior.fadeInTimingFunction,
  fadeOutDuration: props.yuStateLayerBehavior?.fadeOutDuration ?? defaultConfig.stateLayerBehavior.fadeOutDuration,
  fadeOutTimingFunction: props.yuStateLayerBehavior?.fadeOutTimingFunction ?? defaultConfig.stateLayerBehavior.fadeOutTimingFunction,
  opacity: props.yuStateLayerBehavior?.opacity ?? defaultConfig.stateLayerBehavior.opacity,
  focusOpacity: props.yuStateLayerBehavior?.focusOpacity ?? defaultConfig.stateLayerBehavior.focusOpacity
}))
const parentColor = ref('var(--md-sys-color-surface)')
const finalLayerColor = computed(() => props.yuLayerColor ?? parentColor.value)

/**
 * Lifecycle hooks and logic
 */

onMounted(() => {
  const el = root.value
  if (!el) return

  if (props.yuFocusRing) {
    el.classList.add('yu-focus-ring')
  }
  if (props.yuRipple) {
    el.classList.add('yu-ripple')
  }
  if (props.yuStateLayer) {
    el.classList.add('yu-state-layer')
  }

  const parent = el.parentElement
  if (!parent) return

  parentColor.value = window.getComputedStyle(parent).color

  const prevPosition = parent.style.position
  if (!prevPosition || prevPosition === 'static') {
    parent.style.position = 'relative'
  }

  if (props.yuFocusRing) {
    parent.style.outline = 'none'
  }

  /**
   * Ripple implementation
  **/

  if (props.yuRipple) {
    let ripples: HTMLElement[] = []

    const beginFade = (ripple: HTMLElement) => {
      const t = (ripple as any).__rippleExpandTimeout
      if (typeof t === 'number') {
        clearTimeout(t)
        delete (ripple as any).__rippleExpandTimeout
      }

      ripple.classList.add('yu-ripple-leaving')
      ripple.addEventListener('transitionend', () => {
        if (el.contains(ripple)) el.removeChild(ripple)
      }, { once: true })
    }

    const createRipple = (event: MouseEvent) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const size = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const ripple = document.createElement('div')
      ripple.classList.add('yu-ripple-effect')
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      const onExpandEnd = (ev: AnimationEvent) => {
        if (ev.animationName !== 'ripple-expand') return
        ripple.dataset.expanded = 'true'
        ripple.classList.remove('yu-ripple-animating')
        const t = (ripple as any).__rippleExpandTimeout
        if (typeof t === 'number') clearTimeout(t)
        if (ripple.dataset.removeRequested === 'true') beginFade(ripple)
      }
      ripple.addEventListener('animationend', onExpandEnd, { once: true })

      ripple.offsetHeight
      ripple.classList.add('yu-ripple-animating')

      ;(ripple as any).__rippleExpandTimeout = window.setTimeout(() => {
        ripple.dataset.expanded = 'true'
        ripple.classList.remove('yu-ripple-animating')
        delete (ripple as any).__rippleExpandTimeout
        if (ripple.dataset.removeRequested === 'true') beginFade(ripple)
      }, props.yuRippleBehavior?.expandDuration ?? 450)

      el.appendChild(ripple)
      ripples.push(ripple)
    }

    const removeRipples = () => {
      for (const ripple of ripples) {
        if (ripple.dataset.expanded === 'true') {
          beginFade(ripple)
        } else {
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

    const onMouseDown = (e: Event) => createRipple(e as MouseEvent)
    const onMouseUp = () => removeRipples()
    const onMouseLeave = () => removeRipples()

    parent.addEventListener('mousedown', onMouseDown)
    parent.addEventListener('mouseup', onMouseUp)
    parent.addEventListener('mouseleave', onMouseLeave)

    const cleanup = () => {
      parent.removeEventListener('mousedown', onMouseDown)
      parent.removeEventListener('mouseup', onMouseUp)
      parent.removeEventListener('mouseleave', onMouseLeave)

      for (const r of ripples) {
        const t = (r as any).__rippleExpandTimeout
        if (typeof t === 'number') {
          clearTimeout(t)
          delete (r as any).__rippleExpandTimeout
        }
      }
      ripples = []

      if (!prevPosition || prevPosition === 'static') {
        parent.style.position = prevPosition
      }
    }

    onUnmounted(cleanup)
  }
})
</script>

<style lang="scss" scoped>
/**
 * Component's main style
 */

.yu-interactive {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.yu-ripple {
  overflow: hidden;
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
  transition-duration: v-bind('finalStateLayer.fadeInDuration');
  transition-timing-function: v-bind('finalStateLayer.fadeInTimingFunction');
}
:global(*:hover > .yu-state-layer::after) {
  opacity: v-bind('finalStateLayer.opacity');
  transition-property: opacity;
  transition-duration: v-bind('finalStateLayer.fadeOutDuration');
  transition-timing-function: v-bind('finalStateLayer.fadeOutTimingFunction');
}
:global(*:focus-visible > .yu-state-layer::after) {
  opacity: v-bind('finalStateLayer.focusOpacity');
  transition-property: opacity;
  transition-duration: v-bind('finalStateLayer.fadeOutDuration');
  transition-timing-function: v-bind('finalStateLayer.fadeOutTimingFunction');
}

/**
 * Ripple effect
 */

:global(.yu-ripple-effect) {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background-color: v-bind('finalLayerColor');
  opacity: v-bind('finalRipple.opacity');
  transform: scale(1);
  will-change: transform;
  animation: none;
}
:global(.yu-ripple-effect.yu-ripple-animating) {
  animation-name: ripple-expand;
  animation-duration: v-bind('finalRipple.expandDuration');
  animation-timing-function: v-bind('finalRipple.expandTimingFunction');
  animation-fill-mode: forwards;
}
:global(.yu-ripple-leaving) {
  opacity: 0;
  transition-property: opacity;
  transition-duration: v-bind('finalRipple.fadeOutDuration');
  transition-timing-function: v-bind('finalRipple.fadeOutTimingFunction');
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
:global(:focus-visible > .yu-focus-ring) {
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
