import { loadStripe } from '@stripe/stripe-js'

const PUBLISH_KEY = import.meta.env.VITE_STRIPE_PUBLISH_KEY
const stripe = await loadStripe(PUBLISH_KEY)

export default stripe