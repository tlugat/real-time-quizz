<script setup>
import GameRanking from '@/components/GameRanking'
import { useRouter } from 'vue-router'
import Text from '@/components/Text'
import styled from 'vue3-styled-components'
import { useGameStatsByCodeQuery } from '@/queries/gameStats/useGameStatsQueryByCode'

const router = useRouter()
const gameCode = router.currentRoute.value.params.gameCode
const { data: gameStats, isLoading } = useGameStatsByCodeQuery(gameCode)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1rem;
  width: 100%;
`
const GameRankingWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
`
</script>
<template>
  <Container>
    <Text variant="h2"
      >Stats for game <Text variant="h2" as="span">{{ gameCode }}</Text></Text
    >
    <GameRankingWrapper>
      <GameRanking
        v-if="!isLoading"
        :players="gameStats?.players"
        :nbLives="gameStats?.gameSettings?.lives"
        noOpacity
      />
    </GameRankingWrapper>
  </Container>
</template>
