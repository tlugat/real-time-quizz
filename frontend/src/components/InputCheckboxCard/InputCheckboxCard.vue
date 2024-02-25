<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'
import styled from 'vue3-styled-components'

const props = defineProps({
  disabled: Boolean,
  name: String,
  value: Boolean,
  icon: String
})

const { value, errorMessage, handleBlur, setErrors, handleChange } = useField(
  () => props.name,
  undefined,
  {
    type: 'checkbox'
  }
)

const onBlur = () => {
  handleBlur()
  setErrors([])
}

const onChange = () => handleChange(props.value)
const isChecked = computed(() => value.value.includes(props.value))

const Label = styled.label`
  position: relative;
  padding: 1rem;
  border: 2px solid var(--black);
  background-color: var(--white);
  display: flex;
  align-items: end;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  & > input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ isChecked }) =>
    isChecked &&
    `
    border: 6px var(--black) solid !important`}
`
const HiddenInput = styled.input`
  display: none;
`
const Illustration = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 57px;
  max-height: 80px;
  object-fit: cover;

  & + * {
    z-index: 1;
  }
`
</script>

<template lang="">
  <Label :isChecked="isChecked">
    <HiddenInput
      :checked="isChecked"
      :disabled="props.disabled"
      :value="props.value"
      :name="props.name"
      @change="onChange"
      type="checkbox"
      @blur="onBlur"
    />
    <Illustration :src="props.icon" />
    <slot />
  </Label>
</template>

<style scoped lang="scss"></style>
