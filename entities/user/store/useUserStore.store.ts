import { defineStore } from 'pinia'
import type { IUserState } from '~/entities/user/model/UserStore.interface'
import type { IToken } from '~/entities/user/model/Token.interface'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import UserApi from '~/entities/user/api/UserApi'

const ACCESS_TOKEN_KEY_LOCAL_STORAGE = 'accessToken'
const REFRESH_TOKEN_KEY_LOCAL_STORAGE = 'refreshToke'

const userApi = new UserApi()
const getDefaultState = (): IUserState => ({
  profile: {
    firstname: '',
    middlename: '',
    lastname: '',
    avatar: '',
    hash: '',
    email: '',
  },
  token: {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE) || '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE) || '',
  },
})

export const useUserStore = defineStore('user-store', {
  state: (): IUserState => getDefaultState(),
  actions: {
    clearState () {
      Object.assign(this.$state, getDefaultState())

      localStorage.removeItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE)
      localStorage.removeItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE)
    },
    setToken (token: IToken) {
      this.$state.token = token

      localStorage.setItem(
        ACCESS_TOKEN_KEY_LOCAL_STORAGE,
        this.$state.token.accessToken
      )
      localStorage.setItem(
        REFRESH_TOKEN_KEY_LOCAL_STORAGE,
        this.$state.token.refreshToken
      )
    },
    async checkAuth () {
      const response = await userApi.checkToken(this.$state.token.refreshToken)
      return isSuccessResponse(response)
    },
    async getProfile () {
      const response = await userApi.getProfile(this.$state.token.accessToken)

      if (isSuccessResponse(response) && response.body?.profile) {
        this.$state.profile = response.body?.profile
      }
    },
    async updateAccessToken () {
      const response = await userApi.refreshToken(this.$state.token.refreshToken)

      if (!isSuccessResponse(response) || !response.body?.accessToken) {
        const router = useRouter()

        this.clearState()
        router.push('/sign-in')
        return ''
      }

      const newAccessToken = response.body!.accessToken

      this.$state.token.accessToken = newAccessToken
      localStorage.setItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE, newAccessToken)

      return newAccessToken
    },
  },
})
