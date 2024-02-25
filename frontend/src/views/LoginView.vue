<script setup>
import LoginForm from 'components/LoginForm'
import styled from 'vue3-styled-components'
import Text from 'components/Text'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
  padding: 1rem;
`
</script>

<template>
  <Container>
    <Text variant="h2">Login to start a game</Text>
    <LoginForm />
  </Container>
</template>

<style scoped></style>
