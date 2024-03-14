<template>
  <q-page padding></q-page>
</template>

<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import Settings from 'src/services/settings';
import Logo from 'assets/imgs/logo_large.png';

const settings = inject('settings') as Settings;

onBeforeMount(() => {
  settings.page.setTitle('Inicio');
});
</script>
