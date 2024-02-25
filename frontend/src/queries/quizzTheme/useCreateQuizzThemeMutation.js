import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createQuizzTheme } from 'api'
import { queryKeys } from '../queryKeys'

export const useCreateQuizzThemeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ name, description }) => createQuizzTheme({ name, description }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.quizzTheme.list().queryKey)
  })
}
