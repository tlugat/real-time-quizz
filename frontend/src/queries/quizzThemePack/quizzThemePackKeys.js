import { createQueryKeys } from '@lukemorales/query-key-factory'

export const quizzThemePackKeys = createQueryKeys('quizzThemePack', {
  detail: (quizzThemePackId) => [quizzThemePackId],
  list: (filters) => [{ filters }]
})
