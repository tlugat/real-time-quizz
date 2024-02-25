<script setup>
import styled from 'vue3-styled-components'
import { defineProps } from 'vue'

const props = defineProps({
  answers: {
    type: Object,
    required: true
  },
  handleAnswer: {
    type: Function,
    required: true
  },
  currentAnswer: {
    type: String,
    required: true
  },
  isAnswerCorrect: {
    type: Boolean,
    required: true
  },
  hasAnswered: {
    type: Boolean,
    required: true
  }
})

const isAnswer = (answer) => props.currentAnswer === answer

const AnswerLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
  background-color: var(--white);
  border: solid 2px var(--black);
  padding: 1rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  ${({ isAnswer }) =>
    !isAnswer &&
    `
    &:hover {
      background-color: var(--blue);
      color: var(--white);
    }
    
    `}

  ${({ isCorrect, isAnswer }) =>
    isCorrect !== null &&
    isAnswer &&
    `
    background-color: ${isCorrect ? 'var(--primary)' : 'var(--red)'};
    color: var(--white);
    
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    `
        cursor: not-allowed;
    `}
`
const HiddenInput = styled.input`
  display: none;
`
</script>
<template>
  <AnswerLabel
    v-for="(answer, i) in props.answers"
    :key="i"
    :isAnswer="isAnswer(answer)"
    :isCorrect="props.isAnswerCorrect"
    :isDisabled="props.hasAnswered"
  >
    <HiddenInput
      :disabled="props.hasAnswered"
      type="radio"
      :id="`checkbox${i}`"
      :value="answer"
      :checked="isAnswer(answer)"
      @change="handleAnswer"
    />
    {{ answer }}
  </AnswerLabel>
</template>
