import { createQueryKeys } from '@lukemorales/query-key-factory'

export const achievementKeys = createQueryKeys('achievement', {
  detail: (achievementId) => [achievementId],
  userAchievementDetail: (userAchievementId) => [userAchievementId],
  list: (filters) => [{ filters }],
  userAchievementList: (filters) => [{ filters }]
})
