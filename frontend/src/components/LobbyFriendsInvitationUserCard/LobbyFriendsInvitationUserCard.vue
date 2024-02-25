<script setup>
import styled from 'vue3-styled-components'
import avatarIcon from '/img/avatar-1.svg'
import Text from 'components/Text'
import Button from 'components/Button'

const props = defineProps({
  user: Object,
  isInLobby: Boolean,
  isInvited: Boolean,
  isOnline: Boolean,
  handleCancelInvitation: Function,
  handleSendInvitation: Function
})

const UserCard = styled.div`
  border: 2px solid var(--black);
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 0.5rem;
  background-color: var(--white);

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 400px;
  }

  ${({ isInLobby }) =>
    isInLobby &&
    `
    opacity: 0.5;
  `}
`
const AvatarWrapper = styled.div`
  background-color: var(--yellow);
  max-width: 80px;
  max-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`
const CancelButton = styled(Button)`
  background-color: var(--red);
`
const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isOnline }) => (isOnline ? 'green' : 'red')};
`
const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
`
</script>

<template>
  <UserCard :isInLobby="props.isInLobby">
    <AvatarWrapper>
      <img :src="avatarIcon" alt="avatar" />
    </AvatarWrapper>
    <InfoWrapper>
      <Text bold>{{ user.username }}</Text>
      <StatusWrapper>
        <StatusIndicator :isOnline="props.isOnline" />
        <Text :color="props.isOnline ? '--primary' : '--red'">{{
          props.isOnline ? 'Online' : 'Offline'
        }}</Text>
      </StatusWrapper>
    </InfoWrapper>
    <CancelButton
      v-if="props.isInvited && !props.isInLobby"
      @click="props.handleCancelInvitation(user._id)"
      >Cancel</CancelButton
    >
    <Button
      v-else-if="!props.isInLobby && props.isOnline"
      @click="props.handleSendInvitation(user._id)"
    >
      Invite
    </Button>
    <Text v-else-if="props.isInLobby" color="--primary" bold> In game ! </Text>
  </UserCard>
</template>

<style lang=""></style>
