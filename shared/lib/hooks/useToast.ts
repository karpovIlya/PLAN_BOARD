import { type IToast } from '~/shared/model/Fetch.interface'

export function useToast (toast: IToast) {
  const nuxtApp = useNuxtApp()

  switch (toast.type) {
  case 'error':
    nuxtApp.$toast.error(toast.message)
    break
  case 'warning':
    nuxtApp.$toast.warning(toast.message)
    break
  case 'cool':
    nuxtApp.$toast.success(toast.message)
    break
  default:
    nuxtApp.$toast.info(toast.message)
    break
  }
}
