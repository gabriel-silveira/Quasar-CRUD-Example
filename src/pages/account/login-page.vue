<template>
  <q-card
    class="shadow-light rounded-borders"
    style="width:400px"
  >
    <div class="bg-primary text-center text-white q-py-md">
      <q-img
        :src="Logo"
        width="72px"
        alt="Departamento de Controle do Espaço Aéreo"
        class="q-my-md"
      />

      <h5 class="q-pa-none q-ma-none">Portal Localidades</h5>
    </div>

    <div class="q-pa-lg">
      <login-form />
    </div>

  </q-card>
</template>

<script setup lang="ts">
import LoginForm from 'components/forms/login/login-form.vue';
import Logo from 'assets/imgs/logo.png';
</script>
