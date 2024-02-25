import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUserInvitation } from 'api'

export const useUserInvitationsQuery = (invitationId) => {
  if (!invitationId) return

  return useQuery({
    queryKey: queryKeys.userInvitation.detail(invitationId).queryKey,
    queryFn: () => getUserInvitation(invitationId)
  })
}
