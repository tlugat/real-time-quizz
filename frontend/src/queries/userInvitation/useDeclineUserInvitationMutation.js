import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { declineUserInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useDeclineUserInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (invitationId) => declineUserInvitation(invitationId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.userInvitation.list().queryKey })
  })
}
