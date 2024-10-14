import { useUserStore } from '~/entities/user/index'

export default defineNuxtRouteMiddleware(async () => {
  const router = useRouter()
  const userStore = useUserStore()
  const isAuth = await userStore.checkAuth()

  if (!isAuth) {
    router.push('/sign-in')
  }
})
