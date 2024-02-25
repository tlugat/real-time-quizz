import { FORM_VALIDATION_MESSAGES } from '@/utils/validationMessages'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().min(2).max(200).required(FORM_VALIDATION_MESSAGES.required),
  slogan: yup.string().min(15).max(200).notRequired(),
  questions: yup.array().min(1).max(80).required(FORM_VALIDATION_MESSAGES.required),
  difficulty: yup.number().min(1).max(5).required(FORM_VALIDATION_MESSAGES.required),
  theme: yup.string().min(1).max(200).required(FORM_VALIDATION_MESSAGES.required)
})

export default schema
