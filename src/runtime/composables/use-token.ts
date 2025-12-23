import { useColor, useTypescale } from '#imports'
import type { ColorTokens, TypescaleTokens } from '../types'

export const useToken = () => {
  const getColor = (token: keyof ColorTokens) => {
    return useColor()[token] as string
  }

  const getTypescale = (token: keyof TypescaleTokens, setName: string) => {
    return useTypescale(setName).typescales[token]
  }

  return { getColor, getTypescale }
}
