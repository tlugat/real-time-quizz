import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { cancelGameInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useCancelGameInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (invitationId) => cancelGameInvitation({ id: invitationId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.gameInvitation.list().queryKey })
  })
}
