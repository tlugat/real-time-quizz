<script setup>
import { useQuizzThemesQuery } from 'queries/quizzTheme/useQuizzThemesQuery';

const { data: quizzThemes, isLoading } = useQuizzThemesQuery()

</script>

<template lang="">
  <v-table class="table" fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Name</th>
        <th class="text-left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        Is loading... 
      </tr>
      <tr v-else-if="quizzThemes?.length === 0">
        No data 
      </tr>
      <tr v-else v-for="quizzTheme in quizzThemes" :key="quizzTheme._id">
        <td>{{ quizzTheme._id }}</td>
        <td>{{ quizzTheme.name }}</td>
        <td>{{ quizzTheme.description }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
}
</style>
