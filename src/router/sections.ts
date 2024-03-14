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
