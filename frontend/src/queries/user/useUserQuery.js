import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUser } from 'api'
import { useAuthStore } from '@/stores/auth.store'

export const useUserQuery = () => {
  const { token } = useAuthStore()
  return useQuery({
    queryKey: queryKeys.user.detail().queryKey,
    queryFn: () => getUser(),
    enabled: !!token
  })
}
