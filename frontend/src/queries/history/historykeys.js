import { createQueryKeys } from '@lukemorales/query-key-factory'

export const historyKeys = createQueryKeys('history', {
  list: (filters) => [{ filters }],
  lastEntryList: (filters) => [{ filters }],
})
