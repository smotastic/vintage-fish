import Paths from './paths';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Tasklist.vue') }
    ]
  },
  {
    path: Paths.LIST_TASKS,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Tasklist.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
