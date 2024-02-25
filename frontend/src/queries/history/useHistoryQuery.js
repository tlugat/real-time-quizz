import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getHistory } from 'api'

export const useHistoryQuery = () => {
  return useQuery({
    queryKey: queryKeys.history.list().queryKey,
    queryFn: () => getHistory()
  })
}
