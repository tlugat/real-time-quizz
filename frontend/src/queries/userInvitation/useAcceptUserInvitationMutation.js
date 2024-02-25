import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { acceptUserInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useAcceptUserInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (invitationId) => acceptUserInvitation(invitationId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.userInvitation.list().queryKey })
  })
}
