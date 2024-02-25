<script setup>
import { useAchievementsQuery } from 'queries/achievement/useAchievementsQuery'
import { useUserAchievementsQuery } from 'queries/achievement/useUserAchievementsQuery'
import styled from 'vue3-styled-components'
import AchievementCard from 'components/AchievementCard'
import Text from 'components/Text'

const { data: achievements } = useAchievementsQuery()
const { data: userAchievements } = useUserAchievementsQuery()

const getAchievementProgress = (achievement) => {
  const userAchievement = userAchievements.value?.achievements?.find(
    (a) => a.id === achievement._id
  )
  const currentProgress = userAchievement?.progress

  return {
    current: currentProgress,
    goal: achievement?.goal
  }
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1rem 2rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding: 1.5rem 2.5rem;
    row-gap: 2rem;
  }
`

const AchievementsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
</script>
<template>
  <Container>
    <Text variant="h3">Achievements</Text>
    <AchievementsWrapper>
      <AchievementCard
        v-for="achievement in achievements"
        :key="achievement._id"
        :label="achievement.label"
        :description="achievement.description"
        :isUnlocked="
          userAchievements?.achievements?.some((a) => a.id === achievement._id && a.achieved)
        "
        :progress="getAchievementProgress(achievement)"
      />
    </AchievementsWrapper>
  </Container>
</template>
<style lang=""></style>
