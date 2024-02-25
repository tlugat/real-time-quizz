<script setup>
import { useQuizzesQuery } from 'queries/quizz/useQuizzesQuery';
import { useDeleteQuizzMutation } from 'queries/quizz/useDeleteQuizzMutation';

const { data: quizzes, isLoading } = useQuizzesQuery()
const deleteQuizz = useDeleteQuizzMutation();

const handleDeleteQuizz = (quizzId) => {
    deleteQuizz.mutate(quizzId);
}

</script>

<template lang="">
  <v-table class="table" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Name</th>
        <th class="text-left">Difficulty</th>
        <th class="text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        Is loading... 
      </tr>
      <tr v-else-if="quizzes?.length === 0">
        No data 
      </tr>
      <tr v-else v-for="quizz in quizzes" :key="quizz._id">
        <td>{{ quizz._id }}</td>
        <td>{{ quizz.name }}</td>
        <td>{{ quizz.difficulty }}</td>
        <td class="d-flex justify-end">
          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-delete-outline"
            color="red-lighten-2"
            size="small"
            @click="handleDeleteQuizz(quizz._id)"
          >
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped lang="scss">
.table {
    width: 100%;
}
</style>
