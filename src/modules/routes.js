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
    component: () => import('./projects/Projects.vue'),
  },
  {
    path: '/project/:id',
    name: 'project',
    props: true,
    component: () => import('./project/Project.vue'),
  },
  {
    path: '/designs',
    name: 'designs',
    component: () => import('./designs/Designs.vue'),
  },
  {
    path: '/my',
    name: 'my',
    meta: { requiresAuth: true },
    component: () => import('./my/My.vue'),
    children: [
      {
        path: 'profile',
        component: () => import('./my/MyProfile.vue'),
      },
    ],
  },
  {
    path: '/users/',
    props: true,
    name: 'users',
    meta: { requiresAuth: true },
    component: () => import('./users/Users.vue'),
    children: [
      {
        path: ':alias',
        component: () => import('./users/UserInfo.vue'),
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
