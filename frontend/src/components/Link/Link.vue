<script setup>
import styled from 'vue3-styled-components'
import { RouterLink } from 'vue-router'

const props = defineProps({
  color: {
    type: String,
    default: '--black'
  }
})

const Link = styled(RouterLink)`
  color: var(${props.color});
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
</script>

<template>
  <Link>
    <slot />
  </Link>
</template>
