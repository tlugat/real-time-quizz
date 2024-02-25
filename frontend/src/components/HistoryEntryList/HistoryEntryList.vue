<script setup>
import HistoryEntryCard from 'components/HistoryEntryCard'
import styled from 'vue3-styled-components'

const props = defineProps({
  entries: {
    type: Array,
    required: true
  }
})

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 1rem;
`
</script>

<template>
  <Text v-if="!props.entries">No history yet!</Text>
  <HistoryList v-else>
    <HistoryEntryCard v-for="(entry, i) in props.entries" :data="entry" :key="i" />
  </HistoryList>
</template>

<style scoped lang="css"></style>
