import { useFetch } from '~/shared/lib/hooks/useFetch'
import type { IToken } from '~/shared/model/Token.interface'

export const useSetPassword = async (
  recoveryEmail: string,
  newPassword: string
) => {
  const response = await useFetch<IToken>(
    'users/set-password',
    {
      method: 'PUT',
      body: {
        email: recoveryEmail,
        password: newPassword,
      },
    }
  )

  return response
}
