import { createQueryKeys } from '@lukemorales/query-key-factory'

export const gameInvitationKeys = createQueryKeys('gameInvitation', {
  detail: (invitationId) => [invitationId],
  list: (filters) => [{ filters }],
  requestDetail: (invitationId) => [invitationId],
  requestList: (filters) => [{ filters }]
})
