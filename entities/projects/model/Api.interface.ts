import type {
  IWorkspaceBase,
  IWorkspaceExtend
} from '~/entities/projects/model/WorkspaceEntity.interface'
import type {
  IDirectoryBase,
  IDirectoryExtend
} from '~/entities/projects/model/DirectoryEntity.interface'

export type TCatalog = Array<IWorkspaceExtend | IDirectoryExtend>

export interface IBodyWorkspace {
  workspace: IWorkspaceBase
}

export interface IBodyList {
  directories: IDirectoryBase[]
  workspaces: IWorkspaceBase[]
}

export interface IBodyCatalog {
  catalog: TCatalog
  currentDirectory: IDirectoryBase
  breadcrumbs: IDirectoryBase[]
}
