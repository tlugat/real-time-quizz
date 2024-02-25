<script setup>
import styled from 'vue3-styled-components'
import Text from 'components/Text'
import { useUserQuery } from '@/queries/user/useUserQuery'
import { useUserAchievementsQuery } from 'queries/achievement/useUserAchievementsQuery'
import AchievementCard from 'components/AchievementCard'
import { computed } from 'vue'
import { useAchievementsQuery } from '@/queries/achievement/useAchievementsQuery'
import Link from '@/components/Link'
import Button from '@/components/Button'
import { useAuthStore } from '@/stores/auth.store'
import { useResponsive } from '@/composables/useResponsive'

const { isDesktopAndUp } = useResponsive()
const { data: achievements } = useAchievementsQuery()
const { data: userAchievements } = useUserAchievementsQuery()
const { data: user } = useUserQuery()
const { logout } = useAuthStore()
const userAchievementsUnlocked = computed(() =>
  userAchievements.value?.achievements?.filter((achievement) => achievement.achieved === true)
)

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  row-gap: 2rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-bottom: 2.5rem;
  }
`
const HeaderWrapper = styled.div`
  width: 100%;
  padding-inline: 1rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-top: 2.5rem;
    padding-inline: 1.5rem;
  }
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  padding: 1rem;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    height: 100%;
    border: 2px solid var(--black);
    padding: 2.5rem;
  }
`
const InformationOuterWrapper = styled(Block)`
  background-color: var(--blue);
  background-image: url('/img/pen.png');
`
const InformationWrapper = styled.div`
  width: 100%;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-inline: 1.5rem;
    flex: none;
    max-width: 800px;
  }
`
const InformationInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    row-gap: 1.5rem;
  }
`
const InformationLine = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 0.5rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-bottom: 1.5rem;
    border-bottom: 2px solid var(--white);

    & > * {
      flex: 1;
    }
  }
`
const AchievementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding-left: 1rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding: 1.5rem;
  }
`
const AchievementsList = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  width: 100%;
  overflow-x: auto;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-wrap: wrap;
    overflow-x: unset;
    gap: 1rem;
  }
`
const AchievementsTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  padding-right: 1rem;
  column-gap: 0.5rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-right: 1.5rem;
  }
`
const LogoutButton = styled(Button)`
  border: none !important;
  padding: 0 !important;
  color: var(--red) !important;
  background-color: transparent !important;
`
</script>

<template>
  <Container>
    <HeaderWrapper>
      <Text variant="h3">Profile</Text>
      <LogoutButton v-if="!isDesktopAndUp" @click="logout">Logout</LogoutButton>
    </HeaderWrapper>
    <InformationWrapper>
      <InformationOuterWrapper>
        <Text color="--white" variant="h4">Information</Text>
        <InformationInnerWrapper>
          <InformationLine>
            <Text bold color="--white" variant="p">Username: </Text>
            <Text color="--white" variant="p">{{ user?.username }}</Text>
          </InformationLine>
          <InformationLine>
            <Text bold color="--white" variant="p">Email: </Text>
            <Text color="--white" variant="p">{{ user?.email }}</Text>
          </InformationLine>
        </InformationInnerWrapper>
      </InformationOuterWrapper>
    </InformationWrapper>
    <AchievementsWrapper>
      <AchievementsTitleWrapper>
        <Text variant="h4">My achievements</Text>
        <Link :to="{ name: 'achievements' }">See all</Link>
      </AchievementsTitleWrapper>
      <AchievementsList v-if="userAchievementsUnlocked?.length > 0">
        <AchievementCard
          :as="Link"
          :to="{ name: 'achievements' }"
          v-for="achievement in userAchievementsUnlocked"
          :key="achievement.id"
          :label="achievements?.find((a) => a._id === achievement.id)?.label"
          :description="achievements?.find((a) => a._id === achievement.id)?.description"
          isUnlocked
        /> </AchievementsList
      ><Text v-else>No achievement unlocked yet</Text>
    </AchievementsWrapper>
  </Container>
</template>

<style lang=""></style>
