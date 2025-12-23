import { useRuntimeConfig } from '#app'
import type { TypescaleTokens, TypescaleSet } from '../types'
import type { ModuleOptions } from '../../module'
import { defaultOptions } from '~/src/defaults'

export const useTypescale = (setName: string = 'baseline') => {
  const materialYu = useRuntimeConfig().public.materialYu as ModuleOptions

  const typescaleSets = materialYu.typescaleSets || defaultOptions.typescaleSets

  const selectedSet = (typescaleSets.find(set => set.name === setName) || typescaleSets.find(set => set.name === 'baseline')) as TypescaleSet

  if (!selectedSet) {
    throw new Error(`Typescale set '${setName}' not found and no baseline set available.`)
  }

  const typescales: TypescaleTokens = {
    'display-large': selectedSet.display?.large,
    'display-medium': selectedSet.display?.medium,
    'display-small': selectedSet.display?.small,
    'headline-large': selectedSet.headline?.large,
    'headline-medium': selectedSet.headline?.medium,
    'headline-small': selectedSet.headline?.small,
    'title-large': selectedSet.title?.large,
    'title-medium': selectedSet.title?.medium,
    'title-small': selectedSet.title?.small,
    'body-large': selectedSet.body?.large,
    'body-medium': selectedSet.body?.medium,
    'body-small': selectedSet.body?.small,
    'label-large': selectedSet.label?.large,
    'label-medium': selectedSet.label?.medium,
    'label-small': selectedSet.label?.small,
  }

  return { typescales }
}
