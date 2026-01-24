import type { DeepRequired, ModuleOptions } from './module'

export const defaultOptions = {
  image: true,
  theme: 'system',
  contrast: 'system',
  motionScheme: 'expressive',
  reducedMotion: 'system',
  reducedTransparency: 'system',
  iconStyle: 'Material Symbols Outlined',
  references: {
    color: {
      sourceColor: '#6750a4',
    },
  },
} satisfies DeepRequired<ModuleOptions>
