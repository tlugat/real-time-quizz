<script setup>
import { useCreateStripeCheckoutSessionMutation } from 'queries/stripeCheckoutSession/useCreateStripeCheckoutSessionMutation'
import stripe from 'utils/stripe'
import styled from 'vue3-styled-components'
import Text from '@/components/Text'
import { defineProps, computed } from 'vue'

const props = defineProps({
  theme: Object,
  isOwned: Boolean,
  backgroundColor: String
})

const computedPrice = computed(() => {
  return props.theme.price / 100
})

const SUCCESS_URL = '/payment/success?session_id={CHECKOUT_SESSION_ID}&item_type=theme'
const CANCEL_URL = '/payment/cancel'

const { mutate: createCheckoutSession, isLoading } = useCreateStripeCheckoutSessionMutation()

const handlePayment = () => {
  if (!props.theme) return
  const theme = {
    ...props.theme,
    itemType: 'them',
    quantity: 1,
    successUrl: SUCCESS_URL,
    cancelUrl: CANCEL_URL
  }
  createCheckoutSession(theme, {
    onSuccess: (session) => {
      stripe.redirectToCheckout({ sessionId: session.id })
    }
  })
}

const Box = styled.button`
  width: 8.75rem;
  height: 8.75rem;
  display: flex;
  background: center / 50% no-repeat url('/img/theme-illustration.png');
  background-color: ${({ backgroundColor }) => `var(${backgroundColor})`};
  padding: 1rem;
  align-items: end;
  justify-content: space-between;
  border: 2px solid var(--Black, #111);

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    width: 14rem;
    background-size: 30%;
  }

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${({ isOwned }) =>
    isOwned &&
    `
    opacity: 0.8;
    pointer-events: none;
    background-color: lightgrey;
  `}
`
</script>

<template>
  <Box
    @Click="handlePayment"
    :disabled="isLoading || props.isOwned"
    :isOwned="props.isOwned"
    :backgroundColor="props.backgroundColor"
  >
    <Text variant="p" color="--white">
      <b> {{ props.theme.name }} </b>
    </Text>
    <Text color="--primary" bold v-if="props.isOwned">Owned</Text>
    <Text v-else variant="p" color="--white">
      <b> {{ computedPrice }}$ </b>
    </Text>
  </Box>
</template>
