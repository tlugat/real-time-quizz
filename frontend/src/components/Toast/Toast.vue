<script setup>
import Text from 'components/Text'
import styled from 'vue3-styled-components'

const props = defineProps({
  title: String,
  icon: String
})

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  width: 100%;
  border: solid 2px var(--black);
  padding: 1rem;
  background-color: var(--white);
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  flex: 1;
`
const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`
</script>

<template lang="">
  <Wrapper>
    <Icon v-if="props.icon" :src="icon" alt="icon" />
    <InnerWrapper>
      <Text variant="h4">{{ props.title }}</Text>
      <slot />
    </InnerWrapper>
  </Wrapper>
</template>

<style lang=""></style>
