import {
  required,
  email,
  minLength,
  alphaNum,
  alpha,
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
  alphaNum: helpers.withMessage(
    'Значение должно быть буквенно-цифровым',
    alphaNum
  ),
  alpha: helpers.withMessage(
    'Значение должно быть буквенным',
    alpha
  ),
}
