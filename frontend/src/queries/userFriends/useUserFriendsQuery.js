import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUserFriends } from 'api'

export const useUserFriendsQuery = () => {
  return useQuery({
    queryKey: queryKeys.userFriends.list().queryKey,
    queryFn: () => getUserFriends()
  })
}
