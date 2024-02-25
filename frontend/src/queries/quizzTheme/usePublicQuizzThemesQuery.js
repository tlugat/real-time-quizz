import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getPublicQuizzThemes } from 'api'

export const usePublicQuizzThemesQuery = () => {
  return useQuery({
    queryKey: queryKeys.quizzTheme.publicList().queryKey,
    queryFn: () => getPublicQuizzThemes()
  })
}
