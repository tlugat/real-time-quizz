import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUserRequests } from 'api'

export const useUserRequestsQuery = () => {
  return useQuery({
    queryKey: queryKeys.userInvitation.requestList().queryKey,
    queryFn: () => getUserRequests()
  })
}
