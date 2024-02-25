import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getGameStats } from 'api'

export const useGameStatsQuery = (gameStatsId) => {
  return useQuery({
    queryKey: queryKeys.gameStats.detail(gameStatsId).queryKey,
    queryFn: () => getGameStats(gameStatsId),
    enabled: !!gameStatsId
  })
}
