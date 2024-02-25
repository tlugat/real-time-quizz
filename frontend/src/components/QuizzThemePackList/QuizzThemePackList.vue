<script setup>
import { useQuizzThemesPackQuery } from 'queries/quizzThemePack/useQuizzThemesPackQuery'
import QuizzThemePack from '@/components/QuizzThemePack'
import styled from 'vue3-styled-components'
import { useInventoryThemePacksQuery } from '@/queries/inventory/useInventoryThemePacksQuery';

const { data: themePacks } = useQuizzThemesPackQuery()
const { data: inventoryThemePacks } = useInventoryThemePacksQuery()

const isOwned = (id) => inventoryThemePacks.value?.some((themePackId) => themePackId === id)

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`
</script>

<template lang="">
  <Wrapper>
    <QuizzThemePack
      v-for="themePack in themePacks"
      :key="themePack._id"
      :themePack="themePack"
      :isOwned="isOwned(themePack._id)"
    />
  </Wrapper>
</template>