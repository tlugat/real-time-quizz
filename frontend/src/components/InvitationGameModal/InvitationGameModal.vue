<script setup>
import styled from 'vue3-styled-components'
import Modal from 'components/Modal'
import { state } from '@/websockets/notification.ws'
import Text from 'components/Text'
import { useRouter } from 'vue-router'
import { useDeclineGameInvitationMutation } from '@/queries/gameInvitation/useDeclineGameInvitationMutation'
import { useAcceptGameInvitationMutation } from '@/queries/gameInvitation/useAcceptGameInvitationMutation'
import Button from 'components/Button'

const router = useRouter()

const acceptInvitation = useAcceptGameInvitationMutation()
const declineInvitation = useDeclineGameInvitationMutation()

const handleAcceptInvitation = () => {
  if (!state.gameInvitation?.id) return
  acceptInvitation.mutate(state.gameInvitation?.id, {
    onSuccess: ({ invitation_code }) => {
      state.gameInvitation = null
      router.push({ name: 'lobby', params: { code: invitation_code } })
    }
  })
}

const handleDeclineInvitation = () => {
  declineInvitation.mutate(state.gameInvitation?.id, {
    onSuccess: () => {
      state.gameInvitation = null
    }
  })
}

const ButtonsWrapper = styled('div')`
  display: flex;
  column-gap: 1rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 100%;
`
</script>
<template lang="">
  <Modal :isOpen="!!state.gameInvitation === true" title="Someone want you to join his game">
    <Stack>
      <Text
        >{{ state.gameInvitation?.inviter?.username }} has send you an invitation. Do you want to
        join his game ?</Text
      >
      <ButtonsWrapper>
        <Button @click="handleDeclineInvitation" bgColor="--red">Decline</Button>
        <Button @click="handleAcceptInvitation">Validate</Button>
      </ButtonsWrapper>
    </Stack>
  </Modal>
</template>
<style lang=""></style>
