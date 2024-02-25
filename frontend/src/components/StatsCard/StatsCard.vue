<script setup>
import styled from 'vue3-styled-components'
import Text from '@/components/Text'
import Stack from '@/components/layout/Stack'
import { computed } from 'vue'

const props = defineProps({
  stats: Object
})

const averangeRank = computed(() => {
  return parseInt(props.stats?.AverageRank) || 'No data'
})

const averageScore = computed(() => {
  return parseInt(props.stats?.AverageScore || 0)
})

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid;
`

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--black);
  background: var(--white);
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  row-gap: 0.5rem;

  & > * {
    flex: 1;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    justify-content: space-between;

    & > * {
      flex: 1;
      width: 50%;
    }
  }
`
const Line = styled(Stack)`
  border-bottom: 1px solid var(--black);
  padding-bottom: 1rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding-bottom: 0;
    padding-right: 1rem;
    border-bottom: none;
    border-right: 1px solid var(--black);
  }
`
</script>

<template>
  <Wrapper>
    <Card>
      <Line gap="0.25rem" align="center">
        <Text variant="title" color="--primary">{{ averangeRank }}</Text>
        <Text bold> rang moyen </Text>
      </Line>
      <!-- <Line></Line> -->
      <Stack gap="0.25rem" align="center">
        <Text variant="title" color="--primary">{{ averageScore }}pt</Text>
        <Text bold> score moyen </Text>
      </Stack>
    </Card>
  </Wrapper>
</template>
