<script setup>
import styled from 'vue3-styled-components'
import Text from 'components/Text'
import { defineProps, computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isUnlocked: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Object
  }
})

const inProgress = computed(
  () => props.progress?.current > 0 && props.progress?.current < props.progress?.goal
)

const Container = styled('div', props)`
  width: 100%;
  align-self: stretch;
  max-width: 350px;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 1.5rem;
  border: 2px solid lightgray;
  background-color: var(--white);

  img {
    filter: grayscale(100%) blur(1px);
  }

  ${({ isUnlocked }) =>
    isUnlocked &&
    `
    border-color: var(--yellow) !important;
    img {
      filter: none !important;
    }
  `}

  ${({ isUnlocked }) =>
    inProgress.value &&
    !isUnlocked &&
    `
    border-color: var(--black) !important;
    img {
      filter: grayscale(60%);
    }
  `}
`
const Description = styled(Text)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 100%;
  }
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  flex: 1;
`
const Title = styled(Text)`
  font-weight: 700;
  font-size: 1.25rem;
`
</script>
<template lang="">
  <Container :isUnlocked="props.isUnlocked">
    <img src="/icons/achievement.svg" alt="achievement" />
    <TextWrapper>
      <Title>{{ props.label }}</Title>
      <Description v-if="props.description">{{ props.description }}</Description>
      <Text v-if="inProgress && !isUnlocked" bold color="--blue">
        Progress: {{ props.progress.current }} / {{ props.progress.goal }}
      </Text>
    </TextWrapper>
  </Container>
</template>
<style lang=""></style>
