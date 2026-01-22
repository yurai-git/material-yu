import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import { name, version } from '../package.json';
import { defaultOptions } from './defaults';
import type { Contrast, MotionScheme, Theme } from './runtime/types';

export type DeepRequired<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
    ? { [P in keyof T]-?: P extends 'styleSets' ? T[P] : DeepRequired<T[P]> }
    : T;

export interface ModuleOptions {
  /**
   * Turn on or off the `@nuxt/image` module
   * @default `true`
   */
  image?: boolean;

  /**
   * Define the default theme
   * @default `'system'`
   */
  theme?: Theme;

  /**
   * Define the default contrast
   * @default `'system'`
   */
  contrast?: Contrast;

  /**
   * Define the default motion scheme
   * @default `'expressive'`
   */
  motionScheme?: MotionScheme;

  /**
   * Define the default motion reduction
   * @default `false`
   */
  reducedMotion?: boolean;

  /**
   * Define the default transparency reduction
   * @default `false`
   */
  reducedTransparency?: boolean;

  /**
   * Define the style of icons
   * @default `'Material Symbols Outlined'`
   */
  iconStyle?: string;

  /**
   * References
   */
  references?: {
    /**
     * Color configurations
     */
    color?: {
      /**
       * Seed color for dynamic
       * @default `'#6750a4'`
       */
      sourceColor?: string;
    };
  };
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
    const { resolve } = createResolver(import.meta.url);

    const ModuleOptions = options as DeepRequired<ModuleOptions>;
    nuxt.options.runtimeConfig.public.materialYu = ModuleOptions;

    const iconStyle = ModuleOptions.iconStyle;
    const sourceColor = ModuleOptions.references.color.sourceColor;

    nuxt.options.alias['@material-yu/typescales'] = resolve(
      './runtime/assets/stylesheets/typescales',
    );
    nuxt.options.alias['@material-yu'] = resolve('./runtime/composables');
    nuxt.options.css.push(
      resolve('./runtime/assets/stylesheets/material-tokens.scss'),
    );
    const mapStyleToName = (style: string) => {
      // Half-width spaces to plus signs
      return style.replace(/\s/g, '+');
    };
    nuxt.options.app.head.link = nuxt.options.app.head.link || [];
    nuxt.options.app.head.link.push({
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css2?family=${mapStyleToName(iconStyle)}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`,
    });

    const theme = themeFromSourceColor(argbFromHex(sourceColor));

    if (import.meta.client) {
      console.log(JSON.stringify(theme, null, 2));
      applyTheme(theme);
    }

    addPlugin(resolve('./runtime/plugin'));
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'yu',
      pathPrefix: false,
    });
    addImportsDir(resolve('./runtime/composables'));
  },
});
