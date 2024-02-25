<script setup>
import styled from 'vue3-styled-components'
import AppBar from 'components/AppBar'

const Main = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  overlow: hidden;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    order: 1;
    height: calc(100% - 88px);
  }
`
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
</script>

<template>
  <Wrapper>
    <Main>
      <slot></slot>
    </Main>
    <AppBar />
  </Wrapper>
</template>

<style lang=""></style>
