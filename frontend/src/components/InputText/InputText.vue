<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'
import styled from 'vue3-styled-components'

const props = defineProps({
  label: String,
  type: String,
  name: String,
  iconLeft: String,
  iconRight: String,
  placeholder: String
})

const { value, errorMessage, setErrors, handleBlur } = useField(() => props.name)
const isTextArea = computed(() => props.type === 'textarea')

const onBlur = () => {
  handleBlur()
  setErrors([])
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;

  ${isTextArea.value && 'height: 500px;'}
`
const ErrorMessage = styled.span`
  color: red;
`
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 58px;
  border: 2px solid var(--black);
  background-color: var(--white);
  color: var(--black);
  padding: 1rem;
  padding-left: ${({ iconLeft }) => (iconLeft ? '3rem' : '1rem')}; // Add padding for icon
  padding-right: ${({ iconRight }) => (iconRight ? '3rem' : '1rem')}; // Add padding for icon

  &:disabled {
    background-color: #f0f0f0;
    color: var(--white);
    cursor: not-allowed;
  }
`

const IconLeft = styled.img`
  // Styled component for the left icon
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`

const IconRight = styled.img`
  // Styled component for the right icon
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`
</script>

<template lang="">
  <Wrapper>
    <Text as="label" variant="footnote">{{ props.label }}</Text>
    <InputWrapper>
      <IconLeft v-if="props.iconLeft" :src="props.iconLeft" alt="Icon" />
      <TextArea
        v-if="isTextArea"
        as="textarea"
        @blur="onBlur"
        v-model="value"
        :name="props.name"
        type="text"
        :label="label"
        :iconLeft="props.iconLeft"
        :iconRight="props.iconRight"
        :placeholder="props.placeholder"
      ></TextArea>
      <Input
        dense
        height="100%"
        bg-color="white"
        v-else
        class="input"
        @blur="onBlur"
        v-model="value"
        :name="props.name"
        :type="props.type || 'text'"
        :label="label"
        :iconLeft="props.iconLeft"
        :iconRight="props.iconRight"
        :placeholder="props.placeholder"
      ></Input>
      <IconRight v-if="props.iconRight" :src="props.iconRight" alt="Icon" />
    </InputWrapper>
    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
  </Wrapper>
</template>

<style scoped lang="scss"></style>
