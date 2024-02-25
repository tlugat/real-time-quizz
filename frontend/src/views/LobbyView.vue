<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import LobbyChat from 'components/LobbyChat'
import { useRouter } from 'vue-router'
import LobbyFriendsInvitation from 'components/LobbyFriendsInvitation'
import socket, { clearLobbySocketState, state } from '@/websockets/lobby.ws'
import { useLobbyByCodeQuery } from 'queries/lobby/useLobbyByCodeQuery'
import LobbyQuizzThemeVote from 'components/LobbyQuizzThemeVote'
import { useUserQuery } from 'queries/user/useUserQuery'
import LobbyValidation from 'components/LobbyValidation'
import Button from 'components/Button'
import styled from 'vue3-styled-components'
import Text from 'components/Text'
import Modal from 'components/Modal'
import { ref } from 'vue'
import { useResponsive } from 'composables/useResponsive'
import usersIcon from '/icons/users.svg'
import LobbyPlayerList from 'components/LobbyPlayerList'
import Cluster from 'components/layout/Cluster'

const { currentRoute, replace } = useRouter()
const { isDesktopAndUp } = useResponsive()
const code = currentRoute.value.params.code
const hasJoinByCode = currentRoute.value.params.hasJoinByCode
const { data: lobby } = useLobbyByCodeQuery(code)
const { data: user } = useUserQuery()
const playersConnected = computed(
  () => `${state?.players?.length} / ${lobby.value?.settings?.playersMax}`
)
const isOwner = computed(() => lobby.value?.owner === user.value?._id)
const votedTheme = computed(() => lobby?.value?.votedTheme || state.votedTheme)
const isFriendsInvitationModalOpen = ref(false)

onMounted(() => {
  if (!code) return
  socket.io.opts.query = { code, hasJoinByCode }
  socket.connect()
})

onUnmounted(() => {
  socket.disconnect();
  clearLobbySocketState();
})

const onOpenFriendsInvitationModal = () => {
  isFriendsInvitationModalOpen.value = true
}
const onCloseFriendsInvitationModal = () => {
  isFriendsInvitationModalOpen.value = false
}

const startValidation = () => {
  if (!isOwner.value || !lobby.value || !state.votedTheme) return
  socket.emit('start_validation', { lobbyId: lobby.value._id })
}

const handleLeaveLobby = () => {
  socket.disconnect();
  replace({ name: 'home' });
}

socket.on('game_created', (gameCode) => {
  replace({ name: 'game', params: { code: gameCode } });
})

const LeaveButton = styled(Button)`
  width: 100% !important;
  background-color: var(--red) !important;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    width: initial !important;
  }
`
const InviteFriendsButton = styled(Button)`
  width: 100% !important;
  background-color: var(--blue) !important;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    width: initial !important;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    row-gap: 2rem;
  }
`
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  padding: 1.5rem 1.5rem 0 1.5rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > :first-child {
      flex: 1;
    }
  }
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
    width: auto;
  }
`
const ThemesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  padding-left: 1.5rem;
`
const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex: 1;
  }
`
const PlayersChatWrapper = styled.div`
  display: flex;
  column-gap: 2.5rem;
  width: 100%;
  padding-inline: 1.5rem;
`
const StartGameButton = styled(Button)`
  width: 100% !important;
  background-color: var(--blue);
`
const StartGameButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  padding-inline: 1.5rem;
  margin-top: auto;
`
const PlayersConnected = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`
const ChatWrapper = styled.div`
  width: 1000px;
`
</script>

<template>
  <Container v-if="state.connected && !state.error && !!lobby">
    <HeaderWrapper>
      <Text variant="h3">Code: {{ lobby.invitation_code }}</Text>
      <ButtonsWrapper>
        <InviteFriendsButton @click="onOpenFriendsInvitationModal">
          Invite friends
        </InviteFriendsButton>
        <LeaveButton @click="handleLeaveLobby"> Leave </LeaveButton>
      </ButtonsWrapper>
    </HeaderWrapper>
    <ThemesWrapper>
      <Text variant="h3">Themes</Text>
      <LobbyQuizzThemeVote v-if="!!lobby?.themes" :themes="lobby?.themes" />
    </ThemesWrapper>
    <PlayersChatWrapper>
      <PlayersWrapper>
        <Cluster gap="0.5rem" align="center" justify="space-between"><Text variant="h3">Players</Text>
          <PlayersConnected>
            <Text variant="h4">{{ playersConnected }}</Text>
            <img :src="usersIcon" alt="users icon" />
          </PlayersConnected>
        </Cluster>

        <LobbyPlayerList />
      </PlayersWrapper>
      <ChatWrapper v-if="isDesktopAndUp">
        <LobbyChat />
      </ChatWrapper>
    </PlayersChatWrapper>
    <StartGameButtonWrapper>
      <StartGameButton v-if="isOwner" :disabled="!votedTheme" @click="startValidation">Start game</StartGameButton>
    </StartGameButtonWrapper>
    <Modal :isOpen="state.isValidationInProgress" title="Are you ready?">
      <LobbyValidation :isOwner="isOwner" :lobbyId="lobby.id" />
    </Modal>
    <Modal :isOpen="isFriendsInvitationModalOpen" :onClose="onCloseFriendsInvitationModal" title="Invite friends">
      <LobbyFriendsInvitation />
    </Modal>
  </Container>
  <h2 v-else-if="state.error">{{ state.error }}</h2>
  <h2 v-else>Is loading...</h2>
</template>

<style lang=""></style>
