import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { cancelUserInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useCancelUserInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (invitationId) => cancelUserInvitation(invitationId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.userInvitation.requestList().queryKey })
  })
}
