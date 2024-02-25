import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { sendGameInvitation } from 'api'
import { queryKeys } from '../queryKeys'

export const useSendGameInvitationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, code }) => sendGameInvitation({ userId, code }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.gameInvitation.list().queryKey)
  })
}
