import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getLobby } from 'api'

export const useLobbyQuery = (lobbyId) => {
  if (!lobbyId) return

  return useQuery({
    queryKey: queryKeys.lobby.detail(lobbyId).queryKey,
    queryFn: () => getLobby(lobbyId)
  })
}
