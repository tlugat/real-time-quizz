import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createQuizz } from 'api'
import { queryKeys } from '../queryKeys'

export const useCreateQuizzMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => createQuizz(formData),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.quizz.list().queryKey)
  })
}
