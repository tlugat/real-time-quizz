<script setup>
import socket, { state } from '@/websockets/lobby.ws'
import styled from 'vue3-styled-components'
import Text from 'components/Text'
import Button from 'components/Button'
import InputText from '../InputText'
import { useForm } from 'vee-validate'

const { handleSubmit, meta, resetForm } = useForm({
  initialValues: {
    message: ''
  }
})

const sendMessage = handleSubmit(({ message }) => {
  socket.emit('new_message', message)
  resetForm()
})

const Container = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--white);
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  border: 2px solid var(--black);
  overflow-y: auto;
`
const Chat = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`
const Input = styled(InputText)`
  height: 74px !important;
  width: 100% !important;
`
const Form = styled.form`
  margin-top: auto;
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  width: 100%;
`
const Message = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`
</script>

<template lang="">
  <Container>
    <Text variant="h4">Chat</Text>
    <Chat>
      <Message v-for="msg in state.messages" :key="msg">
        <Text bold>{{ msg.player }} :</Text>
        <Text>{{ msg.msg }}</Text>
      </Message>
    </Chat>
    <Form @submit.prevent="sendMessage">
      <Input placeholder="Type your message here" name="message" />
      <Button :disabled="!meta.dirty">Send</Button>
    </Form>
  </Container>
</template>

<style lang=""></style>
