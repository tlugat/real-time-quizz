<script setup>
import { useSendGameInvitationMutation } from 'queries/gameInvitation/useSendGameInvitationMutation'
import { useCancelGameInvitationMutation } from 'queries/gameInvitation/useCancelGameInvitationMutation'
import { useGameInvitationsQuery } from 'queries/gameInvitation/useGameInvitationsQuery'
import { useRouter } from 'vue-router'
import { state } from '@/websockets/friends.ws'
import { state as lobbyState } from '@/websockets/lobby.ws'
import styled from 'vue3-styled-components'
import Text from 'components/Text'
import { computed } from 'vue'
import { useUserFriendsQuery } from 'queries/userFriends/useUserFriendsQuery'
import LobbyFriendsInvitationUserCard from 'components/LobbyFriendsInvitationUserCard'

const { currentRoute } = useRouter()
const code = currentRoute.value.params.code
const { data: friends } = useUserFriendsQuery()
const sendInvitation = useSendGameInvitationMutation()
const cancelInvitation = useCancelGameInvitationMutation()
const { data: invitations } = useGameInvitationsQuery()
const isInvited = (friendId) =>
  invitations.value?.some((invitation) => invitation.recipient.id === friendId)
const isInLobby = (friendId) => lobbyState.players?.some((player) => player.id === friendId)
const allFriends = computed(() => [...state.online, ...state.offline])
const isOnline = (id) => state.online.some((friend) => friend.id === id)

const handleCancelInvitation = (friendId) => {
  const invitation = invitations.value?.find((invitation) => invitation.recipient.id === friendId)
  cancelInvitation.mutate(invitation?._id)
}

const handleSendInvitation = (userId) => {
  sendInvitation.mutate({ userId, code })
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
`
</script>

<template>
  <Wrapper>
    <Text v-if="allFriends.length === 0">You don't have friends yet</Text>
    <LobbyFriendsInvitationUserCard
      v-else
      v-for="friend in friends"
      :key="friend._id"
      :user="friend"
      :isInvited="isInvited(friend._id)"
      :isInLobby="isInLobby(friend._id)"
      :isOnline="isOnline(friend._id)"
      :handleCancelInvitation="handleCancelInvitation"
      :handleSendInvitation="handleSendInvitation"
    />
  </Wrapper>
</template>

<style lang=""></style>
