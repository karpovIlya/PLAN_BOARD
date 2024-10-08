import { useFetch } from '~/shared/lib/hooks/useFetch'
import type { IToken } from '~/shared/model/Token.interface'

export const useAuth = async (
  userEmail: string,
  userPassword: string
) => {
  const response = await useFetch<IToken>(
    'users/login',
    {
      method: 'POST',
      body: {
        email: userEmail,
        password: userPassword,
      },
    }
  )

  return response
}
