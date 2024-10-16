export interface ISetPasswordParams {
  recoveryEmail: string
  password: string
}

export interface IVerifyCodeParams {
  recoveryEmail: string
  recoveryCode: string
}

export interface IAuthParams {
  userEmail: string
  userPassword: string
}

export interface IEmailVerifyParams {
  userEmail: string,
  verifyCode: number
}

export interface IPostNewUserParams {
  userEmail: string
  userPassword: string
  userName: string
}
