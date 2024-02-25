<script setup>
import Button from 'components/Button'
import Text from 'components/Text'
import styled from 'vue3-styled-components'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameByCodeQuery } from 'queries/game/useGameByCodeQuery'
import socket, { clearGameSocketState, state, sendAnswer } from '@/websockets/game.ws'
import GameQuestionAnswers from 'components/GameQuestionAnswers'
import GameRanking from 'components/GameRanking'
import { useResponsive } from '@/composables/useResponsive'
import Modal from 'components/Modal'
import Stack from '@/components/layout/Stack'
import { computed } from 'vue'
import Cluster from '@/components/layout/Cluster'
import GameEliminatedModal from '@/components/GameEliminatedModal'
import { useUserQuery } from '@/queries/user/useUserQuery'
import UserLives from '@/components/UserLives'

const { currentRoute, replace } = useRouter()
const code = currentRoute.value.params.code
const { data: game, isError, isLoading } = useGameByCodeQuery(code)
const { isDesktopAndUp } = useResponsive()
const isRankingModalOpen = ref(false)
const themeName = computed(() => game.value?.settings?.theme?.name)
const { data: user } = useUserQuery()
const userLives = computed(() => state.players.find((p) => p.userId === user.value._id)?.lives)
const userScore = computed(() => state.players.find((p) => p.userId === user.value._id)?.score)

onMounted(() => {
  if (!code) return
  socket.io.opts.query = { code }
  socket.connect()
})

onUnmounted(() => {
  socket.disconnect()
  clearGameSocketState()
})

socket.on('error', (error) => {
  if (error === 'Game not found') {
    replace('/home')
  }
})

socket.on('game_over', () => {
  replace({ name: 'game-stats', params: { gameCode: code } })
})

const handleLeaveGame = () => {
  socket.disconnect()
  replace({ name: 'home' })
}

const handleAnswer = (e) => {
  if (state.currentAnswer || state.isEliminated) return
  const answer = e.target.value
  state.currentAnswer = answer
  const answerTime = Date.now() - state.currentQuestionTime
  sendAnswer({ answer, answerTime })
}

const onOpenRankingModal = () => {
  isRankingModalOpen.value = true
}
const onCloseRankingModal = () => {
  isRankingModalOpen.value = false
}

const AnswersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    width: 100%;
    align-self: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  ${({ isEliminated }) =>
    isEliminated &&
    `
    opacity: 0.8;
    filter: grayscale(100%);
    cursor: not-allowed;
    pointer-events: none;
  `}
`
const LeaveButton = styled(Button)`
  border: solid 2px var(--red) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white) !important;
  width: fit-content !important;

  & > img {
    width: 1.5rem;
    height: 1.5rem;
  }
`
const RankingButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  background-color: var(--white) !important;
  border: solid 2px var(--black) !important;
  flex: 1;

  & > img {
    width: 2rem;
    height: 2rem;
  }

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex: none;
    width: fit-content !important;
  }
`
const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`
const Container = styled.div`
  padding: 2.5rem 1.5rem;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    display: flex;
    justify-content: center;
  }
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`
const PlayerInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    justify-content: flex-start;
    column-gap: 2rem;
  }
`
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center
  row-gap: 2rem;
  width: 100%;
  max-width: 1200px;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.tabletAndUp} {
    row-gap: 6rem;
  }
`
const GameInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  ${({ theme }) => theme.mediaQueries.tabletAndUp} {
    row-gap: 4rem;
  }
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
const Iframe = styled.iframe`
  border: none;
  align-self: center;

  ${({ theme }) => theme.mediaQueries.tabletAndUp} {
    width: 300px;
    height: 300px;
  }
`
</script>

<template>
  <Container>
    <GameWrapper>
      <Header>
        <PlayerInfoWrapper>
          <UserLives
            v-if="game?.settings?.lives && userLives"
            size="1.5rem"
            :nbLives="game?.settings?.lives"
            :playerLives="userLives"
          />
          <Text v-if="isDesktopAndUp" variant="h2">|</Text>
          <Text variant="h3">{{ userScore }}pt</Text>
        </PlayerInfoWrapper>
        <ButtonsWrapper>
          <RankingButton @click="onOpenRankingModal">
            <img src="/icons/achievement.svg" alt="achievement" />
            <Text bold>Ranking</Text>
          </RankingButton>
          <LeaveButton @click="handleLeaveGame">
            <img src="/icons/leave.svg" alt="exit" />
          </LeaveButton>
        </ButtonsWrapper>
      </Header>
      <GameInnerWrapper v-if="!!state.currentQuestion">
        <Cluster align="center" justify="space-between">
          <Text variant="h4">{{ themeName }}</Text>
          <Cluster gap="0.5rem" align="center">
            <Text variant="h3">?</Text>
            <Text variant="h5"
              >{{ state.currentQuestion.index || '?' }} / {{ game?.settings?.nbQuestions }}</Text
            >
          </Cluster>
        </Cluster>
        <Text variant="h5" textAlign="center">{{ state.currentQuestion.question.question }}</Text>
        <v-progress-linear
          color="var(--primary)"
          height="10"
          :max="game.settings.questionTime * 1000"
          :model-value="state.questionTimeLeft"
        ></v-progress-linear>
        <AnswersWrapper :isEliminated="state.isEliminated">
          <GameQuestionAnswers
            :hasAnswered="state.hasAnswered"
            :currentAnswer="state.currentAnswer"
            :isAnswerCorrect="state.isAnswerCorrect"
            :answers="state.currentQuestion.question.propositions"
            :handleAnswer="handleAnswer"
          />
        </AnswersWrapper>
      </GameInnerWrapper>
      <LoaderWrapper v-else>
        <Iframe
          src="https://lottie.host/?file=bf8c3633-0982-4b80-a0e3-60c12fefe74a/lA0i0rH0AU.json"
        ></Iframe>
      </LoaderWrapper>
    </GameWrapper>
  </Container>
  <Modal :isOpen="isRankingModalOpen" :onClose="onCloseRankingModal" title="Ranking" size="md">
    <GameRanking :nbLives="game?.settings?.lives" :players="state.players" />
  </Modal>
  <GameEliminatedModal
    :isOpen="state.isEliminated && !state.gameOver"
    :onClose="() => (state.isEliminated = false)"
    :score="userScore"
    :handleLeaveGame="handleLeaveGame"
  />
</template>
