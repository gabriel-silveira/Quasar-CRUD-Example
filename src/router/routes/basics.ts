export const LOCALE_INDEX_PATH = '/locale';
export const LOCALE_INDEX_NAME = 'locale-index';

const routes = [
  {
    path: LOCALE_INDEX_PATH,
    name: LOCALE_INDEX_NAME,
    component: () => import('pages/locale/index-page.vue'),
  },
];

export default routes;
