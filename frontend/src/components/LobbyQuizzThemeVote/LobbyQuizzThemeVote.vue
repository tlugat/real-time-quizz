<script setup>
import { computed, ref, watch } from 'vue'
import styled from 'vue3-styled-components'
import { useUserQuery } from 'queries/user/useUserQuery'
import socket, { state } from '@/websockets/lobby.ws'
import gameIcon from '/img/history-game.svg'
import Text from 'components/Text'

const props = defineProps({
  themes: {
    type: Array,
    required: true
  }
})

const { data: user } = useUserQuery()
const quizzThemes = ref(props.themes)
const hasVoted = computed(() =>
  quizzThemes.value?.some((theme) => theme.voters.includes(user.value?._id))
)
const inputCheckboxBgColors = [' --yellow', ' --primary', '--blue']

watch(
  () => state.themes,
  (newThemes) => {
    if (!newThemes) return
    quizzThemes.value = newThemes
  }
)

const handleVote = (id) => {
  if (hasVoted.value) return
  socket.emit('vote_theme', id)
}
const getCheckboxColor = (index) => {
  const colorIndex = index % inputCheckboxBgColors.length
  return inputCheckboxBgColors[colorIndex]
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  column-gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
`
const ThemeCard = styled.div`
  position: relative;
  padding: 1rem;
  border: 2px solid var(--black);
  display: flex;
  align-items: end;
  justify-content: center;
  cursor: pointer;
  background-color: var(${({ color }) => color || '--primary'}) !important;
  height: 140px !important;
  flex: 0 0 140px !important;

  ${({ isDisabled }) =>
    isDisabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
  `}

  ${({ isChecked }) =>
    isChecked &&
    `
    border: 6px var(--black) solid !important`}

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex: 0 0 240px !important;
  }
`
const Illustration = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 57px;
  max-height: 80px;
  object-fit: cover;

  & + * {
    z-index: 1;
  }
`
const Voters = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem !important;
  font-weight: 800 !important;
  color: var(--white) !important;
`
</script>

<template>
  <Wrapper>
    <ThemeCard
      v-for="theme in quizzThemes"
      :isDisabled="hasVoted"
      :color="getCheckboxColor(i)"
      @click="handleVote(theme.id)"
      :key="theme.id"
    >
      <Illustration :src="gameIcon" />
      <Text color="--white" bold>{{ theme.name }}</Text>
      <Voters v-if="hasVoted">{{ theme.voters.length }}</Voters>
    </ThemeCard>
  </Wrapper>
</template>

<style lang=""></style>
