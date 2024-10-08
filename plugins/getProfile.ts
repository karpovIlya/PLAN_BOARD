import { useUserStore } from '~/entities/user/index'

export default defineNuxtPlugin(() => {
  const userStore = useUserStore()

  if (userStore.isAuth) {
    userStore.getProfile()
  }
})
