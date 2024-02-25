<script setup>
import styled from 'vue3-styled-components'
import logo from '/img/landing-logo.svg'
import Button from 'components/Button'
import { RouterLink } from 'vue-router'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  gap: 40px;
  padding: 1rem;
`

const Logo = styled.img`
  width: 100%;
  max-width: 664px;
`

const StyledButton = styled(Button)`
  width: 100% !important;
`
const Link = styled(RouterLink)`
  width: 100% !important;
  max-width: 342px;
`
</script>

<template>
  <Container>
    <Logo :src="logo" alt="logo" />
    <h4>Les quizz qui animeront vos soirées</h4>
    <Link :as="StyledButton" :to="'/login'">
      <StyledButton>Play</StyledButton>
    </Link>
  </Container>
</template>

<style scoped>
.primary {
  min-width: 342px;
}

@media screen and (max-width: 630px) {
  h2 {
    max-width: 342px;
  }
}
</style>
