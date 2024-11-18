import type { IUser } from '~/entities/user'

export interface IDirectoryEntity {
  id: number
  parrentID: number
  filesID: number[]
  hash: string
  name: string
  lastUpdated: string
  autorHash: string
  isPrivate: boolean
  autor: IUser
}

export interface ICatalogDirectory extends IDirectoryEntity {
  type: 'directory'
  autor: IUser
}
