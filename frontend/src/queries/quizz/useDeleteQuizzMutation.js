import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteQuizz } from 'api'
import { queryKeys } from '../queryKeys'

export const useDeleteQuizzMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (quizzId) => deleteQuizz(quizzId),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.quizz.list().queryKey)
  })
}
