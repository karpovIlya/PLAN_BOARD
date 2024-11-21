import { defineStore } from 'pinia'
import ProjectApi from '~/entities/projects/api/ProjectApi'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import type { IBodyList, TCatalog } from '~/entities/projects/model/Api.interface'

interface IState {
  list: IBodyList
  catalog: TCatalog
  currentDirectoryHash: string
  currentDirectoryId: number | null
}

export const useProjectStore = defineStore('project-store', {
  state: (): IState => ({
    list: {
      workspaces: [],
      directories: [],
    },
    catalog: [],
    currentDirectoryHash: '',
    currentDirectoryId: null,
  }),
  actions: {
    async updateCurrentCatalog () {
      const updatedCatalogResponse = await ProjectApi.getCatalog(
        this.$state.currentDirectoryHash
      )

      if (
        isSuccessResponse(updatedCatalogResponse) &&
        updatedCatalogResponse.body?.catalog
      ) {
        this.$state.catalog = updatedCatalogResponse.body?.catalog
        this.$state.currentDirectoryId = updatedCatalogResponse.body.currentDirectory.id
      }

      return updatedCatalogResponse
    },
  },
})
