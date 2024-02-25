import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getUserSuccesses } from 'api'

export const useUserSuccessesQuery = () => {
  return useQuery({
    queryKey: queryKeys.success.userSuccessList().queryKey,
    queryFn: () => getUserSuccesses()
  })
}
