<script setup>
import styled from 'vue3-styled-components'
import { RouterLink, useRoute } from 'vue-router'
import headerLogo from '/img/header-logo.svg'
import homeIcon from '/icons/home.svg'
import friendsIcon from '/icons/friends.svg'
import shopIcon from '/icons/shop.svg'
import { useResponsive } from 'composables/useResponsive'
import Text from 'components/Text'
import avatarIcon from '/img/avatar-1.svg'
import { useUserQuery } from '@/queries/user/useUserQuery'
import { useAuthStore } from '@/stores/auth.store'
import { VMenu, VListItem, VList } from 'vuetify/lib/components/index.mjs'

const route = useRoute()
const { logout } = useAuthStore()
const isRouteActive = (to) => route.path.startsWith(to) || route.name.startsWith(to.name)
const { isDesktopAndUp } = useResponsive()
const { data: user } = useUserQuery()

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1.5rem;
  background: var(--white);
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding: 1.25rem 1.5rem;
    background: var(--black);
    position: initial;
    height: 88px;
  }
`
const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    width: fit-content;
    column-gap: 2.5rem;
  }
`
const Link = styled(RouterLink)`
  color: var(--black);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    font-size: 1rem;
    color: var(--white);
    font-weight: 800;
  }

  ${({ to }) =>
    isRouteActive(to) &&
    `
    color: var(--primary);
    text-decoration: underline;
    font-weight: 800;
  `}
`
const LinkText = styled(Text)`
  font-weight: inherit !important;
  font-size: inherit !important;
  color: inherit !important;
`

const Logo = styled.img`
  display: none;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    display: initial;
  }
`
const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    width: 2rem;
    height: 2rem;
  }
`
const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  cursor: pointer;

  & > p {
    font-size: 1rem;
    font-weight: 800;
    color: var(--white);
  }
`
const MenuItem = styled(VList)`
  width: 100%;
  padding: 0.75rem;
  & > p,
  > a {
    font-size: 1rem;
    font-weight: 800;
  }

  & > a {
    color: var(--black);
  }
  cursor: pointer;
`
</script>

<template>
  <Wrapper>
    <RouterLink to="/home">
      <Logo :src="headerLogo" alt="Logo" />
    </RouterLink>
    <Nav>
      <Link to="/home">
        <img v-if="!isDesktopAndUp" :src="homeIcon" alt="Home" />
        <LinkText as="span">Home</LinkText>
      </Link>
      <Link to="/shop">
        <img v-if="!isDesktopAndUp" :src="shopIcon" alt="Shop" />
        <LinkText as="span">Shop</LinkText>
      </Link>
      <Link to="/friends">
        <img v-if="!isDesktopAndUp" :src="friendsIcon" alt="Friends" />
        <LinkText as="span">Friends</LinkText>
      </Link>
      <ProfileButton v-if="isDesktopAndUp">
        <Avatar :src="avatarIcon" alt="avatar" />
        <Text>{{ user?.username }}</Text>
        <VMenu offset="10" width="12rem" activator="parent">
          <VList>
            <MenuItem>
              <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
              <Text color="--red" textAlign="center" @click="logout">Logout</Text>
            </MenuItem>
          </VList>
        </VMenu>
      </ProfileButton>

      <Link v-else to="/profile">
        <Avatar :src="avatarIcon" alt="avatar" />
        <LinkText as="span">Profile</LinkText>
      </Link>
    </Nav>
  </Wrapper>
</template>

<style scoped></style>
