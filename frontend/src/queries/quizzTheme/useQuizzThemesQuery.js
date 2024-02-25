import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getQuizzThemes } from 'api'

export const useQuizzThemesQuery = () => {
  return useQuery({
    queryKey: queryKeys.quizzTheme.list().queryKey,
    queryFn: () => getQuizzThemes()
  })
}
