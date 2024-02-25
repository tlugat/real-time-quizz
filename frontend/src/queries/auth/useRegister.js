import { useMutation } from '@tanstack/vue-query'
import { register } from '../../api'

export const useRegister = () => {
  return useMutation({
    mutationFn: (formData) => register(formData)
  })
}
