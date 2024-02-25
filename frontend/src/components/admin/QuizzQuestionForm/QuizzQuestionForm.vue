<script setup>
import { useForm } from 'vee-validate'
import schema from './QuizzQuestionForm.schema';
import InputText from 'components/InputText';
import styled from 'vue3-styled-components';
import { computed, ref, watch, watchEffect } from 'vue';
import Select from 'components/Select';

const NUMBER_ANWSERS = 4;

const props = defineProps({
    onSubmit: Function,
});

const { handleSubmit, meta: questionMeta, values } = useForm({
    initialValues: {
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: null,
    }, validationSchema: schema
});

const questionAnswers = ref({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
});
const isSelectDisabled = computed(() => {
    const valuesArray = Object.values(questionAnswers.value);
    return valuesArray.some(answer => !answer);
})

const addQuestion = handleSubmit(props.onSubmit)

watch(
    () => [
        values.answer1,
        values.answer2,
        values.answer3,
        values.answer4,
    ],
    () => {
        questionAnswers.value =
        {
            answer1: values.answer1,
            answer2: values.answer2,
            answer3: values.answer3,
            answer4: values.answer4,
        }
    }
);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  width: 100%;
`
</script>

<template>
    <Form @submit.prevent="addQuestion" @keydown.enter="$event.preventDefault()">
        <InputText name="question" label="Question" />
        <InputText v-for="i in NUMBER_ANWSERS" :key="i" :name="'answer' + i" :label="'Answer ' + (i)" />
        <Select :options="Object.values(questionAnswers)" :disabled="isSelectDisabled" name="correctAnswer"
            label="Correct Answer">
        </Select>

        <v-btn :disabled="!questionMeta.dirty || !questionMeta.valid" type="submit" variant="elevated">Add</v-btn>
    </Form>
</template>

<style scoped></style>
