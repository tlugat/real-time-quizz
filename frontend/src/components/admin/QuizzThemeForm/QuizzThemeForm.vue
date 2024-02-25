<script setup>
import { useForm } from 'vee-validate'
import { useCreateQuizzThemeMutation } from 'queries/quizzTheme/useCreateQuizzThemeMutation';
import schema from './QuizzThemeForm.schema';
import InputText from 'components/InputText';
import styled from 'vue3-styled-components';
import { useRouter } from 'vue-router';

const router = useRouter();
const { handleSubmit, meta } = useForm({
    initialValues: {
        name: '',
        description: '',
    }, validationSchema: schema
});

const createQuizzTheme = useCreateQuizzThemeMutation()

const onSubmit = handleSubmit((values) => {
    createQuizzTheme.mutate(values, {
        onSuccess: () => router.push('/admin/quizz-theme')
    });
})

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
    <Form @submit.prevent="onSubmit" @keydown.enter="$event.preventDefault()">
        <InputText name="name" label="Name" />
        <InputText name="description" label="Description" type="textarea" />
        <v-btn :disabled="!meta.dirty || !meta.valid" block size="large" type="submit" variant="elevated">Create</v-btn>
    </Form>
</template>

<style scoped></style>
