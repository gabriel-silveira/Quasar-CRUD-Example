<template>
  <q-page padding>
    <locale-table />
  </q-page>
</template>

<script setup lang="ts">
import { provide } from 'vue';

import Locale from 'src/services/locale';
import LocaleTable from 'components/tables/locale-table.vue';

const locale = new Locale();
provide('locale', locale);
</script>
