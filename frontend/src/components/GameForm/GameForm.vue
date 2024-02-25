<script setup>
import router from '@/router'
import { useForm } from 'vee-validate'
import { useCreateLobbyMutation } from 'queries/lobby/useCreateLobbyMutation'
import schema from './GameForm.schema'
import InputText from 'components/InputText'
import styled from 'vue3-styled-components'
import InputRadio from 'components/InputRadio'
import Text from 'components/Text'
import Button from '../Button'
import InputCheckboxCard from 'components/InputCheckboxCard'
import gameIcon from '/img/history-game.svg'
import { getRandomColor } from '@/utils/helpers'
import { useInventoryThemesQuery } from '@/queries/inventory/useInventoryThemesQuery'
import { usePublicQuizzThemesQuery } from '@/queries/quizzTheme/usePublicQuizzThemesQuery'
import { computed } from 'vue'

const { data: quizzThemes } = useInventoryThemesQuery()
const { data: publicThemes } = usePublicQuizzThemesQuery()

const themes = computed(() => publicThemes.value?.concat(quizzThemes.value || []))

const { handleSubmit, meta } = useForm({
  initialValues: {
    playersMax: 5,
    questionTime: 30,
    difficulty: 1,
    themes: [],
    lives: 3,
    nbQuestions: 15
  },
  validationSchema: schema
})

const createLobby = useCreateLobbyMutation()

const onSubmit = handleSubmit((values) => {
  createLobby.mutate(values, {
    onSuccess: ({ code }) => router.push({ name: 'lobby', params: { code } })
  })
})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 2rem;
`
const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 0.5rem;
`
const Cluster = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;
`
const SubmitButton = styled(Button)`
  width: 100%;
  background-color: var(--blue);
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
    flex-direction: row;
    column-gap: 1.5rem;
    align-items: start;

    & > div {
      flex: 1 1 50%;
    }
  }
`
const CheckboxCard = styled(InputCheckboxCard)`
  background-color: var(${({ color }) => color || '--primary'}) !important;
  height: 140px !important;
  flex: 0 0 140px !important;
`
const Themes = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  column-gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    height: 100%;
    flex-wrap: wrap;
    gap: 0.5rem;
    overflow-y: auto;
  }
`
const ThemeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 0.5rem;
`
const RadioButton = styled(InputRadio)`
  ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
    flex-direction: row !important;
    column-gap: 0.5rem;
`
</script>

<template>
  <Form @submit.prevent="onSubmit" @keydown.enter="$event.preventDefault()">
    <InnerWrapper>
      <Stack>
        <InputText name="playersMax" label="Players number" type="number" />
        <Stack>
          <Text>Difficulty</Text>
          <Cluster>
            <RadioButton name="difficulty" :value="1"><Text>Easy</Text></RadioButton>
            <RadioButton name="difficulty" :value="2"><Text>Normal</Text></RadioButton>
            <RadioButton name="difficulty" :value="3"><Text>Smart</Text></RadioButton>
            <RadioButton name="difficulty" :value="4"><Text>Einstein</Text></RadioButton>
          </Cluster>
        </Stack>
        <Stack>
          <Text>Question time</Text>
          <Cluster>
            <RadioButton name="questionTime" :value="10"><Text>10s</Text></RadioButton>
            <RadioButton name="questionTime" :value="15"><Text>15s</Text></RadioButton>
            <RadioButton name="questionTime" :value="30"><Text>30s</Text></RadioButton>
            <RadioButton name="questionTime" :value="45"><Text>45s</Text></RadioButton>
          </Cluster>
        </Stack>
        <Stack>
          <Text>Start lives</Text>
          <Cluster>
            <RadioButton name="lives" :value="2"><Text>2</Text></RadioButton>
            <RadioButton name="lives" :value="3"><Text>3</Text></RadioButton>
            <RadioButton name="lives" :value="6"><Text>6</Text></RadioButton>
            <RadioButton name="lives" :value="10"><Text>10</Text></RadioButton>
          </Cluster>
        </Stack>
        <InputText name="nbQuestions" label="Questions number" type="number" />
      </Stack>
      <ThemeWrapper>
        <Text>Themes</Text>
        <Themes>
          <CheckboxCard
            v-for="(theme, i) in themes"
            name="themes"
            :value="theme._id"
            :key="theme._id"
            :color="getRandomColor(i)"
            :icon="gameIcon"
            ><Text color="--white" bold>{{ theme.name }}</Text></CheckboxCard
          >
        </Themes>
      </ThemeWrapper>
    </InnerWrapper>
    <SubmitButton :disabled="!meta.dirty || !meta.valid" type="submit">Create Game</SubmitButton>
  </Form>
</template>

<style scoped></style>
