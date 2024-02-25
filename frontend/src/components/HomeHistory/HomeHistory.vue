<script setup>
import HistoryEntryList from 'components/HistoryEntryList'
import Text from '@/components/Text'
import styled from 'vue3-styled-components'
import { useHistoryLastEntriesQuery } from 'queries/history/useHistoryLastEntriesQuery'
import Link from '@/components/Link'

const { data: entries } = useHistoryLastEntriesQuery()

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 1rem;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
`
const Cluster = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
</script>

<template>
  <Wrapper>
    <Cluster>
      <Text variant="h4"> Last games :</Text>
      <Link to="/history" variant="h4">See all</Link>
    </Cluster>
    <HistoryEntryList :entries="entries" />
  </Wrapper>
</template>
