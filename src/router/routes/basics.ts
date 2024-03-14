import { HOME } from 'src/router/routes/home';

export const LOCALE_INDEX_PATH = '/locale';
export const LOCALE_INDEX_NAME = 'locale-index';

const routes = [
  {
    path: '',
    name: HOME,
    component: () => import('pages/home/home-page.vue'),
  },
  {
    path: LOCALE_INDEX_PATH,
    name: LOCALE_INDEX_NAME,
    component: () => import('pages/locale/index-page.vue'),
  },
];

export default routes;
