import { useUserStore } from '~/entities/user/index'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  await userStore.checkAuth()
})
