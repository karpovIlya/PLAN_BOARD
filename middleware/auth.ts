import { useUserStore } from '~/entities/user/index'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const userStore = useUserStore()

  if (!userStore.isAuth) {
    router.push('/sign-in')
  }
})
