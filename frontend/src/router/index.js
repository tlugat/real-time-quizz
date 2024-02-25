import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import { USER_ROLES } from '@/utils/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/* Navigation Guard */
router.beforeEach(async (to, from) => {
  const { isAuthenticated, returnUrl, userRoles } = storeToRefs(useAuthStore())
  const publicRoutes = ['login', 'register', 'landing']
  const isAdminRoute = to.path.startsWith('/admin')

  if (!isAuthenticated.value && !publicRoutes.includes(to.name)) {
    returnUrl.value = to.fullPath
    return { name: 'login' }
  }
  if (isAuthenticated.value && publicRoutes.includes(to.name)) {
    return { name: 'home' }
  }
  if (isAdminRoute && !userRoles.value.includes(USER_ROLES.ADMIN)) {
    return from
  }
})

export default router
