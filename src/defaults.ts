import type { ModuleOptions, DeepRequired } from './module'

export const defaultOptions = {
  prefix: 'yu',
  fonts: true,
  image: true,
  theme: 'system',
  contrast: 'system',
  motionScheme: 'expressive',
  components: {
    yuIcon: {
      style: 'outlined',
      weight: 400,
      fill: false,
      emphasis: false,
      size: 24,
    },
    yuLayout: {
      paneColor: 'md.sys.color.surface',
      windowColor: 'md.sys.color.surface-container',
    },
    yuButton: {
      type: 'default',
      size: 'small',
      shape: 'round',
      color: 'elevated',
    },
  },
} satisfies DeepRequired<ModuleOptions>
