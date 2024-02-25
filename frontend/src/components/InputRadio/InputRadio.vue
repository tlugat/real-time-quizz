<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'
import styled from 'vue3-styled-components'

const props = defineProps({
  disabled: Boolean,
  name: String,
  value: String || Number
})

const { value, handleBlur, setErrors, handleChange } = useField(() => props.name, undefined, {
  type: 'radio',
  valueProp: props.value
})

const onChange = () => handleChange(props.value)
const onBlur = () => {
  handleBlur()
  setErrors([])
}
const isChecked = computed(() => value.value === props.value)

const Label = styled.label`
  padding-block: 0.5rem;
  border: 1px solid var(--black);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 0.5rem;
  width: 100%;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const HiddenInput = styled.input`
  display: none;
`
const RadioButton = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--black);
  padding: 0.125rem;
  background-color: var(--white);
`

const CheckedIndicator = styled.span`
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  display: block;
`
</script>

<template lang="">
  <Label>
    <RadioButton>
      <CheckedIndicator v-if="isChecked" />
    </RadioButton>
    <HiddenInput
      :checked="isChecked"
      :disabled="props.disabled"
      :value="props.value"
      :name="props.name"
      @change="onChange"
      @blur="onBlur"
      type="radio"
    />
    <slot />
  </Label>
</template>

<style scoped lang="scss"></style>
