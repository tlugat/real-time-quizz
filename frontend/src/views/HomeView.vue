<script setup>
import styled from 'vue3-styled-components'
import logo from '/img/landing-logo.svg'
import joinGameIllustration from '/img/home-join-game-illustration.svg'
import createGameIllustration from '/img/home-create-game-illustration.svg'
import Text from 'components/Text'
import SearchGameForm from 'components/SearchGameForm'
import Button from 'components/Button'
import { useResponsive } from '@/composables/useResponsive'
import HomeHistory from 'components/HomeHistory'
import HomeStats from 'components/HomeStats'
import { ref } from 'vue'
import Modal from 'components/Modal'
import GameForm from 'components/GameForm'

const { isDesktopAndUp } = useResponsive()
const isCreateGameModalOpen = ref(false)

const openCreateGameModal = () => {
  isCreateGameModalOpen.value = true
}
const closeCreateGameModal = () => {
  isCreateGameModalOpen.value = false
}

const JoinGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  row-gap: 1rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--blue);
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    column-gap: 0.5rem;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0;
    padding-left: 0;

    & > :first-child,
    & > :last-child {
      width: 50%;
    }
  }
`
const CreateGameWrapper = JoinGameWrapper.extend`
  background-color: var(--primary);

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-left: 1.5rem;
    padding-right: 0;
    & > :first-child {
      order: 2;
    }
  }
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  row-gap: 1rem;
  width: 100%;
`
const Logo = styled.img`
  width: 100%;
  max-width: 90px;
`
const GameIllustration = styled.img`
  width: 100%;
`
const GameIllustrationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 220px;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 500px;
    height: 100%;
    align-items: flex-end;
  }
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    height: 100%;
    & > :first-child {
      width: 60%;
    }
    & > :last-child {
      flex: 1;
    }
  }
`
const CreateGameButton = styled(Button)`
  width: 100% !important;
  background-color: var(--white) !important;
  color: var(--black) !important;
`
const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    & > :first-child,
    & > :last-child {
      height: 50%;
    }
  }
`
const StatsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    & > :last-child {
      flex: 1;
    }
  }
`
</script>

<template>
  <Container>
    <GameWrapper>
      <JoinGameWrapper>
        <Logo v-if="!isDesktopAndUp" :src="logo" alt="logo" />
        <GameIllustrationWrapper>
          <GameIllustration :src="joinGameIllustration" alt="illustration" />
        </GameIllustrationWrapper>
        <TextWrapper>
          <Text variant="h4" color="--white">Join a game with a code</Text>
          <Text color="--white">
            Lorem ipsum dolor sit amet consectetur. Blandit in ut faucibus donec in ac varius. Amet
            sit donec eu aliquet lectus a. Odio risus ornare duis nunc.</Text
          >
          <SearchGameForm />
        </TextWrapper>
      </JoinGameWrapper>
      <CreateGameWrapper>
        <GameIllustrationWrapper>
          <GameIllustration :src="createGameIllustration" alt="illustration" />
        </GameIllustrationWrapper>
        <TextWrapper>
          <Text variant="h4" color="--white">Customized game</Text>
          <Text color="--white">
            Lorem ipsum dolor sit amet consectetur. Blandit in ut faucibus donec in ac varius. Amet
            sit donec eu aliquet lectus a. Odio risus ornare duis nunc.</Text
          >
          <CreateGameButton @click="openCreateGameModal">Create a game</CreateGameButton>
        </TextWrapper>
      </CreateGameWrapper>
    </GameWrapper>
    <StatsWrapper>
      <HomeStats />
      <HomeHistory />
    </StatsWrapper>
  </Container>
  <Modal :onClose="closeCreateGameModal" :isOpen="isCreateGameModalOpen" title="Create a game">
    <GameForm />
  </Modal>
</template>
