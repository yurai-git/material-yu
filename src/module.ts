import { defineNuxtModule, createResolver, addPlugin, addComponentsDir, addImportsDir } from '@nuxt/kit'
import { defu } from 'defu'
import { defaultOptions } from './defaults'
import { name, version } from '../package.json'
import type { MotionSchemeValue, IconStyleValue, ButtonSizeValue, ButtonShapeValue, ButtonColorValue, MdSysColor } from './runtime/types'
import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities'

type ThemeValue = 'system' | 'light' | 'dark'
type ContrastValue = 'system' | 'default' | 'medium' | 'high'

export type DeepRequired<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
    ? { [P in keyof T]-?: DeepRequired<T[P]> }
    : T

export interface ModuleOptions {
  /**
   * Turn on or off the `@nuxt/fonts` module
   * @default `true`
   */
  fonts?: boolean

  /**
   * Turn on or off the `@nuxt/image` module
   * @default `true`
   */
  image?: boolean

  /**
   * Define the default theme
   * @default `'system'`
   */
  theme?: ThemeValue

  /**
   * Define the default contrast preference
   * @default `'system'`
   */
  contrast?: ContrastValue

  /**
   * Define the default motion scheme
   * @default `'expressive'`
   */
  motionScheme?: MotionSchemeValue

  /**
   * Define the style of Material Symbols
   * @default `'outlined'`
   */
  iconStyle?: IconStyleValue

