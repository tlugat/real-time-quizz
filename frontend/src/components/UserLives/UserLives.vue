<script setup>
import { defineProps } from 'vue';
import styled from 'vue3-styled-components';

const props = defineProps({
  nbLives: {
    type: Number,
    required: true
  },
  playerLives: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: '1rem'
  }
})
const LivesWrapper = styled.div`
  display: flex;
  column-gap: 0.25rem;

  & > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`
</script>

<template>
    <LivesWrapper :size="props.size">
        <img v-for="i in props.playerLives" :key="i" src="/icons/heart-solid.svg" alt="heart" />
        <img v-for="i in props.nbLives - playerLives" :key="i" src="/icons/heart.svg" alt="heart" />
    </LivesWrapper>
</template>