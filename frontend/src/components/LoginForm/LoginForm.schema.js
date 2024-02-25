import { FORM_VALIDATION_MESSAGES } from '@/utils/validationMessages'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9-À-ÿ]+$/, FORM_VALIDATION_MESSAGES.noSpecialCharacters)
    .required(FORM_VALIDATION_MESSAGES.required),
  password: yup.string().min(6).required(FORM_VALIDATION_MESSAGES.required)
})

export default schema
