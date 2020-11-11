export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./main/MainPage.vue'),
  },
  {
    path: '/',
    name: 'main',
    component: () => import('./main/MainPage.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('./projects/ProjectsFeed.vue'),
  },
  {
    path: '/project/:id',
    name: 'project',
    props: true,
    component: () => import('./project/ProjectPage.vue'),
  },
  {
    path: '/designs',
    name: 'designs',
    component: () => import('./designs/DesignsFeed.vue'),
  },
  {
    path: '/user/',
    props: true,
    name: 'user',
    meta: { requiresAuth: true },
    component: () => import('./user/UserPage.vue'),
    children: [
      {
        path: ':alias',
        component: () => import('./user/UserInfo.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('./auth/AuthForm.vue'),
  },
  {
    path: '/history',
    component: () => import('./history/HistoryPage.vue'),
  },
]
