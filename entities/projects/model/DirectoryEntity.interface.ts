import type { IUser } from '~/entities/user'

export interface IDirectoryBase {
  id: number | null
  parrentID: number | null
  filesID: number[]
  autorHash: string | null
  hash: string
  name: string
  isPrivate: boolean
}

export interface IDirectoryExtend extends IDirectoryBase {
  type: 'directory'
  length: number
  createdAt: string
  updatedAt: string
  lastUpdated: string
  autor: IUser
}
