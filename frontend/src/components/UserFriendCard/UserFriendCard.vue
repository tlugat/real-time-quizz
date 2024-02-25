<script setup>
import styled from 'vue3-styled-components'
import Text from '@/components/Text'
import GirlAvatar from '@/assets/avatar/girl-avatar.svg'

const props = defineProps({
  isLogged: Boolean,
  username: String
})

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1.5rem;
  gap: 1.5rem;
  border: 2px solid var(--black);
  background: var(--white);
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 22rem;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  background: var(--yellow);
`
</script>

<template>
  <Wrapper>
    <Avatar :src="GirlAvatar" />
    <Info>
      <Text variant="p"
        ><b>{{ username }}</b></Text
      >
      <Text variant="p" :color="isLogged ? '--primary' : '--red'">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="4" :fill="isLogged ? 'var(--primary)' : 'var(--red)'" />
        </svg>
        {{ isLogged ? 'Online' : 'Offline' }}
      </Text>
    </Info>
  </Wrapper>
</template>

<style lang=""></style>
