import { useQuery } from '@tanstack/vue-query'
import { getLobbyByCode } from 'api'
import { queryKeys } from '../queryKeys'

export const useLobbyByCodeQuery = (code) => {
  return useQuery({
    queryKey: queryKeys.lobby.detail(code).queryKey,
    queryFn: () => getLobbyByCode(code),
    enabled: !!code
  })
}
