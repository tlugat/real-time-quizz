import { createQueryKeys } from '@lukemorales/query-key-factory'

export const gameKeys = createQueryKeys('game', {
  detail: (gameId) => [gameId],
  list: (filters) => [{ filters }]
})
