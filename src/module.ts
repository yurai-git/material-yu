import { defineNuxtModule, createResolver, addPlugin, addComponentsDir, addImportsDir } from '@nuxt/kit'
import { defu } from 'defu'
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
    icon?: {
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
    layout?: {
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
    button?: {
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
    /**
     * Configurations for the `YuInteractive` component
     */
    interactive?: {
      /**
       * Define the default `yuFocusRing`
       * @defaultValue `true`
       */
      focusRing?: boolean

      /**
       * Define the default `yuRipple`
       * @defaultValue `true`
       */
      ripple?: boolean

      /**
       * Define the default `yuStateLayer`
       * @defaultValue `true`
       */
      stateLayer?: boolean
      /**
       * Define the default `yuRippleBehavior`
       */
      rippleBehavior?: {
        /**
         * Define the default ripple fade-in duration
         * @defaultValue `'450ms'`
         */
        fadeInDuration?: string

        /**
         * Define the default ripple fade-in timing function
         * @defaultValue `'cubic-bezier(.2, 0, 0, 1)'`
         */
        fadeInTimingFunction?: string

        /**
         * Define the default ripple expand duration
         * @defaultValue `'450ms'`
         */
        expandDuration?: string

        /**
         * Define the default ripple expand timing function
         * @defaultValue `'cubic-bezier(.2, 0, 0, 1)'`
         */
        expandTimingFunction?: string

        /**
         * Define the default ripple fade-out duration
         * @defaultValue `'375ms'`
         */
        fadeOutDuration?: string

        /**
         * Define the default ripple fade-out timing function
         * @defaultValue `'linear'`
         */
        fadeOutTimingFunction?: string

        /**
         * Define the default ripple opacity
         * @defaultValue `'var(--md-sys-state-pressed-state-layer-opacity)'`
         */
        opacity?: string
      }
      /**
       * Define the default `yuStateLayerBehavior`
       */
      stateLayerBehavior?: {
        /**
         * Define the default state layer fade-in duration
         * @defaultValue `'150ms'`
         */
        fadeInDuration: string

        /**
         * Define the default state layer fade-in timing function
         * @defaultValue `'linear'`
         */
        fadeInTimingFunction: string

        /**
         * Define the default state layer fade-out duration
         * @defaultValue `'150ms'`
         */
        fadeOutDuration: string

        /**
         * Define the default state layer fade-out timing function
         * @defaultValue `'linear'`
         */
        fadeOutTimingFunction: string

        /**
         * Define the default state layer opacity
         * @defaultValue `'var(--md-sys-state-hover-state-layer-opacity)'`
         */
        opacity: string

        /**
         * Define the default focus state layer opacity
         * @defaultValue `'var(--md-sys-state-focus-state-layer-opacity)'`
         */
        focusOpacity: string
      }
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

    const yuIconStyle = options.components?.icon?.style || defaultOptions.components.icon.style
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

    nuxt.options.runtimeConfig.public.materialYu = defu(options, defaultOptions)

    addPlugin(resolve('./runtime/plugin'))
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix || defaultOptions.prefix,
      pathPrefix: false,
    })
    addImportsDir(resolve('./runtime/composables'))
  },
})
