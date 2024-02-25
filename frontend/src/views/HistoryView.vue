<script setup>
import HistoryEntryList from 'components/HistoryEntryList'
import Text from '@/components/Text'
import styled from 'vue3-styled-components'
import { useHistoryQuery } from 'queries/history/useHistoryQuery'

const { data: history } = useHistoryQuery()

const Wrapper = styled.div`
    display: flex
    flex-direction: column;
    width:100%;
    max-width: 800px;
    padding : 1rem;
    row-gap: 2rem;
`
</script>

<template>
  <Wrapper>
    <Text variant="h4"> All games history :</Text>
    <HistoryEntryList :entries="history?.games" />
  </Wrapper>
</template>

<style scoped lang="css"></style>
