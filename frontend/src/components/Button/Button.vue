<script setup>
import styled from 'vue3-styled-components'

const props = defineProps({
  bgColor: {
    type: String,
    default: '--primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const Button = styled('button', props)`
  width: fit-content;
  height: 58px;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  background-color: ${(props) => `var(${props.bgColor})`};
  text-transform: uppercase;
  color: var(--white);
  font-weight: 800;
  font-size: 1rem;

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #D4D4D4 !important;
    cursor: not-allowed;
    pointer-events: none;
    color: var(--white);
  `}
`
</script>

<template lang="">
  <Button :bgColor="props.bgColor" :disabled="props.disabled">
    <slot />
  </Button>
</template>
