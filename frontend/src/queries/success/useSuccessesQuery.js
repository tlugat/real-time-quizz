import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getSuccesses } from 'api'

export const useSuccessesQuery = () => {
  return useQuery({
    queryKey: queryKeys.success.list().queryKey,
    queryFn: () => getSuccesses()
  })
}
