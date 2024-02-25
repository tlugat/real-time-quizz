import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getQuizzThemesPack } from 'api'

export const useQuizzThemesPackQuery = () => {
  return useQuery({
    queryKey: queryKeys.quizzThemePack.list().queryKey,
    queryFn: () => getQuizzThemesPack()
  })
}
