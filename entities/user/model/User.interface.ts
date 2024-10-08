interface IUser {
  id: number
  hash: string
  fullname: string
  avatar: string
  firstname: string
  middlename: string
  lastname: string
}

export interface IProfile {
  profile: IUser
}
