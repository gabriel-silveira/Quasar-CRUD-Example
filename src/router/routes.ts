import { RouteRecordRaw } from 'vue-router';
// import Account from './routes/account';
import Basics from './routes/basics';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/main-layout.vue'),
    children: [
      ...Basics,
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
  // {
  //   path: '/admin',
  //   component: () => import('layouts/login-layout.vue'),
  //   children: [
  //     ...Account,
  //     {
  //       path: ALGORITHMS_PUBLIC_PRINT_PATH,
  //       name: ALGORITHMS_PUBLIC_PRINT,
  //       component: () => import('pages/editor/print-page.vue'),
  //     },
  //   ],
  // },
];

export default routes;
