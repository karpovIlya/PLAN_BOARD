import type {
  IWorkspaceEntity,
  ICatalogWorkspace
} from '~/entities/projects/model/WorkspaceEntity.interface'
import type {
  IDirectoryEntity,
  ICatalogDirectory
} from '~/entities/projects/model/DirectoryEntity.interface'

export type TCatalog = Array<ICatalogWorkspace | ICatalogDirectory>

export interface IBodyWorkspace {
  workspace: IWorkspaceEntity
}

export interface IBodyList {
  directories: IDirectoryEntity[]
  workspaces: IWorkspaceEntity[]
}

export interface IBodyCatalog {
  catalog: TCatalog
}
