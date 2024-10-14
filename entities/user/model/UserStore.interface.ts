import type { IUser } from '~/entities/user/model/User.interface'
import type { IToken } from '~/entities/user/model/Token.interface'

export interface IUserState {
  profile: IUser
  token: IToken
}
