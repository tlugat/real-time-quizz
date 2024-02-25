<script setup>
import { useCreateStripeCheckoutSessionMutation } from 'queries/stripeCheckoutSession/useCreateStripeCheckoutSessionMutation'
import stripe from 'utils/stripe'
import styled from 'vue3-styled-components'
import Text from '@/components/Text'
import Button from '../Button'

import { defineProps, computed } from 'vue'

const props = defineProps({
  themePack: Object,
  isOwned: Boolean
})

const computedPrice = computed(() => {
  return props.themePack.price / 100
})
const SUCCESS_URL = '/payment/success?session_id={CHECKOUT_SESSION_ID}&item_type=themepack'
const CANCEL_URL = '/payment/cancel'
const { mutate: createCheckoutSession, isLoading } = useCreateStripeCheckoutSessionMutation()

const handlePayment = () => {
  if (!props.themePack) return
  const themePack = {
    ...props.themePack,
    itemType: 'thempack',
    quantity: 1,
    successUrl: SUCCESS_URL,
    cancelUrl: CANCEL_URL
  }
  createCheckoutSession(themePack, {
    onSuccess: (session) => {
      stripe.redirectToCheckout({ sessionId: session.id })
    }
  })
}

const Card = styled('div', props)`
  max-width: 700px;
  width: 100%;
  display: flex;
  max-width : 550px
  border: 2px solid var(--black);
  background: center / contain no-repeat url('/img/themepack-illustration.png'), var(--white);
  padding: 1rem;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: space-between;

  ${({ isOwned }) =>
    isOwned &&
    `
    opacity: 0.8;
    pointer-events: none;
    background-color: lightgrey;
  `}

`

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const BuyButton = styled(Button)`
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`
</script>

<template>
  <Card :isOwned="props.isOwned">
    <InnerBox>
      <Text variant="h5">
        <b>{{ props.themePack.name }}</b>
      </Text>
      <Text variant="h5">
        <b> {{ computedPrice }}$</b>
      </Text>
    </InnerBox>
    <Text color="--primary" v-if="props.isOwned" bold>owned</Text>
    <BuyButton v-else bgColor="--yellow" @Click="handlePayment" :disabled="isLoading">
      <Text variant="p"> <b>Buy</b> </Text>
    </BuyButton>
  </Card>
</template>
