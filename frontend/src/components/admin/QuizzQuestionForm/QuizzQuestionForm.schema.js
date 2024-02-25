import { FORM_VALIDATION_MESSAGES } from '@/utils/validationMessages'
import * as yup from 'yup'

const schema = yup.object().shape({
  question: yup.string().min(20).max(200).required(FORM_VALIDATION_MESSAGES.required),
  answer1: yup.string().min(1).max(200).required(FORM_VALIDATION_MESSAGES.required),
  answer2: yup.string().min(1).max(200).required(FORM_VALIDATION_MESSAGES.required),
  answer3: yup.string().min(1).max(200).required(FORM_VALIDATION_MESSAGES.required),
  answer4: yup.string().min(1).max(200).required(FORM_VALIDATION_MESSAGES.required),
  correctAnswer: yup.string().min(1).max(200).required(FORM_VALIDATION_MESSAGES.required)
})

export default schema
