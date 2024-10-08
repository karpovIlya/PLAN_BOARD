import { useFetch } from '~/shared/lib/hooks/useFetch'

export const useForgetPassword = async (recoveryEmail: string) => {
  const response = await useFetch<null>(
    'users/forget-password',
    {
      method: 'POST',
      body: {
        email: recoveryEmail,
      },
    }
  )

  return response
}
