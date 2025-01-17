import {
  required,
  email,
  minLength,
  maxLength,
  alphaNum,
  helpers
} from '@vuelidate/validators'

export const customValidators = {
  email: helpers.withMessage(
    'Значение не является действительным адресом электронной почты',
    email
  ),
  required: helpers.withMessage(
    'Поле обязательно',
    required
  ),
  minLength: helpers.withMessage(
    'Длина этого поля должна составлять не менее 6 символов',
    minLength(6)
  ),
  maxLength: helpers.withMessage(
    'Длина этого поля не должна превышать 10 символов',
    maxLength(10)
  ),
  alphaNum: helpers.withMessage(
    'Значение должно быть буквенно-цифровым',
    alphaNum
  ),
  alphaCyrillic: helpers.withMessage(
    'Значение должно содержать только буквы (латиница или кириллица)',
    (value: string) => /^[A-Za-zА-Яа-яЁё]+$/.test(value)
  ),
}
