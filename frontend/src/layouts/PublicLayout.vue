<script setup>
import styled from 'vue3-styled-components';

const Main = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

</script>

<template>
    <Main>
        <slot></slot>
    </Main>
</template>

<style lang="">
    
</style>