import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getGameStatsAverage } from 'api'

export const useAverageGameStatsQuery = (days) => {
  return useQuery({
    queryKey: queryKeys.gameStats.average({ days }).queryKey,
    queryFn: () => getGameStatsAverage(days),
    enabled: !!days
  })
}
