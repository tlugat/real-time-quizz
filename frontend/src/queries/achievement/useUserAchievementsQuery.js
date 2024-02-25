import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUserAchievements } from 'api'

export const useUserAchievementsQuery = () => {
  return useQuery({
    queryKey: queryKeys.achievement.userAchievementList().queryKey,
    queryFn: () => getUserAchievements()
  })
}
