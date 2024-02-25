import { createQueryKeys } from '@lukemorales/query-key-factory'

export const quizzThemeKeys = createQueryKeys('quizzTheme', {
  detail: (quizzThemeId) => [quizzThemeId],
  list: (filters) => [{ filters }],
  publicList: (filters) => [{ filters }]
})
