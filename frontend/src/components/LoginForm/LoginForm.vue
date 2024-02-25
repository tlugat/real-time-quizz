<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { useForm } from 'vee-validate'
import schema from './LoginForm.schema'
import InputText from 'components/InputText'
import styled from 'vue3-styled-components'
import Button from 'components/Button'
import Link from 'components/Link'

const { handleSubmit, meta } = useForm({
  initialValues: {
    username: '',
    password: ''
  },
  validationSchema: schema
})
const { login } = useAuthStore()

const onSubmit = handleSubmit((values) => {
  login(values)
})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  max-width: 400px;
`
const SubmitButton = styled(Button)`
  width: 100% !important;
`
</script>

<template>
  <Form @submit.prevent="onSubmit" @keydown.enter="$event.preventDefault()">
    <InputText name="username" label="Username" />
    <InputText name="password" label="Password" type="password" />
    <div>
      Don't have an account?
      <Link :to="'/register'"> Register </Link>
    </div>
    <SubmitButton bgColor="--primary" :disabled="!meta.dirty || !meta.valid" type="submit"
      >Login</SubmitButton
    >
  </Form>
</template>
