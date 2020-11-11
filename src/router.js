import { createRouter, createWebHashHistory } from 'vue-router'
import { user } from './use/user.js'

import MainPageRoutes from './modules/routes'

const routes = [...MainPageRoutes]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(savedPosition)
        }, 200)
      })
    } else {
      return { top: 0 }
    }
  },
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !user.is) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/auth',
      // save the location we were at to come back later
      params: { denied: '1' },
    }
  }
})
