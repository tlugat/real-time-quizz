import { createQueryKeys } from '@lukemorales/query-key-factory'

export const inventoryKeys = createQueryKeys('inventory', {
  detail: (inventoryId) => [inventoryId],
  themeList: (filters) => [{ filters }],
  themePackList: (filters) => [{ filters }]
})
