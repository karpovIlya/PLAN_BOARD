import { useFetch } from '~/shared/lib/hooks/useFetch'
import type { IUser } from '~/widgets/sign-up-form/model/SignUpFetch.interface'

export const usePostNewUser = async (
  userEmail: string,
  userPassword: string,
  userName: string
) => {
  const response = await useFetch<IUser>(
    'users/sign-up',
    {
      method: 'POST',
      body: {
        email: userEmail,
        password: userPassword,
        firstname: userName,
      },
    }
  )

  return response
}
