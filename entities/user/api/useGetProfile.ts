import { useFetch } from '~/shared/lib/hooks/useFetch'
import { useUserStore } from '~/entities/user/index'
import type { IProfile } from '~/entities/user/model/User.interface'

export const useGetProfile = async () => {
  const userStore = useUserStore()
  const response = await useFetch<IProfile>(
    'users/profile',
    {
      headers: {
        Authorization: userStore.accessToken,
      },
    }
  )

  return response
}
