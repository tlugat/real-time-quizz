<script setup>
import { useField } from 'vee-validate';
import styled from 'vue3-styled-components';

const props = defineProps({
  label: String,
  options: Array,
  disabled: Boolean,
  name: String,
  optionValue: String,
  optionText: String,
});

const { value, errorMessage, handleBlur, setErrors } = useField(() => props.name);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  row-gap: 0.5rem;
  width: 100%;
`
const ErrorMessage = styled.span`
  color: red;
`
const onBlur = () => {
  handleBlur();
  setErrors([]);
}
</script>

<template lang="">
    <Wrapper>
      <v-select class="select" :items="options" v-model="value" @blur="onBlur" :disabled="props.disabled" :name="name"
            :label="label">
            <slot></slot>
        </v-select>
        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage> 
    </Wrapper>
   
</template>

<style lang="scss">
.select {
  width: 100%;
  max-width: 320px;
}
</style>