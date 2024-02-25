<script setup>
import styled from 'vue3-styled-components'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 2rem;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  row-gap: 2rem;
  width: 100%;
  max-width: 1000px;
`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`
</script>

<template lang="">
  <Container>
    <Wrapper>
      Admin Dashboard
      <Nav>
        <div>
          <router-link to="/admin/quizz">Quizz</router-link>
        </div>
        <div>
          <router-link to="/admin/quizz-theme">Quizz theme</router-link>
        </div>
      </Nav>
      <router-view></router-view>
    </Wrapper>
  </Container>
</template>

<style lang=""></style>
