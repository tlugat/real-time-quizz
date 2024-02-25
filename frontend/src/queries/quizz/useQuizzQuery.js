import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getQuizz } from 'api'

export const useQuizzQuery = (quizzId) => {
  return useQuery({
    queryKey: queryKeys.quizz.detail(quizzId).queryKey,
    queryFn: () => getQuizz(),
    enabled: !!quizzId
  })
}
