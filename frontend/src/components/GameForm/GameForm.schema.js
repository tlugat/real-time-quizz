import { FORM_VALIDATION_MESSAGES } from '@/utils/validationMessages'
import * as yup from 'yup'

const schema = yup.object().shape({
  playersMax: yup
    .number()
    .min(2)
    .max(10, FORM_VALIDATION_MESSAGES.noSpecialCharacters)
    .required(FORM_VALIDATION_MESSAGES.required),
  questionTime: yup.number().min(3).max(300).required(FORM_VALIDATION_MESSAGES.required),
  difficulty: yup.number().min(1).max(4).required(FORM_VALIDATION_MESSAGES.required),
  themes: yup.array(yup.string()).min(1).required(FORM_VALIDATION_MESSAGES.required)
})

export default schema
