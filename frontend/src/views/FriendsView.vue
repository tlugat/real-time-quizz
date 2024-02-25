<script setup>
import styled from 'vue3-styled-components'
import Text from '@/components/Text'
import InputText from '@/components/InputText'
import searchIcon from '/icons/search.svg'
import { RouterLink, useRoute } from 'vue-router'
import { useResponsive } from 'composables/useResponsive'
import Button from '@/components/Button'
import { ref } from 'vue'
import UserInvitationForm from '@/components/UserInvitationForm'
import Modal from '@/components/Modal'

const { isDesktopAndUp } = useResponsive()
const route = useRoute()
const isRouteActive = (to) => route.path === to
const isAddFriendModalOpen = ref(false)

const openAddFriendModal = () => {
  isAddFriendModalOpen.value = true
}
const closeAddFriendModal = () => {
  isAddFriendModalOpen.value = false
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  gap: 2rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding: 2.5rem;
  }
`
const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`
const SearchInput = styled(InputText)`
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 25rem;
  }
`
const FriendsNav = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  flex: 1;
`
const ResponsiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`
const AddFriendButton = styled(Button)`
  align-self: start;
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    order: 1;
  }
`
const Link = styled(RouterLink)`
  text-decoration: none;
  padding: 0.5rem;
  ${({ to }) =>
    isRouteActive(to) &&
    `
    color: var(--primary);
    border-bottom solid 2px var(--primary);
    font-weight: 800;
  `}
`
</script>

<template>
  <Wrapper>
    <SearchContainer>
      <Text variant="h3">Friend list</Text>
      <SearchInput placeholder="search" :icon-left="searchIcon"></SearchInput>
    </SearchContainer>
    <ResponsiveWrapper
      ><AddFriendButton @click="openAddFriendModal">Add a friend</AddFriendButton>
      <FriendsNav>
        <Link to="/friends/list">
          <Text :variant="isDesktopAndUp ? 'h4' : 'p'"> <b> My friends </b> </Text>
        </Link>
        <Link to="/friends/requests">
          <Text :variant="isDesktopAndUp ? 'h4' : 'p'"> <b> My requests </b> </Text>
        </Link>
        <Link to="/friends/invitations">
          <Text :variant="isDesktopAndUp ? 'h4' : 'p'"> <b> Invitations </b> </Text>
        </Link>
      </FriendsNav>
    </ResponsiveWrapper>
    <router-view></router-view>
  </Wrapper>
  <Modal
    size="md"
    :onClose="closeAddFriendModal"
    :isOpen="isAddFriendModalOpen"
    title="Invite a friend"
  >
    <UserInvitationForm :onCloseModal="closeAddFriendModal" />
  </Modal>
</template>

<style lang=""></style>
