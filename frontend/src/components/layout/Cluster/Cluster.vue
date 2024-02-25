<script setup>
import styled from 'vue3-styled-components'
import { defineProps } from 'vue'

const props = defineProps({
  gap: String,
  justify: String,
  align: {
    type: String,
    default: 'start'
  },
  wrap: {
    type: String,
    default: 'wrap'
  }
})

const Cluster = styled('div')`
  display: flex;
  gap: ${({ props }) => props.gap};
  justify-content: ${({ props }) => props.justify};
  align-items: ${({ props }) => props.align};
  flex-wrap: ${({ props }) => props.wrap};
`
</script>
<template lang="">
  <Cluster :props="props"><slot /></Cluster>
</template>
