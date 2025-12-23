export type MotionSchemeValue = 'standard' | 'expressive'
export type MotionDuration = 'fast' | 'default' | 'slow'
export type MotionTarget = 'spatial' | 'effects'
export type TypescaleRole = 'display' | 'headline' | 'title' | 'body' | 'label'
export type TypescaleSize = 'large' | 'medium' | 'small'
export type TypescaleTone = 'baseline' | 'emphasized'
export type IconStyleValue = 'outlined' | 'rounded' | 'sharp'
export type ButtonSizeValue = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
export type ButtonShapeValue = 'round' | 'square'
export type ButtonColorValue = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text'
export type ColorTokens = {
  'primary': string
  'on-primary': string
  'primary-container': string
  'on-primary-container': string
  'secondary': string
  'on-secondary': string
  'secondary-container': string
  'on-secondary-container': string
  'tertiary': string
  'on-tertiary': string
  'tertiary-container': string
  'on-tertiary-container': string
  'error': string
  'on-error': string
  'error-container': string
  'on-error-container': string
  'surface': string
  'on-surface': string
  'surface-variant': string
  'on-surface-variant': string
  'surface-container-highest': string
  'surface-container-high': string
  'surface-container': string
  'surface-container-low': string
  'surface-container-lowest': string
  'inverse-surface': string
  'inverse-on-surface': string
  'outline': string
  'outline-variant': string
  'primary-fixed': string
  'on-primary-fixed': string
  'primary-fixed-dim': string
  'on-primary-fixed-variant': string
  'inverse-primary': string
  'secondary-fixed': string
  'on-secondary-fixed': string
  'secondary-fixed-dim': string
  'on-secondary-fixed-variant': string
  'tertiary-fixed': string
  'on-tertiary-fixed': string
  'tertiary-fixed-dim': string
  'on-tertiary-fixed-variant': string
  'surface-bright': string
  'surface-dim': string
  'scrim': string
  'shadow': string
}
export type TypescaleTokens = {
  'display-large'?: Typescale
  'display-medium'?: Typescale
  'display-small'?: Typescale
  'headline-large'?: Typescale
  'headline-medium'?: Typescale
  'headline-small'?: Typescale
  'title-large'?: Typescale
  'title-medium'?: Typescale
  'title-small'?: Typescale
  'body-large'?: Typescale
  'body-medium'?: Typescale
  'body-small'?: Typescale
  'label-large'?: Typescale
  'label-medium'?: Typescale
  'label-small'?: Typescale
}
export type ColorSets = 'primary' | 'primary-container' | 'secondary' | 'secondary-container' | 'tertiary' | 'tertiary-container' | 'error' | 'error-container' | 'surface' | 'surface-variant' | 'inverse-surface' | 'primary-fixed' | 'primary-fixed-variant' | 'secondary-fixed' | 'secondary-fixed-variant' | 'tertiary-fixed' | 'tertiary-fixed-variant'
export type StyleSets = {
  button: {
    colors: {
      default: {
        containerColor?: keyof ColorTokens
        containerOpacity?: number
        outlineColor?: keyof ColorTokens
        shadowColor?: keyof ColorTokens
        elevation?: number
        labelColor?: keyof ColorTokens
        labelOpacity?: number
        iconColor?: keyof ColorTokens
        iconOpacity?: number
        stateLayerColor?: keyof ColorTokens
        stateLayerOpacity?: number
      }
      unselected?: {
        containerColor?: keyof ColorTokens
        containerOpacity?: number
        outlineColor?: keyof ColorTokens
        shadowColor?: keyof ColorTokens
        elevation?: number
        labelColor?: keyof ColorTokens
        labelOpacity?: number
        iconColor?: keyof ColorTokens
        iconOpacity?: number
        stateLayerColor?: keyof ColorTokens
        stateLayerOpacity?: number
      }
      selected?: {
        containerColor?: keyof ColorTokens
        containerOpacity?: number
        outlineColor?: keyof ColorTokens
        shadowColor?: keyof ColorTokens
        elevation?: number
        labelColor?: keyof ColorTokens
        labelOpacity?: number
        iconColor?: keyof ColorTokens
        iconOpacity?: number
        stateLayerColor?: keyof ColorTokens
        stateLayerOpacity?: number
      }
    }
  }
}
export type Typescale = {
  font: 'plain' | 'brand'
  weight: 'regular' | 'medium' | 'bold' | number
  size: number
  tracking: number
  lineHeight: number
  axes?: {
    name: string
    value: number
  }[]
}
export type TypescaleSet = {
  name: string
  identifier?: string
  display?: {
    large?: Typescale
    medium?: Typescale
    small?: Typescale
  }
  headline?: {
    large?: Typescale
    medium?: Typescale
    small?: Typescale
  }
  title?: {
    large?: Typescale
    medium?: Typescale
    small?: Typescale
  }
  body?: {
    large?: Typescale
    medium?: Typescale
    small?: Typescale
  }
  label?: {
    large?: Typescale
    medium?: Typescale
    small?: Typescale
  }
}
export type Corner = 'full' | 'extra-large-top' | 'extra-large' | 'large-top' | 'large-end' | 'large-start' | 'large' | 'medium' | 'small' | 'extra-small-top' | 'extra-small' | 'none' | 'large-increased' | 'extra-large-increased' | 'extra-extra-large'
export type CornerValue = 'none' | 'extra-small' | 'small' | 'medium' | 'large' | 'large-increased' | 'extra-large' | 'extra-large-increased' | 'extra-extra-large'
export type Motion = 'fast-spatial' | 'fast-effects' | 'default-spatial' | 'default-effects' | 'slow-spatial' | 'slow-effects'
