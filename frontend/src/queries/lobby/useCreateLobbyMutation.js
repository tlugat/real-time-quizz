import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createLobby } from 'api'
import { queryKeys } from '../queryKeys'

export const useCreateLobbyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => createLobby({ settings: formData }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.lobby.list().queryKey)
  })
}
