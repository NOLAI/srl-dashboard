import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '@/logic/auth'

const routes = [
  {
    path: '/signin',
    component: () => import('../components/SigninView.vue')
  },
  {
    path: '/',
    component: () => import('../components/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/dashboard'),
  routes: routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/signin' && auth.authenticated) {
    next({ path: '/' })
  } else if (to.path !== '/signin' && !auth.authenticated) {
    next({ path: '/signin' })
  } else {
    next()
  }
})

export default router
