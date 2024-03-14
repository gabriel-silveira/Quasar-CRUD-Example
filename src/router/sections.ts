import { USERS_INDEX } from 'src/router/routes/users';
import { ALGORITHMS_INDEX, ALGORITHMS_SEARCH } from 'src/router/routes/algorithms';
import { ALGORITHMS_CATEGORIES_INDEX } from 'src/router/routes/algorithms_categories';
import { LOCALE_INDEX_NAME } from 'src/router/routes/basics';

export interface IMainMenuSection {
  name: string,
  items: {
    name: string,
    label: string,
  }[],
}

export const allSections = [
  {
    name: 'Cadastros básicos',
    items: [
      {
        name: LOCALE_INDEX_NAME,
        label: 'Localidades',
      },
      {
        name: '',
        label: 'Entidades externas',
      },
    ],
  },
  {
    name: 'Parâmetros gerais',
    items: [],
  },
  {
    name: 'Painel de movimentos',
    items: [],
  },
];

export const restrictedSections = [
  {
    name: 'Algoritmos',
    items: [
      {
        name: ALGORITHMS_INDEX,
        label: 'Mantenimiento',
      },
      {
        name: ALGORITHMS_SEARCH,
        label: 'Búsqueda y publicación',
      },
    ],
  },
];
