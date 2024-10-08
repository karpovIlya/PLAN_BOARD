import { useFetch } from '~/shared/lib/hooks/useFetch'
import { useUserStore } from '~/entities/user/index'
import type { IAccessTokenOnly } from '~/entities/user/model/IAccessTokenOnly.interface'

export const useRefreshToken = async () => {
  const userStore = useUserStore()

  const response = await useFetch<IAccessTokenOnly>(
    'users/update-token',
    {
      method: 'POST',
      body: {
        token: userStore.refreshToken,
      },
    }
  )

  return response
}
