import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getGameByCode } from '@/api'

export const useGameQuery = (code) => {
  return useQuery({
    queryKey: queryKeys.game.detail(code).queryKey,
    queryFn: () => getGameByCode(code)
  })
}
