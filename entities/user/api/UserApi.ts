import { useFetch } from '~/shared/lib/hooks/useFetch'
import { useUserStore } from '~/entities/user'
import type { IToken, IAccessTokenOnly } from '~/entities/user/model/Token.interface'
import type { IUserId } from '~/entities/user/model/UserId.interface'
import type { IProfile } from '~/entities/user/model/User.interface'

export default class UserApi {
  async forgetPassword (recoveryEmail: string) {
    return await useFetch<null>(
      'users/forget-password',
      {
        method: 'POST',
        body: {
          email: recoveryEmail,
        },
      }
    )
  }

  async setPassword (
    recoveryEmail: string,
    newPassword: string
  ) {
    return await useFetch<IToken>(
      'users/set-password',
      {
        method: 'PUT',
        body: {
          email: recoveryEmail,
          password: newPassword,
        },
      }
    )
  }

  async verifyCode (
    recoveryEmail: string,
    recoveryCode: string
  ) {
    return await useFetch<null>(
      'users/verify-code',
      {
        method: 'POST',
        body: {
          email: recoveryEmail,
          code: recoveryCode,
        },
      }
    )
  }

  async auth (
    userEmail: string,
    userPassword: string
  ) {
    return await useFetch<IToken>(
      'users/login',
      {
        method: 'POST',
        body: {
          email: userEmail,
          password: userPassword,
        },
      }
    )
  }

  async emailVerify (
    userEmail: string,
    verificationCode: number
  ) {
    return await useFetch<IToken>(
      'users/email-verify',
      {
        method: 'POST',
        body: {
          email: userEmail,
          code: verificationCode,
        },
      }
    )
  }

  async postNewUser (
    userEmail: string,
    userPassword: string,
    userName: string
  ) {
    return await useFetch<IUserId>(
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
  }

  async getProfile (currentAccessToken: string) {
    return await useFetch<IProfile>(
      'users/profile',
      {
        headers: {
          Authorization: currentAccessToken,
        },
      },
      useUserStore().updateAccessToken
    )
  }

  async checkToken (currentRefreshToken: string) {
    return await useFetch<IProfile>(
      'users/check-token',
      {
        headers: {
          Authorization: currentRefreshToken,
        },
      },
      useUserStore().updateAccessToken
    )
  }

  async refreshToken (currentRefreshToken: string) {
    return await useFetch<IAccessTokenOnly>(
      'users/update-token',
      {
        method: 'POST',
        body: {
          token: currentRefreshToken,
        },
      }
    )
  }
}
