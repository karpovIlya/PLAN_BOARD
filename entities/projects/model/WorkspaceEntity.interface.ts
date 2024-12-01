export interface IWorkspaceBase {
  id: number
  autorID: number
  participantsID: number[]
  parantID: number | null
  avatar: string | null
  name: string
  hash: string
  created: string
  lastUpdate: string
  createdAt: string
  updatedAt: string
  showCursors: boolean
  showNameOnCursor: boolean
  isCanJoinAnonyme: boolean
  autoAcceptUsers: boolean
}

export interface IWorkspaceExtend extends IWorkspaceBase {
  type: 'workspace'
  lastUpdated: string
}
