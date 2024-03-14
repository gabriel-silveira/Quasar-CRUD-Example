<template>
  <q-page padding>
    <locale-table />
  </q-page>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { LocalStorage } from 'quasar';

import Locale, { ILocale } from 'src/services/locale';
import LocaleTable from 'components/tables/locale-table.vue';

const localesOnStorage = LocalStorage.getItem('locales') as ILocale[] | undefined;

const locale = new Locale(localesOnStorage);

provide('locale', locale);
</script>
