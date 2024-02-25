import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUserInvitations } from 'api'

export const useUserInvitationsQuery = () => {
  return useQuery({
    queryKey: queryKeys.userInvitation.list().queryKey,
    queryFn: () => getUserInvitations()
  })
}
