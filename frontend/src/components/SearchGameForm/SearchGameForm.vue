<script setup>
import { getLobbyByCode } from 'api'
import { useRouter } from 'vue-router'
import InputText from 'components/InputText'
import { useForm } from 'vee-validate'
import schema from './SearchGameForm.schema'
import Button from 'components/Button'
import styled from 'vue3-styled-components'
import searchIcon from '/icons/search.svg'
import { queryKeys } from 'queries/queryKeys'
import { useQueryClient } from '@tanstack/vue-query'

const router = useRouter()
const queryClient = useQueryClient()
const { handleSubmit, meta, values } = useForm({
  initialValues: {
    code: ''
  },
  validationSchema: schema
})

const onSubmit = handleSubmit(async () => {
  try {
    const lobbyData = await getLobbyByCode(values.code)
    queryClient.setQueryData(queryKeys.lobby.detail(values.code).queryKey, lobbyData)
    router.push({
      name: 'lobby',
      params: { code: lobbyData.invitation_code, hasJoinByCode: true }
    })
  } catch (error) {
    console.error('Error fetching lobby:', error)
  }
})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
`
const SubmitButton = styled(Button)`
  width: 100% !important;
  background-color: var(--white);
  color: var(--black);
`
</script>

<template>
  <Form @submit.prevent="onSubmit">
    <InputText :iconLeft="searchIcon" name="code" type="text" placeholder="XH7L59T" />
    <SubmitButton :disabled="!meta.dirty || !meta.valid" type="submit">Join</SubmitButton>
  </Form>
</template>

<style lang=""></style>
