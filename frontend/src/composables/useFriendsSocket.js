import { inject } from 'vue'

export const useFriendsSocket = () => {
  const socket = inject('friendsSocket')

  return socket
}
