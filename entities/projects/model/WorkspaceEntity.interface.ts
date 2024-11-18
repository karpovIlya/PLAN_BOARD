import type { IUser } from '~/entities/user'

interface IWorkspaceSettings {
  showCursors: boolean
  showNameOnCursor: boolean
  isCanJoinAnonyme: boolean
  autoAcceptUsers: boolean
}

export interface IWorkspaceEntity {
  id: number
  autorID: number
  online: number
  participantsID: number[]
  name: string
  hash: string
  created: string
  lastUpdate: string
  lastUpdated: string
  avatar: string
  location: string
  settings: IWorkspaceSettings
}

export interface ICatalogWorkspace extends IWorkspaceEntity {
  type: 'workspace'
  autor: IUser
}
