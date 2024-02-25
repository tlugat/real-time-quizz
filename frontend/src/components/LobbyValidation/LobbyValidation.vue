<script setup>
import { computed } from 'vue'
import socket, { state } from '@/websockets/lobby.ws'
import { useUserQuery } from 'queries/user/useUserQuery'
import Button from 'components/Button'
import Text from 'components/Text'
import styled from 'vue3-styled-components'
import { onUnmounted } from 'vue'

const props = defineProps({
  isOwner: Boolean,
  lobbyId: String
})

const { data: user } = useUserQuery()
const hasValidated = computed(() => state?.validatedUsers?.includes(user.value?._id))
const nbValidatedUsers = computed(
  () => `${state?.validatedUsers?.length} / ${state?.players?.length}`
)

const updateProgressBar = () => {
  if (state.validationTime <= 0) return
  state.validationTime -= 1
}

const intervalId = setInterval(updateProgressBar, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})

const cancelValidation = () => {
  if (!props.isOwner) return
  socket.emit('cancel_validation', { lobbyId: props.lobbyId })
}

const validate = () => {
  if (hasValidated.value) return
  socket.emit('validate')
}

const Stack = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const ButtonsWrapper = styled('div')`
  display: flex;
  column-gap: 2rem;

  & > * {
    flex: 1;
  }
`
</script>

<template>
  <Stack>
    <Text variant="h4">The game is about to start, please confirm</Text>
    <v-progress-linear color="var(--primary)" height="10" max="30"
      :model-value="state.validationTime"></v-progress-linear>
    <Text>{{ nbValidatedUsers }}</Text>
    <ButtonsWrapper>
      <Button bgColor="--red" v-if="isOwner" @click="cancelValidation">Cancel</Button>
      <Button :disabled="hasValidated" @click="validate">Validate</Button>
    </ButtonsWrapper>
  </Stack>
</template>

<style lang=""></style>
