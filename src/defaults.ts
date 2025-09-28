import type { ModuleOptions } from './module'

export const defaultOptions = {
  image: true,
  sourceColor: 0x6750A4,
  colorScheme: 'system',
  contrast: 'standard',
  reduceMotion: false,
  motionScheme: 'expressive',
  colorSchemePath: undefined,
  components: {
    yuIcon: {
      style: 'outlined',
      weight: 400,
      fill: false,
      emphasis: false,
      size: 24
    }
  }
} satisfies ModuleOptions
