<script setup>
import styled from 'vue3-styled-components'
import Text from '@/components/Text'
import InputText from '@/components/InputText'
import searchIcon from '/icons/search.svg'
import QuizzThemePackList from '@/components/QuizzThemePackList'
import QuizzThemeList from '@/components/QuizzThemeList'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  gap: 2rem;

  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    padding: 2.5rem;
  }
`
const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`
const SearchInput = styled(InputText)`
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 25rem;
  }
`

</script>

<template>
  <Wrapper>
    <SearchContainer>
      <Text variant="h3">Shop</Text>
      <SearchInput placeholder="search" :icon-left="searchIcon"></SearchInput>
    </SearchContainer>
    <Text variant="h4"> Themes pack </Text>
    <QuizzThemePackList/>
    <Text variant="h4"> Themes </Text>
    <QuizzThemeList/>
  </Wrapper>
</template>

<style lang=""></style>
