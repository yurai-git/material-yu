import { defineNuxtModule, createResolver, addPlugin, addComponentsDir, addImportsDir } from '@nuxt/kit'
import { defaultOptions } from './defaults'
import { name, version } from '../package.json'
import type { MotionSchemeValue, YuIconStyleValue, YuButtonTypeValue, YuButtonSizeValue, YuButtonShapeValue, YuButtonColorValue, MdSysColor } from './runtime/types'

type ThemeValue = 'system' | 'light' | 'dark'
type ContrastValue = 'system' | 'default' | 'medium' | 'high'

export type DeepRequired<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
    ? { [P in keyof T]-?: DeepRequired<T[P]> }
    : T

export interface ModuleOptions {
  /**
   * Define the prefix for components
   * @defaultValue `'yu'`
   */
  prefix?: string

  /**
   * Turn on or off the `@nuxt/fonts` module
   * @defaultValue `true`
   */
  fonts?: boolean

  /**
   * Turn on or off the `@nuxt/image` module
   * @defaultValue `true`
   */
  image?: boolean

  /**
   * Define the default theme
   * @defaultValue `'system'`
   */
  theme?: ThemeValue

  /**
   * Define the default contrast preference
   * @defaultValue `'system'`
   */
  contrast?: ContrastValue

  /**
   * Define the default motion scheme
   * @defaultValue `'expressive'`
   */
  motionScheme?: MotionSchemeValue

  /**
   * Component configurations
   */
  components?: {
    /**
     * Configurations for the `YuIcon` component
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
     * Configurations for the `YuLayout` component
     */
    yuLayout?: {
      /**
       * Define the default `yuPaneColor`
       * @defaultValue `'md.sys.color.surface'`
       */
      paneColor?: MdSysColor

      /**
       * Define the default `yuWindowColor`
       * @defaultValue `'md.sys.color.surface-container'`
       */
      windowColor?: MdSysColor
    }
    /**
     * Configurations for the `YuButton` component
     */
    yuButton?: {
      /**
       * Define the default `yuType`
       * @defaultValue `'default'`
       */
      type?: YuButtonTypeValue

      /**
       * Define the default `yuSize`
       * @defaultValue `'small'`
       */
      size?: YuButtonSizeValue

      /**
       * Define the default `yuShape`
       * @defaultValue `'round'`
       */
      shape?: YuButtonShapeValue

      /**
       * Define the default `yuColor`
       * @defaultValue `'elevated'`
       */
      color?: YuButtonColorValue
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

    const yuIconStyle = options.components?.yuIcon?.style || defaultOptions.components.yuIcon.style
    const mapStyleToName = (style: string) => {
      switch (style) {
        case 'rounded': return 'Rounded'
        case 'sharp': return 'Sharp'
        default: return 'Outlined'
      }
    }
    const yuIconUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+${mapStyleToName(yuIconStyle)}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`

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
        yuButton: {
          ...defaultOptions.components.yuButton,
          ...options.components?.yuButton,
        },
      },
    }

    addPlugin(resolve('./runtime/plugin'))
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix || defaultOptions.prefix,
      pathPrefix: false,
    })
    addImportsDir(resolve('./runtime/composables'))
  },
})
