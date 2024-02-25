<script setup>
import styled from 'vue3-styled-components'
import { defineProps } from 'vue'
import Text from 'components/Text'
import Stack from 'components/layout/Stack'
import UserLives from 'components/UserLives'
import { useUserQuery } from '@/queries/user/useUserQuery'
import { computed } from 'vue'

const props = defineProps({
  players: {
    type: Array,
    required: true
  },
  nbLives: {
    type: Number,
    required: true
  },
  noOpacity: {
    type: Boolean,
    default: false
  }
})

const sortedPlayers = computed(() => props.players.slice().sort((a, b) => a.rank - b.rank))
const { data: user } = useUserQuery()

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    row-gap: 0.75rem;
  }
`
const PlayerCard = styled.div`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--white);
  border: solid 2px var(--black);

  ${({ isEliminated, noOpacity }) =>
    isEliminated &&
    !noOpacity &&
    ` 
    opacity: 0.8;
    filter: grayscale(100%);
  `}

  ${({ isUser }) =>
    isUser &&
    `
    outline: solid 0.25rem var(--primary) !important;
  `}
`
const PlayerCardInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`
const Rank = styled.span`
  background-color: var(--primary);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
</script>

<template>
  <Wrapper>
    <PlayerCard
      v-for="player in sortedPlayers"
      :key="player.userId"
      :isEliminated="player.lives === 0"
      :noOpacity="props.noOpacity"
      :isUser="player.id === user?._id"
    >
      <PlayerCardInnerWrapper>
        <Rank>
          <Text color="--white" bold variant="h4">{{ player.rank }}</Text>
        </Rank>
        <Stack>
          <Text :color="player.userId === user?._id ? '--primary' : '--black'" bold>{{
            player.username
          }}</Text>
          <UserLives :nbLives="props.nbLives" :playerLives="player.lives" />
        </Stack>
      </PlayerCardInnerWrapper>
      <Text variant="h4">{{ player.score }}pt</Text>
    </PlayerCard>
  </Wrapper>
</template>
