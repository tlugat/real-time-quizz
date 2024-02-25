<script setup>
import styled from 'vue3-styled-components'
import { useAverageGameStatsQuery } from 'queries/gameStats/useAverageGameStatsQuery'
import StatsCard from 'components/StatsCard'
import Text from 'components/Text'

const { data: weeklyStats } = useAverageGameStatsQuery(7)
const { data: monthlyStats } = useAverageGameStatsQuery(30)

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
`
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
`
</script>

<template>
  <Wrapper>
    <Text variant="h4">Your stats</Text>
    <Stack>
      <Text bold>Weekly stats</Text>
      <Text v-if="!weeklyStats">No stats</Text>
      <StatsCard v-else :stats="weeklyStats.stats" />
    </Stack>
    <Stack>
      <Text bold>Monthly stats</Text>
      <Text v-if="!monthlyStats">No stats</Text>
      <StatsCard v-else :stats="monthlyStats.stats" />
    </Stack>
  </Wrapper>
</template>

<style scoped></style>
