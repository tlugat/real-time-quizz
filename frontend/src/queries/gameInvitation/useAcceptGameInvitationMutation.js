import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { acceptGameInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useAcceptGameInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => acceptGameInvitation({ id }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.gameInvitation.list().queryKey })
  })
}
