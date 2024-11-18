import { useFetch } from '~/shared/lib/hooks/useFetch'
import { useUserStore } from '~/entities/user'
import type {
  IBodyWorkspace,
  IBodyList,
  IBodyCatalog
} from '~/entities/projects/model/Api.interface'

export default class ProjectApi {
  static async createWorkspace (currentDirectoryID?: number) {
    const userStore = useUserStore()

    return await useFetch<IBodyWorkspace>(
      'projects/workspace',
      {
        method: 'POST',
        headers: {
          Authorization: userStore.token.accessToken,
        },
        body: {
          directoryID: currentDirectoryID,
        },
      },
      userStore.updateAccessToken
    )
  }

  static async createDirectory (
    directoryName: string,
    currentDirectoryID?: number
  ) {
    const userStore = useUserStore()

    return await useFetch<null>(
      'projects/create-directory',
      {
        method: 'POST',
        headers: {
          Authorization: userStore.token.accessToken,
        },
        body: {
          name: directoryName,
          directoryID: currentDirectoryID,
        },
      },
      userStore.updateAccessToken
    )
  }

  static async getCatalog (currentId?: number) {
    const userStore = useUserStore()

    return await useFetch<IBodyCatalog>(
      'projects/catalog' + (currentId ? `/${currentId}` : ''),
      {
        headers: {
          Authorization: userStore.token.accessToken,
        },
      },
      userStore.updateAccessToken
    )
  }

  static async getProjectsList () {
    const userStore = useUserStore()

    return await useFetch<IBodyList>(
      'projects/list',
      {
        headers: {
          Authorization: userStore.token.accessToken,
        },
      },
      userStore.updateAccessToken
    )
  }
}
