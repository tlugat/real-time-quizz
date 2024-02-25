import { createQueryKeys } from '@lukemorales/query-key-factory'

export const gameStatsKeys = createQueryKeys('gameStats', {
  average: ({ days }) => [{ days }],
  detail: (gameStatsId) => [{ gameStatsId }]
})
