<script setup>
import InputText from '@/components/InputText'
import Button from '@/components/Button'
import { useInviteUserMutation } from 'queries/userInvitation/useInviteUserMutation'
import styled from 'vue3-styled-components'
import { useForm } from 'vee-validate'

const props = defineProps({
  onCloseModal: {
    type: Function,
    required: true
  }
})

const { handleSubmit, meta, resetForm } = useForm({
  initialValues: {
    username: ''
  }
})
const inviteUser = useInviteUserMutation()

const onSubmit = handleSubmit(({ username }) => {
  inviteUser.mutate(username, {
    onSuccess: () => {
      resetForm()
      props.onCloseModal()
    }
  })
})

const AddInput = styled(InputText)`
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 25rem;
  }
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

const AddButton = styled(Button)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 25rem;
  }
`
</script>

<template>
  <Form @submit.prevent="onSubmit">
    <AddInput
      :disabled="inviteUser.isLoading"
      :value="username"
      placeholder="username"
      type="text"
      name="username"
    />
    <AddButton :disabled="!meta.dirty || !meta.valid" type="submit">Search</AddButton>
  </Form>
</template>
