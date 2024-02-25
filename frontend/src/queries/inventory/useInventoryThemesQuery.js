import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '../queryKeys'
import { getInventoryThemes } from 'api'

export const useInventoryThemesQuery = () => {
  return useQuery({
    queryKey: queryKeys.inventory.themeList().queryKey,
    queryFn: () => getInventoryThemes()
  })
}
