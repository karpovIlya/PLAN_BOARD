import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { IUserState } from '~/entities/user/model/UserStore.interface'
import type { IToken } from '~/entities/user/model/Token.interface'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import UserApi from '~/entities/user/api/UserApi'

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
    accessToken: '',
    refreshToken: '',
  },
})

export const useUserStore = defineStore('user-store', {
  state: () => useLocalStorage('pinia/user-store', getDefaultState()),
  actions: {
    clearState () {
      Object.assign(this.$state, getDefaultState())
    },
    setToken (token: IToken) {
      this.$state.token = token
    },
    async checkAuth () {
      const response = await UserApi.checkToken()
      return isSuccessResponse(response)
    },
    async getProfile () {
      const response = await UserApi.getProfile()

      if (isSuccessResponse(response) && response.body?.profile) {
        this.$state.profile = response.body?.profile
      }
    },
    async updateAccessToken () {
      const response = await UserApi.refreshToken()

      if (!isSuccessResponse(response) || !response.body?.accessToken) {
        this.clearState()
        return ''
      }

      const newAccessToken = response.body!.accessToken

      this.$state.token.accessToken = newAccessToken
      return newAccessToken
    },
  },
})
