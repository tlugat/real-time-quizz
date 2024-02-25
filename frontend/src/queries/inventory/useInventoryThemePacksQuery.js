import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getInventoryThemePacks } from 'api'

export const useInventoryThemePacksQuery = () => {
  return useQuery({
    queryKey: queryKeys.inventory.themePackList().queryKey,
    queryFn: () => getInventoryThemePacks()
  })
}
