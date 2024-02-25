import { useMutation } from '@tanstack/vue-query'
import { updateInventory } from 'api'

export const useUpdateInventoryMutation = () => {

  return useMutation({
    mutationFn: ({sessionId,itemType}) => updateInventory({sessionId,itemType})
  })
}