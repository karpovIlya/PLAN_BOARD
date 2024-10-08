import { useUserStore } from '~/entities/user/index'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import type {
  IFetchOptions,
  ISuccesResponse,
  IFailedResponse
} from '~/shared/model/Fetch.interface'

const UPDATE_TOKEN_ENDPOINT = 'users/update-token'

export async function useFetch<B> (
  endpoint: string,
  options?: IFetchOptions
): Promise<ISuccesResponse<B> | IFailedResponse> {
  try {
    const config = useRuntimeConfig()
    const API_URL = config.public.API_URL
    const paramsUrl = new URLSearchParams(options?.params).toString()
    const bodyJson = options?.body ? JSON.stringify(options?.body) : null

    const response = await fetch(
      `${API_URL}${endpoint}?${paramsUrl}`,
      {
        method: options?.method ?? 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: bodyJson,
      }
    )
    const data = await response.json() as ISuccesResponse<B> | IFailedResponse

    if (!isSuccessResponse(data)) {
      throw data
    }

    return data as ISuccesResponse<B>
  } catch (error: any) {
    if ('status' in error) {
      const failedResponse = error as IFailedResponse

      if (
        failedResponse.exception.type === 'Unauthorized' &&
        endpoint !== UPDATE_TOKEN_ENDPOINT
      ) {
        const userStore = useUserStore()
        const isTokenUpdated = await userStore.updateToken()

        if (isTokenUpdated && options?.headers?.Authorization) {
          options.headers.Authorization = userStore.accessToken
          return await useFetch<B>(endpoint, options)
        }
      }

      return failedResponse
    }

    throw error
  }
}
