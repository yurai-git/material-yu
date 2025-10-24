import type { ModuleOptions, DeepRequired } from './module'

export const defaultOptions = {
  prefix: 'yu',
  fonts: true,
  image: true,
  theme: 'system',
  contrast: 'system',
  motionScheme: 'expressive',
  components: {
    icon: {
      style: 'outlined',
      weight: 400,
      fill: false,
      emphasis: false,
      size: 24,
    },
    layout: {
      paneColor: 'md.sys.color.surface',
      windowColor: 'md.sys.color.surface-container',
    },
    button: {
      type: 'default',
      size: 'small',
      shape: 'round',
      color: 'elevated',
    },
    interactive: {
      rippleBehavior: {
        fadeInDuration: '450ms',
        fadeInTimingFunction: 'cubic-bezier(.2, 0, 0, 1)',
        expandDuration: '450ms',
        expandTimingFunction: 'cubic-bezier(.2, 0, 0, 1)',
        fadeOutDuration: '375ms',
        fadeOutTimingFunction: 'linear',
        opacity: 'var(--md-sys-state-pressed-state-layer-opacity)',
      },
      stateLayerBehavior: {
        fadeInDuration: '150ms',
        fadeInTimingFunction: 'linear',
        fadeOutDuration: '150ms',
        fadeOutTimingFunction: 'linear',
        opacity: 'var(--md-sys-state-hover-state-layer-opacity)',
        focusOpacity: 'var(--md-sys-state-focus-state-layer-opacity)',
      }
    }
  },
} satisfies DeepRequired<ModuleOptions>
