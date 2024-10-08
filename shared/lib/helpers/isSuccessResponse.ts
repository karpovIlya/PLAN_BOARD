import type {
  TSuccesExceptionType,
  IFailedResponse,
  ISuccesResponse
} from '~/shared/model/Fetch.interface.ts'

export const isSuccessResponse = <B>(
  response: ISuccesResponse<B> | IFailedResponse
): response is ISuccesResponse<B> & { exception: { type: TSuccesExceptionType } } => {
  const successTypes: TSuccesExceptionType[] = ['OK', 'Created', 'Updated', 'Deleted']
  return successTypes.includes(response.exception.type as TSuccesExceptionType)
}
