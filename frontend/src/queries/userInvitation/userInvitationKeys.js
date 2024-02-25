import { createQueryKeys } from '@lukemorales/query-key-factory'

export const userInvitationKeys = createQueryKeys('userInvitation', {
  detail: (invitationId) => [invitationId],
  list: (filters) => [{ filters }],
  requestDetail: (invitationId) => [invitationId],
  requestList: (filters) => [{ filters }]
})
