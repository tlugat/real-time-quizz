<script setup>
import { state } from '@/websockets/lobby.ws'
import styled from 'vue3-styled-components'
import avatarIcon from '/img/avatar-1.svg'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  max-height: 8.5rem;
  overflow-y: auto;
`
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: solid var(--black) 2px;
  height: 4rem;
  width: 4rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    height: 5rem;
    width: 5rem;
  }
`
const Avatar = styled.img`
  width: 100%;
  height: 100%;
`
</script>

<template>
  <Wrapper>
    <AvatarWrapper v-for="player in state.players" :key="player.id">
      <Avatar :src="avatarIcon" alt="avatar" />
    </AvatarWrapper>
  </Wrapper>
</template>

<style lang=""></style>
