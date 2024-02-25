<script setup>
import { useForm } from 'vee-validate'
import { useCreateQuizzMutation } from 'queries/quizz/useCreateQuizzMutation'
import schema from './QuizzForm.schema'
import InputText from 'components/InputText'
import styled from 'vue3-styled-components'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import Select from 'components/Select'
import QuizzQuestionForm from 'components/admin/QuizzQuestionForm'
import { useQuizzThemesQuery } from 'queries/quizzTheme/useQuizzThemesQuery'

const DIFFICULTIES = [1, 2, 3, 4, 5]

const router = useRouter()
const { data: quizzThemes } = useQuizzThemesQuery()
const { handleSubmit, meta, setValues, values } = useForm({
  initialValues: {
    name: '',
    slogan: '',
    difficulty: DIFFICULTIES[0],
    questions: [],
    theme: ''
  },
  validationSchema: schema
})

const createQuizz = useCreateQuizzMutation()
const isQuestionFormShown = ref(false)
const themeOptions = computed(() => {
  return quizzThemes.value?.map((theme) => ({
    title: theme.name,
    value: theme._id
  }))
})
const showQuestionForm = () => {
  isQuestionFormShown.value = !isQuestionFormShown.value
}

const addQuestion = (formData) => {
  const question = {
    question: formData.question,
    propositions: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
    answer: formData.correctAnswer
  }
  setValues({
    questions: [...values.questions, question]
  })
  isQuestionFormShown.value = false
}

const onSubmit = handleSubmit((formData) => {
  createQuizz.mutate(formData, {
    onSuccess: () => router.push('/admin/quizz')
  })
})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  width: 100%;
`
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  row-gap: 1rem;
  width: 100%;
`
</script>

<template>
  <Wrapper>
    <Form @submit.prevent="onSubmit" @keydown.enter="$event.preventDefault()">
      <InputText name="name" label="Name" />
      <InputText name="slogan" label="Slogan" />
      <Select
        :options="themeOptions"
        :optionValue="id"
        :optionText="text"
        name="theme"
        label="Theme"
      />
      <Select :options="DIFFICULTIES" name="difficulty" label="Difficulty" />
    </Form>
    <v-divider :thickness="2" width="100%"></v-divider>
    {{ values.questions.length }} questions added
    <v-btn v-if="!isQuestionFormShown" @click="showQuestionForm">Add Question</v-btn>
    <QuizzQuestionForm v-if="isQuestionFormShown" :onSubmit="addQuestion" />
    <v-btn @click="onSubmit" :disabled="!meta.dirty || !meta.valid" size="large" variant="elevated"
      >Create</v-btn
    >
  </Wrapper>
</template>

<style scoped>
.v-btn {
  width: fit-content;
}
</style>