  reference?: {
    /**
     * Color configurations
     */
    color?: {
      /**
       * Seed color for dynamic
       */
      sourceColor?: string | null
    }

    /**
     * Typography configurations
     */
    typography?: {
      /**
       * Define the default brand font
       * @default `'Roboto'`
       */
      brandTypeface?: string

      /**
       * Define the default plain font
       * @default `'Roboto'`
       */
      plainTypeface?: string

      /**
       * Define the font weight for regular
       * @default `400`
       */
      regularWeight?: number

      /**
       * Define the font weight for medium
       * @default `500`
       */
      mediumWeight?: number

      /**
       * Define the font weight for bold
       * @default `700`
       */
      boldWeight?: number
    }
  }
  /**
   * Component configurations
   */
  components?: {
    /**
     * Configurations for the `YuIcon` component
     */
    icon?: {
      /**
       * Define the default `yuWeight`
       * @default `400`
       */
      weight?: number

      /**
       * Define the default `yuFill`
       * @default `false`
       */
      fill?: boolean

      /**
       * Define the default `yuEmphasis`
       * @default `false`
       */
      emphasis?: boolean

      /**
       * Define the default `yuSize`
       * @default `24`
       */
      size?: number
    }
    /**
     * Configurations for the `YuLayout` component
     */
    layout?: {
      /**
       * Define the default `yuPaneColor`
       * @default `'md.sys.color.surface'`
       */
      paneColor?: MdSysColor

      /**
       * Define the default `yuWindowColor`
       * @default `'md.sys.color.surface-container'`
       */
      windowColor?: MdSysColor
    }
    /**
     * Configurations for the `YuButton` component
     */
    button?: {
      /**
       * Define the default `yuType`
       * @default `false`
       */
      checkable?: boolean

      /**
       * Define the default `yuSize`
       * @default `'small'`
       */
      size?: ButtonSizeValue

      /**
       * Define the default `yuShape`
       * @default `'round'`
       */
      shape?: ButtonShapeValue

      /**
       * Define the default `yuColor`
       * @default `'filled'`
       */
      color?: ButtonColorValue
    }
    /**
     * Configurations for the `YuInteractive` component
     */
    interactive?: {
      /**
       * Define the default `yuFocusRing`
       * @default `true`
       */
      focusRing?: boolean

      /**
       * Define the default `yuRipple`
       * @default `true`
       */
      ripple?: boolean

      /**
       * Define the default `yuStateLayer`
       * @default `true`
       */
      stateLayer?: boolean
      /**
       * Define the default `yuRippleBehavior`
       */
      rippleBehavior?: {
        /**
         * Define the default ripple fade-in duration
         * @default `'450ms'`
         */
        fadeInDuration?: string

        /**
         * Define the default ripple fade-in timing function
         * @default `'cubic-bezier(.2, 0, 0, 1)'`
         */
        fadeInTimingFunction?: string

        /**
         * Define the default ripple expand duration
         * @default `'450ms'`
         */
        expandDuration?: string

        /**
         * Define the default ripple expand timing function
         * @default `'cubic-bezier(.2, 0, 0, 1)'`
         */
        expandTimingFunction?: string

        /**
         * Define the default ripple fade-out duration
         * @default `'375ms'`
         */
        fadeOutDuration?: string

        /**
         * Define the default ripple fade-out timing function
         * @default `'linear'`
         */
        fadeOutTimingFunction?: string

        /**
         * Define the default ripple opacity
         * @default `'var(--md-sys-state-pressed-state-layer-opacity)'`
         */
        opacity?: string
      }
      /**
       * Define the default `yuStateLayerBehavior`
       */
      stateLayerBehavior?: {
        /**
         * Define the default state layer fade-in duration
         * @default `'150ms'`
         */
        fadeInDuration: string

        /**
         * Define the default state layer fade-in timing function
         * @default `'linear'`
         */
        fadeInTimingFunction: string

        /**
         * Define the default state layer fade-out duration
         * @default `'150ms'`
         */
        fadeOutDuration: string

        /**
         * Define the default state layer fade-out timing function
         * @default `'linear'`
         */
        fadeOutTimingFunction: string

        /**
         * Define the default state layer opacity
         * @default `'var(--md-sys-state-hover-state-layer-opacity)'`
         */
        opacity: string

        /**
         * Define the default focus state layer opacity
         * @default `'var(--md-sys-state-focus-state-layer-opacity)'`
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

    nuxt.options.alias['@material-yu/typescales'] = resolve('./runtime/assets/stylesheets/typescales')
    nuxt.options.alias['@material-yu'] = resolve('./runtime/composables')

    nuxt.options.css.push(resolve('./runtime/assets/stylesheets/material-tokens.scss'))

    const iconStyle = options.iconStyle || defaultOptions.iconStyle
    const mapStyleToName = (style: string) => {
      switch (style) {
        case 'rounded': return 'Rounded'
        case 'sharp': return 'Sharp'
        default: return 'Outlined'
      }
    }
    nuxt.options.app.head.link = nuxt.options.app.head.link || []
    nuxt.options.app.head.link.push({
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css2?family=Material+Symbols+${mapStyleToName(iconStyle)}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`,
    })

    const typography = options.reference?.typography || defaultOptions.reference.typography
    const typefaceStyles = `
      :root {
        --md-ref-typeface-brand: ${typography.brandTypeface}, ${typography.plainTypeface}, sans-serif;
        --md-ref-typeface-plain: ${typography.plainTypeface}, sans-serif;
        --md-ref-typeface-weight-regular: ${typography.regularWeight};
        --md-ref-typeface-weight-medium: ${typography.mediumWeight};
        --md-ref-typeface-weight-bold: ${typography.boldWeight};
      }
    `
    nuxt.options.app.head.style = nuxt.options.app.head.style || []
    nuxt.options.app.head.style.push({ textContent: typefaceStyles })

    if (options.reference?.color?.sourceColor) {
      const sourceColor = argbFromHex(options.reference.color.sourceColor)
      const theme = themeFromSourceColor(sourceColor)

      if (import.meta.client) {
        console.log(JSON.stringify(theme, null, 2))
        applyTheme(theme)
      }
    }

    nuxt.options.runtimeConfig.public.materialYu = defu(options, defaultOptions)

    addPlugin(resolve('./runtime/plugin'))
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'yu',
      pathPrefix: false,
    })
    addImportsDir(resolve('./runtime/composables'))
  },
})
