import { createRouter, createWebHistory } from 'vue-router'
import routes from 'voie-pages'

export const router = createRouter({
  history: createWebHistory(),
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

/*
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !user.is?.pub) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/auth',
      // save the location we were at to come back later
    }
  }
})
*/
