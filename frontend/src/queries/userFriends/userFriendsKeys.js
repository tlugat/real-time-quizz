import { createQueryKeys } from '@lukemorales/query-key-factory'

export const userFriendsKeys = createQueryKeys('userFriends', {
  detail: (friendId) => [friendId],
  list: (filters) => [{ filters }]
})
