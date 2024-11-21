import { useFetch } from '~/shared/lib/hooks/useFetch'
import type {
  IBodyWorkspace,
  IBodyList,
  IBodyCatalog
} from '~/entities/projects/model/Api.interface'

export default class ProjectApi {
  static async createWorkspace (currentDirectoryId?: number | null) {
    return await useFetch<IBodyWorkspace>(
      'projects/workspace',
      {
        method: 'POST',
        body: {
          directoryID: currentDirectoryId,
        },
      }
    )
  }

  static async createDirectory (
    directoryName: string,
    currentDirectoryId?: number | null
  ) {
    return await useFetch<null>(
      'projects/create-directory',
      {
        method: 'POST',
        body: {
          name: directoryName,
          directoryID: currentDirectoryId,
        },
      }
    )
  }

  static async getCatalog (currentDirectoryHash?: string) {
    return await useFetch<IBodyCatalog>(
      'projects/catalog' + (currentDirectoryHash ? `/${currentDirectoryHash}` : '')
    )
  }

  static async getProjectsList () {
    return await useFetch<IBodyList>('projects/list')
  }
}
