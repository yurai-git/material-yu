import { defineNuxtModule, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit';
import { defaultOptions } from './defaults';
import { name, version } from '../package.json';

type ColorSchemeValue = 'system' | 'light' | 'dark'
type ContrastValue = 'standard' | 'medium' | 'high'
type MotionSchemeValue = 'standard' | 'expressive'
type YuIconStyleValue = 'outlined' | 'rounded' | 'sharp'

export interface ModuleOptions {
  /**
   * Turn on or off the `@nuxt/image` module.
   * @defaultValue `true`
   */
  image?: boolean

  /**
   * Define the source color of the color system.
   * @defaultValue `0x6750A4`
   */
  sourceColor?: number
  
  /**
   * Define the default color scheme.
   * @defaultValue `'system'`
   */
  colorScheme?: ColorSchemeValue

  /**
   * Define the default contrast.
   * @defaultValue `'standard'`
   */
  contrast?: ContrastValue

  /**
   * Turn on or off motion reduction.
   * @defaultValue `false`
   */
  reduceMotion?: boolean

  /**
   * Define the default motion scheme.
   * @defaultValue `'expressive'`
   */
  motionScheme?: MotionSchemeValue

  /**
   * Path to the directory where the Material color schemes are stored.
   * @defaultValue `undefined`
   */
  colorSchemePath?: string

  /**
   * Component configurations.
   */
  components?: {
    /**
     * Configurations for the `YuIcon` component.
     */
    yuIcon?: {
      /**
       * Define the default style of Material Symbols.
       * @defaultValue `'outlined'`
       */
      style?: YuIconStyleValue

      /**
       * Define the default `yu-weight`.
       * @defaultValue `400`
       */
      weight?: number

      /**
       * Define the default `yu-fill`.
       * @defaultValue `false`
       */
      fill?: boolean

      /**
       * Define the default `yu-emphasis`.
       * @defaultValue `false`
       */
      emphasis?: boolean

      /**
       * Define the default `yu-size`.
       * @defaultValue `24`
       */
      size?: number
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'materialYu',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  defaults: defaultOptions as ModuleOptions,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const yuIconStyle = options.components?.yuIcon?.style || defaultOptions.components?.yuIcon?.style
    const associateYuIconStyle = (style: string) => {
      switch (style) {
        case 'outlined':
          return 'Outlined'
        case 'rounded':
          return 'Rounded'
        case 'sharp':
          return 'Sharp'
        default:
          return 'Outlined'
      }
    }
    const yuIconUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+${associateYuIconStyle(yuIconStyle)}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`

    nuxt.options.app.head.link = nuxt.options.app.head.link || []
    nuxt.options.app.head.link.push({
      rel: 'stylesheet',
      href: yuIconUrl
    })

    nuxt.options.runtimeConfig.public.materialYu = {
      ...defaultOptions,
      ...options,
      components: {
        ...defaultOptions.components,
        ...options.components,
        yuIcon: {
          ...defaultOptions.components.yuIcon,
          ...options.components?.yuIcon
        }
      }
    }

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'yu',
    })

    addImportsDir(resolve('./runtime/composables'))
  },
})
