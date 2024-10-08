import { useFetch } from '~/shared/lib/hooks/useFetch'

export const useVerifyCode = async (
  recoveryEmail: string,
  recoveryCode: string
) => {
  const response = await useFetch<null>(
    'users/verify-code',
    {
      method: 'POST',
      body: {
        email: recoveryEmail,
        code: recoveryCode,
      },
    }
  )

  return response
}
