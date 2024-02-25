import { createQueryKeys } from '@lukemorales/query-key-factory'

export const userKeys = createQueryKeys('user', {
  detail: (token) => [token],
  list: (filters) => [{ filters }]
})
