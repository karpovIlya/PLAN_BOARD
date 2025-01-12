import { useUserStore } from '~/entities/user/index'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (userStore.token.accessToken) {
    return navigateTo('/files')
  } else if (to.path === '/') {
    return navigateTo('/sign-in')
  }
})
