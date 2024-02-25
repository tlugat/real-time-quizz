import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { inviteUser } from 'api'
import { queryKeys } from '../queryKeys'

export const useInviteUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username) => inviteUser(username),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.userInvitation.requestList().queryKey)
  })
}
