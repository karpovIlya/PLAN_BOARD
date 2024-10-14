export interface IUser {
  firstname: string
  middlename: string
  lastname: string
  avatar: string
  hash: string
  email: string
}

export interface IProfile {
  profile: IUser
}
