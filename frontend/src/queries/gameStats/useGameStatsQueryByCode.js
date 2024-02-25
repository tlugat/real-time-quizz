import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getGameStatsByCode } from 'api'

export const useGameStatsByCodeQuery = (code) => {
  return useQuery({
    queryKey: queryKeys.gameStats.detail(code).queryKey,
    queryFn: () => getGameStatsByCode(code),
    enabled: !!code
  })
}
