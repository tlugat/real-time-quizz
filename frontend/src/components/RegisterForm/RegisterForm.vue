<script setup>
import { useRegister } from 'queries/auth/useRegister'
import { useForm } from 'vee-validate'
import schema from './RegisterForm.schema'
import InputText from 'components/InputText'
import { useRouter } from 'vue-router'
import styled from 'vue3-styled-components'
import Button from '../Button'
import Link from '../Link'

const router = useRouter()
const { handleSubmit, meta } = useForm({
  initialValues: {
    username: '',
    email: '',
    password: ''
  },
  validationSchema: schema
})
const { mutate: register } = useRegister()

const onSubmit = handleSubmit((values) => {
  register(values, {
    onSuccess: () => router.push({ name: 'login' })
  })
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
    <InputText name="email" label="Email" type="email" />
    <InputText name="password" label="Password" type="password" />
    <div>
      Already have an account?
      <Link :to="'/login'"> Log in </Link>
    </div>
    <SubmitButton :disabled="!meta.dirty || !meta.valid" type="submit">Register</SubmitButton>
  </Form>
</template>
