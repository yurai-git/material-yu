import { useRuntimeConfig } from '#app'
import type { TypescaleTokens, TypescaleSets } from '../types'

export const useTypescale = (setName: string = 'baseline') => {
  const materialYu = useRuntimeConfig().public.materialYu

  const typescaleSets = (materialYu.typescaleSets as TypescaleSets[]).find(set => set.name === setName)

  const typescales: TypescaleTokens = {
    'display-large': typescaleSets?.display?.large,
    'display-medium': typescaleSets?.display?.medium,
    'display-small': typescaleSets?.display?.small,
    'headline-large': typescaleSets?.headline?.large,
    'headline-medium': typescaleSets?.headline?.medium,
    'headline-small': typescaleSets?.headline?.small,
    'title-large': typescaleSets?.title?.large,
    'title-medium': typescaleSets?.title?.medium,
    'title-small': typescaleSets?.title?.small,
    'body-large': typescaleSets?.body?.large,
    'body-medium': typescaleSets?.body?.medium,
    'body-small': typescaleSets?.body?.small,
    'label-large': typescaleSets?.label?.large,
    'label-medium': typescaleSets?.label?.medium,
    'label-small': typescaleSets?.label?.small,
  }

  return { typescales }
}
