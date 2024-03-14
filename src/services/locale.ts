import { reactive } from 'vue';
import { LocalStorage } from 'quasar';

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const myLocale = {
  days,
  daysShort: [...days.map((day) => day.slice(0, 3))],
  months,
  monthsShort: [...months.map((day) => day.slice(0, 3))],
  firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias',
};

const defaultLocales = [
  {
    id: 1,
    name: 'Aeroporto Internacional de São Paulo-Guarulhos',
    address: 'Rod. Hélio Smidt, s/nº - Aeroporto, Guarulhos - SP, 07190-100',
    icao: 'SBGR',
    iata: 'GRU',
    authorized_entity: 'GRU Airport',
    locale_class: 'A',
    services: [],
  },
  {
    id: 2,
    name: 'Aeroporto Santos Dumont',
    address: 'Praça Sen. Salgado Filho, s/n - Centro, Rio de Janeiro - RJ, 20021-340',
    icao: 'SBRJ',
    iata: 'SDU',
    authorized_entity: 'Infraero',
    locale_class: 'B',
    services: [],
  },
];

export interface ILocale {
  id?: number,
  name: string,
  address: string,
  icao: string,
  iata: string,
  authorized_entity: string,
  locale_class: string,
  services: string[],
}

const emptyLocale: ILocale = {
  id: 0,
  name: '',
  address: '',
  icao: '',
  iata: '',
  authorized_entity: '',
  locale_class: '',
  services: [],
};

class Locale {
  public data: {
    loading: boolean,
    showDialog: boolean,
    index: ILocale[],
    current: ILocale,
    icao: string[],
    iata: string[],
    locale_classes: string[],
    services: string[],
  } = reactive({
      loading: true,
      showDialog: false,
      index: [],
      current: { ...emptyLocale },
      icao: ['SBSP', 'SBRJ', 'SBGR', 'SBBR'],
      iata: ['CGH', 'SDU', 'GRU', 'DSB'],
      locale_classes: ['A', 'B', 'C', 'D', 'E', 'F'],
      services: ['RADAR', 'ILS / ALS', 'VOR / DME', 'NDB', 'PAPI / VASIS'],
    });

  constructor(localesOnStorage: ILocale[] | undefined) {
    this.data.index = localesOnStorage || [...defaultLocales];
  }

  public resetCurrentLocale() {
    this.data.current = { ...emptyLocale };
  }

  public toggleEditDialog() {
    this.data.showDialog = !this.data.showDialog;
  }

  public getLocales() {
    try {
      this.data.loading = true;

      return Promise.resolve(this.data.index);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public searchLocale(keyword: string) {
    try {
      this.data.loading = true;

      const localesFound = this.data.index.filter(
        (locale) => locale.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1,
      );

      return Promise.resolve(localesFound);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        this.data.loading = false;
      }, 1000);
    }
  }

  public create() {
    try {
      this.data.index.push({
        ...this.data.current,
        id: this.data.index.length + 1,
      });

      LocalStorage.set('locales', this.data.index);

      this.resetCurrentLocale();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public update() {
    try {
      if (this.data.current) {
        const itemFound = this.data.index.find((item) => item.id === this.data.current?.id);

        if (itemFound) {
          const index = this.data.index.indexOf(itemFound);

          this.data.index[index] = { ...this.data.current };

          LocalStorage.set('locales', this.data.index);
        }
      }

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public delete() {
    try {
      const itemFound = this.data.index.find((item) => item.id === this.data.current?.id);

      if (itemFound) {
        const index = this.data.index.indexOf(itemFound);

        if (index > -1) {
          this.data.index.splice(index, 1);

          LocalStorage.set('locales', this.data.index);
        }
      }

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Locale;
