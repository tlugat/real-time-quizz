import { FORM_VALIDATION_MESSAGES } from '@/utils/validationMessages'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().min(2).max(200).required(FORM_VALIDATION_MESSAGES.required),
  description: yup.string().min(15).max(300).required(FORM_VALIDATION_MESSAGES.required)
})

export default schema
