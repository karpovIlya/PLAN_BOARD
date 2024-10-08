import { useFetch } from '~/shared/lib/hooks/useFetch'
import type { IToken } from '~/shared/model/Token.interface'

export const useEmailVerify = async (
  userEmail: string,
  verificationCode: number
) => {
  const response = await useFetch<IToken>(
    'users/email-verify',
    {
      method: 'POST',
      body: {
        email: userEmail,
        code: verificationCode,
      },
    }
  )

  return response
}
