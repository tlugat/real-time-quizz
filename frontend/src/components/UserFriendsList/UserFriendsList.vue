<script setup>
import { useUserFriendsQuery } from 'queries/userFriends/useUserFriendsQuery'
import UserFriendCard from '@/components/UserFriendCard'
import styled from 'vue3-styled-components'
import { state } from '@/websockets/friends.ws'

const { data: friends } = useUserFriendsQuery()
const isOnline = (id) => state.online.some((friend) => friend.id === id)

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`
</script>

<template lang="">
  <Wrapper>
    <UserFriendCard
      v-for="friend in friends"
      :key="friend._id"
      :username="friend.username"
      :isLogged="isOnline(friend._id)"
    />
  </Wrapper>
</template>

<style lang=""></style>
