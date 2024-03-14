import { RouteRecordRaw } from 'vue-router';
import Account from './routes/account';
import Basics from './routes/basics';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/main-layout.vue'),
    children: [
      ...Basics,
    ],
  },
  {
    path: '/account',
    component: () => import('layouts/login-layout.vue'),
    children: [
      ...Account,
    ],
  },
  // {
  //   path: '',
  //   component: () => import('layouts/main-layout.vue'),
  //   children: [],
  // },
  // {
  //   path: '',
  //   component: () => import('layouts/main-layout.vue'),
  //   children: [
  //     ...Home,
  //     ...Users,
  //     ...Algorithms,
  //     ...AlgorithmsCategories,
  //   ],
  // },

];

export default routes;
