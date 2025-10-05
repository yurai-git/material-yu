import { defineNuxtModule, createResolver, addPlugin, addComponentsDir, addImportsDir } from '@nuxt/kit'
import { defaultOptions } from './defaults'
import { name, version } from '../package.json'

type ColorSchemeValue = 'system' | 'light' | 'dark'
type ContrastValue = 'system' | 'default' | 'medium' | 'high'
type MotionSchemeValue = 'standard' | 'expressive'
type YuIconStyleValue = 'outlined' | 'rounded' | 'sharp'

export interface ModuleOptions {
  /**
   * Turn on or off the `@nuxt/image` module
   * @defaultValue `true`
   */
  image?: boolean

  /**
   * Define the default color scheme
   * @defaultValue `'system'`
   */
  colorScheme?: ColorSchemeValue

  /**
   * Define the default contrast
   * @defaultValue `'system'`
   */
  contrast?: ContrastValue

  /**
   * Turn on or off motion reduction
   * @defaultValue `false`
   */
  reduceMotion?: boolean

  /**
   * Define the default motion scheme
   * @defaultValue `'expressive'`
   */
  motionScheme?: MotionSchemeValue

  /**
   * Path to the directory where the Material color schemes are stored
   * @defaultValue `undefined`
   */
  colorSchemePath?: string

  /**
   * Component configurations
   */
  components?: {
    /**
     * Configurations for the `yuIcon` component
     */
    yuIcon?: {
      /**
       * Define the default style of Material Symbols
       * @defaultValue `'outlined'`
       */
      style?: YuIconStyleValue

      /**
       * Define the default `yuWeight`
       * @defaultValue `400`
       */
      weight?: number

      /**
       * Define the default `yuFill`
       * @defaultValue `false`
       */
      fill?: boolean

      /**
       * Define the default `yuEmphasis`
       * @defaultValue `false`
       */
      emphasis?: boolean

      /**
       * Define the default `yuSize`
       * @defaultValue `24`
       */
      size?: number
    }
    /**
     * Configurations for the `yuLayout` component
     */
    yuLayout?: {
      /**
       * Define the default `yuPaneColor`
       * @defaultValue `'md.sys.color.surface'`
       */
      paneColor?: string

      /**
       * Define the default `yuWindowColor`
       * @defaultValue `'md.sys.color.surface-container'`
       */
      windowColor?: string
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

    nuxt.options.css.push(resolve('./runtime/assets/stylesheets/material-tokens.scss'))

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
      href: yuIconUrl,
    })

    nuxt.options.runtimeConfig.public.materialYu = {
      ...defaultOptions,
      ...options,
      components: {
        ...defaultOptions.components,
        ...options.components,
        yuIcon: {
          ...defaultOptions.components.yuIcon,
          ...options.components?.yuIcon,
        },
        yuLayout: {
          ...defaultOptions.components.yuLayout,
          ...options.components?.yuLayout,
        },
      },
    }

    addPlugin(resolve('./runtime/plugin'))

    addComponentsDir({
      path: resolve('./runtime/components'),
    })

    addImportsDir(resolve('./runtime/composables'))
  },
})
