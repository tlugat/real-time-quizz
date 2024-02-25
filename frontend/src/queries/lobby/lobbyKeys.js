import { createQueryKeys } from '@lukemorales/query-key-factory'

export const lobbyKeys = createQueryKeys('lobby', {
  detail: (lobbyId) => [lobbyId],
  detailByCode: (code) => [code],
  list: (filters) => [{ filters }]
})
