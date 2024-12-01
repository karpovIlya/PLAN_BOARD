import { useFetch } from '~/shared/lib/hooks/useFetch'
import { useUserStore } from '~/entities/user'
import type { IToken, IAccessTokenOnly } from '~/entities/user/model/Token.interface'
import type { IUserId } from '~/entities/user/model/UserId.interface'
import type { IProfile } from '~/entities/user/model/User.interface'
import type {
  ISetPasswordParams,
  IVerifyCodeParams,
  IAuthParams,
  IEmailVerifyParams,
  IPostNewUserParams
} from '~/entities/user/model/UserApi.interface'

export default class UserApi {
  static async forgetPassword (recoveryEmail: string) {
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

  static async setPassword (newPasswordParams: ISetPasswordParams) {
    return await useFetch<IToken>(
      'users/set-password',
      {
        method: 'PUT',
        body: {
          email: newPasswordParams.recoveryEmail,
          password: newPasswordParams.password,
        },
      }
    )
  }

  static async verifyCode (verifyCode: IVerifyCodeParams) {
    return await useFetch<null>(
      'users/verify-code',
      {
        method: 'POST',
        body: {
          email: verifyCode.recoveryEmail,
          code: verifyCode.recoveryCode,
        },
      }
    )
  }

  static async auth (authParams: IAuthParams) {
    return await useFetch<IToken>(
      'users/login',
      {
        method: 'POST',
        body: {
          email: authParams.userEmail,
          password: authParams.userPassword,
        },
      }
    )
  }

  static async emailVerify (emailVerifyParams: IEmailVerifyParams) {
    return await useFetch<IToken>(
      'users/email-verify',
      {
        method: 'POST',
        body: {
          email: emailVerifyParams.userEmail,
          code: emailVerifyParams.verifyCode,
        },
      }
    )
  }

  static async postNewUser (newUserParams: IPostNewUserParams) {
    return await useFetch<IUserId>(
      'users/sign-up',
      {
        method: 'POST',
        body: {
          email: newUserParams.userEmail,
          password: newUserParams.userPassword,
          firstname: newUserParams.userName,
        },
      }
    )
  }

  static async getProfile () {
    return await useFetch<IProfile>('users/profile')
  }

  static async checkToken () {
    return await useFetch<null>('users/check-token')
  }

  static async refreshToken () {
    const userStore = useUserStore()

    return await useFetch<IAccessTokenOnly>(
      'users/update-token',
      {
        method: 'POST',
        body: {
          token: userStore.token.refreshToken,
        },
      }
    )
  }
}
