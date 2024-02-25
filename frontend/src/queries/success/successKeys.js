import { createQueryKeys } from '@lukemorales/query-key-factory'

export const successKeys = createQueryKeys('success', {
  detail: (successId) => [successId],
  userSuccessDetail: (userSuccessId) => [userSuccessId],
  list: (filters) => [{ filters }],
  userSuccessList: (filters) => [{ filters }]
})
