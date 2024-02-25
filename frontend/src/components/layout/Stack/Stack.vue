<script setup>
import styled from 'vue3-styled-components'
import { defineProps } from 'vue'

const props = defineProps({
  gap: String,
  justify: String,
  align: String
})

const Stack = styled('div', props)`
  display: flex;
  flex-direction: column;
  gap: ${({ props }) => props.gap};
  justify-content: ${({ props }) => props.justify};
  align-items: ${({ props }) => props.align};
`
</script>
<template lang="">
  <Stack :props="props"><slot /></Stack>
</template>
