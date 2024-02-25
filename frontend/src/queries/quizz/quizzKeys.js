import { createQueryKeys } from '@lukemorales/query-key-factory'

export const quizzKeys = createQueryKeys('quizz', {
  detail: (quizzId) => [quizzId],
  list: (filters) => [{ filters }]
})
