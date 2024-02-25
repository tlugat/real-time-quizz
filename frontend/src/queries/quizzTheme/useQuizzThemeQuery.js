import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getQuizzTheme } from 'api'

export const useQuizzThemeQuery = (quizzThemeId) => {
  console.log('in')
  console.log('quizzThemeId :', quizzThemeId)
  return useQuery({
    queryKey: queryKeys.quizzTheme.detail(quizzThemeId).queryKey,
    queryFn: () => getQuizzTheme(),
    enabled: !!quizzThemeId
  })
}
