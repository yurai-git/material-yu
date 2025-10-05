import type { ModuleOptions } from './module'

export const defaultOptions = {
  image: true,
  colorScheme: 'system',
  contrast: 'system',
  reduceMotion: false,
  motionScheme: 'expressive',
  colorSchemePath: undefined,
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
  },
} satisfies ModuleOptions
