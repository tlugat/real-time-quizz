import { createStripeCheckoutSession } from 'api'
import { useQuery } from '@tanstack/vue-query'

// import { queryKeys } from '../queryKeys'
export const useStripeCheckoutQuery = (urlCheckout) => {
  if(!urlCheckout) return
  return useQuery({
    queryKey: queryKeys.product.detail(urlCheckout).queryKey,
    queryFn: () => getCheckout(urlCheckout)
  })
}