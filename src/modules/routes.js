export default [
  {
    path: '/',
    name: 'main',
    component: () => import('./main/MainPage.vue'),
  },
  {
    path: '/designs',
    name: 'designs',
    component: () => import('./designs/DesignFeed.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./user/UserPage.vue'),
  },
]
