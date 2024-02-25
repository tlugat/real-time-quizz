import { useQuery } from '@tanstack/vue-query'
import { getGameByCode } from 'api'
import { queryKeys } from '../queryKeys'

export const useGameByCodeQuery = (code) => {
  return useQuery({
    queryKey: queryKeys.game.detail(code).queryKey,
    queryFn: () => getGameByCode(code),
    enabled: !!code
  })
}
