<script setup>
import { useSuccessesQuery } from 'queries/success/useSuccessesQuery'
import { useUserSuccessesQuery } from 'queries/success/useUserSuccessesQuery'

const { data: successes } = useSuccessesQuery()
const { data: userSuccesses } = useUserSuccessesQuery()
</script>
<template lang="">
  <div></div>
</template>
<style lang=""></style>
