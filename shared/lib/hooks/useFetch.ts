import { useUserStore } from '~/entities/user'
import { useToast } from '~/shared/lib/hooks/useToast'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import type {
  IFetchOptions,
  ISuccesResponse,
  IFailedResponse,
  IToast
} from '~/shared/model/Fetch.interface'

const UPDATE_TOKEN_ENDPOINT = 'users/update-token'

export async function useFetch<B> (
  endpoint: string,
  options?: IFetchOptions,
  updatedAccessToken?: string
): Promise<ISuccesResponse<B> | IFailedResponse> {
  const userStore = useUserStore()

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
          Authorization: updatedAccessToken || userStore.token.accessToken,
          ...options?.headers,
        },
        body: bodyJson,
      }
    )
    const data = await response.json() as ISuccesResponse<B> | IFailedResponse

    if (!isSuccessResponse(data)) {
      throw data
    }

    if ('toast' in data) {
      useToast(data.toast as IToast)
    }

    return data as ISuccesResponse<B>
  } catch (error: any) {
    const nuxtError = useError()

    if ('status' in error) {
      const failedResponse = error as IFailedResponse

      if ('toast' in failedResponse) {
        useToast(failedResponse.toast as IToast)
        return failedResponse
      }

      if (
        failedResponse.exception.type === 'Unauthorized' &&
        endpoint !== UPDATE_TOKEN_ENDPOINT
      ) {
        const updatedAccessToken = await userStore.updateAccessToken()
        userStore.token.accessToken = updatedAccessToken

        if (updatedAccessToken) {
          return await useFetch<B>(
            endpoint,
            options,
            updatedAccessToken
          )
        }
      } else if (
        failedResponse.exception.type === 'Unauthorized' &&
        endpoint === UPDATE_TOKEN_ENDPOINT
      ) {
        userStore.clearState()
      }

      switch (failedResponse.status) {
      case 404:
      case 500:
      case 401:
      case 403:
        nuxtError.value = createError({
          statusCode: failedResponse.status,
          statusMessage: failedResponse.exception.message,
          fatal: true,
        })
        throw nuxtError
      }

      return failedResponse
    }

    nuxtError.value = createError({
      statusCode: 500,
      fatal: true,
    })
    throw nuxtError
  }
}
