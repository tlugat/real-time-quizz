import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getQuizzes } from 'api'

export const useQuizzesQuery = () => {
  return useQuery({
    queryKey: queryKeys.quizz.list().queryKey,
    queryFn: () => getQuizzes()
  })
}
