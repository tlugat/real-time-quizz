import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { declineGameInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useDeclineGameInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => declineGameInvitation({ id }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.gameInvitation.list().queryKey })
  })
}
