import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createGame } from 'api'
import { queryKeys } from '../queryKeys'

export const useCreateGameMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => createGame(formData),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.game.list().queryKey)
  })
}
