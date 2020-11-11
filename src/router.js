import { createRouter, createWebHashHistory } from 'vue-router'

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
