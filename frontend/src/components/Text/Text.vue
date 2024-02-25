<script setup>
import styled from 'vue3-styled-components'

const props = defineProps({
  color: {
    type: String,
    default: '--black'
  },
  variant: {
    type: String,
    default: 'p'
  },
  bold: {
    type: Boolean,
    default: false
  },
  textAlign: {
    type: String,
    default: 'left'
  }
})

const VARIANTS = {
  p: 'p',
  title: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4'
}

const textVariants = {
  p: `
    font-size: 1rem;
    font-family: 'Catamaran', sans- serif;
    font-weight: 400;
    line-height: 26.24px;
  `,
  title: `
    font-size: 3.5rem;
    font-family: 'Dela Gothic One', cursive;
    font-weight: 400;
    line-height: 81.09px;
  `,
  h1: `
    font-size: 3rem;
    font-family: 'Dela Gothic One', cursive;
    font-weight: 400;
    line-height: 69.5px;
  `,
  h2: `
    font-size: 2.5rem; 
    font-family: 'Dela Gothic One', cursive;
    font-weight: 400;
    line-height: 57.92px;
  `,
  h3: `
    font-size: 2rem;
    font-family: 'Dela Gothic One', cursive;
    font-weight: 400;
    line-height: 46.34px;
  `,
  h4: `
    font-size: 1.5rem;
    font-family: 'Dela Gothic One', cursive;
    font-weight: 400;
    line-height: 34.75px;
  `,
  h5: `
    font-size: 1.125rem;
    font-family: 'Dela Gothic One', cursive;
    font-weight: 400;
    line-height: 30px;
  `,
  footnote: `
    font-size: 0.875rem;
    font-family: 'Catamaran', sans- serif;
    font-weight: 400;
    line-height: 22.96px;
  `
}

const Text = styled('p', props)`
  ${({ variant }) => textVariants[variant]};
  color: ${({ color }) => `var(${color})`};
  ${({ bold }) => bold && 'font-weight: 800;'}
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`
</script>

<template>
  <Text :as="VARIANTS[props.variant]" :variant="variant" :color="color" :bold="props.bold" :textAlign="props.textAlign">
    <slot />
  </Text>
</template>
