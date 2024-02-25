<script setup>
import QuizzThemeTable from 'components/admin/QuizzThemeTable'
import styled from 'vue3-styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  row-gap: 2rem;
  width: 100%;
`
</script>

<template lang="">
  <Container>
    <Wrapper>
      <v-btn
        as="router-link"
        to="quizz-theme/add"
        class="me-2 text-none add-quizz-btn"
        color="#4f545c"
        prepend-icon="mdi-plus"
        variant="flat"
      >
        Add a theme
      </v-btn>
      <QuizzThemeTable />
    </Wrapper>
  </Container>
</template>

<style lang="scss" scoped>
.add-quizz-btn {
    align-self: flex-end;
}
</style>
