type THTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
export type TSuccesExceptionType = 'OK' | 'Created' | 'Updated' | 'Deleted'
export type TFailedExceptionType =
  'InvalidRequest' | 'Unauthorized' | 'PermissionDenied' |
  'NotFound' | 'AlreadyExist' | 'Unexpected'

export interface IToast {
  type: 'warning' | 'error' | 'cool'
  message: string
}

interface ISuccesException {
  type: TSuccesExceptionType
  message: string
}

interface IFailedException {
  type: TFailedExceptionType
  message: string
}

interface IError {
  property: string
  messages: string[]
}

interface IBodyError {
  errors: IError[]
}

export interface IFetchOptions {
  method?: THTTPMethod
  headers?: Record<string, any>
  params?: Record<string, any>
  body?: Record<string, any>
}

export interface ISuccesResponse<B> {
  status: number
  exception: ISuccesException
  toast?: IToast
  body?: B
}

export interface IFailedResponse {
  status: number
  exception: IFailedException
  toast?: IToast
  body?: IBodyError
}
