import { defineStore } from 'pinia'
import { useRefreshToken } from '~/entities/user/api/useRefreshToken'
import { useGetProfile } from '~/entities/user/api/useGetProfile'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'

export const useUserStore = defineStore('user-store', () => {
  const router = useRouter()

  const id = ref(0)
  const email = ref('')
  const firstname = ref('')
  const middlename = ref('')
  const lastname = ref('')
  const avatar = ref('')

  const accessToken = ref(localStorage.getItem('accessToken') ?? '')
  const refreshToken = ref(localStorage.getItem('refreshToken') ?? '')

  const isAuth = computed(() => {
    return !!accessToken.value
  })

  const setAccessToken = (newAccessToken: string) => {
    accessToken.value = newAccessToken
    localStorage.setItem('accessToken', accessToken.value)
  }

  const setRefreshToken = (newRefreshToken: string) => {
    refreshToken.value = newRefreshToken
    localStorage.setItem('refreshToken', accessToken.value)
  }

  const clearState = () => {
    id.value = 0
    email.value = ''
    firstname.value = ''
    middlename.value = ''
    lastname.value = ''
    avatar.value = ''

    accessToken.value = ''
    refreshToken.value = ''
  }

  const getProfile = async () => {
    const profileResponse = await useGetProfile()

    if (isSuccessResponse(profileResponse)) {
      id.value = profileResponse.body?.profile.id ?? 0
      avatar.value = profileResponse.body?.profile.avatar ?? ''
      firstname.value = profileResponse.body?.profile.firstname ?? ''
      middlename.value = profileResponse.body?.profile.middlename ?? ''
      lastname.value = profileResponse.body?.profile.lastname ?? ''
    }
  }

  const updateToken = async (): Promise<boolean> => {
    const updateTokenResponse = await useRefreshToken()

    if (isSuccessResponse(updateTokenResponse)) {
      setAccessToken(updateTokenResponse.body?.accessToken ?? '')
      return true
    } else {
      clearState()
      router.push('/sign-in')
      return false
    }
  }

  return {
    id,
    email,
    firstname,
    middlename,
    lastname,
    avatar,
    accessToken,
    refreshToken,
    isAuth,
    setAccessToken,
    setRefreshToken,
    getProfile,
    updateToken,
  }
})
