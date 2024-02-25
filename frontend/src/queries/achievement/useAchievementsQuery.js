import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getAchievements } from 'api'

export const useAchievementsQuery = () => {
  return useQuery({
    queryKey: queryKeys.achievement.list().queryKey,
    queryFn: () => getAchievements()
  })
}
