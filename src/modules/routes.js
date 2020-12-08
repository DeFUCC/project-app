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
    meta: { noKeepAlive: true },
    component: () => import('./project/Project.vue'),
  },
  {
    path: '/designs',
    name: 'designs',

    meta: { noKeepAlive: true },
    component: () => import('./designs/Designs.vue'),
  },
  {
    path: '/my',
    name: 'my',
    meta: { requiresAuth: true },
    component: () => import('./my/My.vue'),
    children: [
      {
        path: '',
        alias: 'profile',
        component: () => import('./my/MyProfile.vue'),
      },
      {
        path: 'projects',
        alias: 'projects',
        component: () => import('./my/MyProjects.vue'),
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
        path: '',
        component: () => import('./users/UserList.vue'),
      },
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
