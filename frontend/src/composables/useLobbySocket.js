import { inject } from 'vue'

export const useLobbySocket = () => {
  const socket = inject('lobbySocket')

  return socket
}
