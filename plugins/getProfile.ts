import { useUserStore } from '~/entities/user/index'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const isAuth = await userStore.checkAuth()

  if (isAuth) {
    await userStore.getProfile()
  }
})
