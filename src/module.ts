import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import { name, version } from '../package.json'
import { defaultOptions } from './defaults'
import type {
  Contrast,
  MotionScheme,
  ReducedMotion,
  ReducedTransparency,
  Theme,
} from './runtime/types'

export type DeepRequired<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
    ? { [P in keyof T]-?: P extends 'styleSets' ? T[P] : DeepRequired<T[P]> }
    : T

export interface ModuleOptions {
  /**
   * Choose wether to use the `@nuxt/image` module
   * @default `true`
   */
  image?: boolean

  /**
   * Define the default theme
   * @default `'system'`
   */
  theme?: Theme

  /**
   * Define the default contrast
   * @default `'system'`
   */
  contrast?: Contrast

  /**
   * Define the default motion reduction
   * @default `'system'`
   */
  reducedMotion?: ReducedMotion

  /**
   * Define the default transparency reduction
   * @default `'system'`
   */
  reducedTransparency?: ReducedTransparency

  /**
   * Define the default motion scheme
   * @default `'expressive'`
   */
  motionScheme?: MotionScheme

  /**
   * Define the seed color for color scheme generation
   * @default `'#6750a4'`
   */
  sourceColor?: string
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

    const ModuleOptions = options as DeepRequired<ModuleOptions>
    nuxt.options.runtimeConfig.public.materialYu = ModuleOptions

    const sourceColor = ModuleOptions.sourceColor

    const aliases = {
      '@yurai/material-yu/use-theme': './runtime/composables/use-theme.ts',
      '@yurai/material-yu/use-contrast':
        './runtime/composables/use-contrast.ts',
      '@yurai/material-yu/use-reduced-motion':
        './runtime/composables/use-reduced-motion.ts',
      '@yurai/material-yu/use-reduced-transparency':
        './runtime/composables/use-reduced-transparency.ts',
      '@yurai/material-yu/use-motion-scheme':
        './runtime/composables/use-motion-scheme.ts',
      '@yurai/material-yu': './runtime/assets/stylesheets/material-tokens.scss',
    }
    for (const [alias, path] of Object.entries(aliases)) {
      nuxt.options.alias[alias] = resolve(path)
    }
    nuxt.options.css.push(
      resolve('./runtime/assets/stylesheets/material-tokens.scss'),
    )

    const theme = themeFromSourceColor(argbFromHex(sourceColor))

    if (import.meta.client) {
      console.log(JSON.stringify(theme, null, 2))
      applyTheme(theme)
    }

    addPlugin(resolve('./runtime/plugin'))
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'md',
      pathPrefix: false,
    })
    addImportsDir(resolve('./runtime/composables'))
  },
})
