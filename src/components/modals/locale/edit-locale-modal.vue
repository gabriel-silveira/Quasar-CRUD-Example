<template>
  <edit-modal
    :show="showLocaleDialog"
    title="Editar localidade"
    :saving="data.saving"
    :editing="data.editing"
    edit-icon="edit"
    hide-delete
    :hide-labels="true"
    @save="submitLocaleForm"
    @close="closeDialog"
  >
    <q-form
      v-if="locale.data.current"
      ref="refLocaleForm"
      @submit="saveAndClose"
    >
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <!-- NAME -->
          <q-input
            v-model="locale.data.current.name"
            label="Nome da localidade"
            :rules="[val => !!val || 'Informe o nome da localidade']"
            lazy-rules
          />
        </div>

        <div class="col-6">
          <!-- AUTHORIZED ENTITY -->
          <q-input
            v-model="locale.data.current.authorized_entity"
            label="Nome da entidade autorizada a operar"
            :rules="[val => !!val || 'Informe o nome da entidade autorizada']"
            lazy-rules
          />
        </div>
      </div>

      <!-- ADDRESS -->
      <q-input
        v-model="locale.data.current.address"
        label="Endereço da localidade"
        :rules="[val => !!val || 'Informe o endereço da localização']"
        lazy-rules
      />

      <div class="row q-col-gutter-lg">
        <div class="col-3">
          <q-select
            v-model="locale.data.current.icao"
            :options="locale.data.icao"
            :rules="[val => !!val || 'Informe o sigla ICAO']"
            label="Sigla ICAO"
          />
        </div>

        <div class="col-3">
          <q-select
            v-model="locale.data.current.iata"
            :options="locale.data.iata"
            :rules="[val => !!val || 'Informe o sigla IATA']"
            label="Sigla IATA"
          />
        </div>

        <div class="col-3">
          <q-select
            v-model="locale.data.current.locale_class"
            :options="locale.data.locale_classes"
            :rules="[val => !!val || 'Informe a classe da localização']"
            label="Classe da localidade"
          />
        </div>
      </div>
    </q-form>
  </edit-modal>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  inject,
  ref,
} from 'vue';

import {
  QForm,
  QInput,
  useQuasar,
} from 'quasar';

import EditModal from 'components/modals/edit-modal.vue';
import Locale from 'src/services/locale';

const locale = inject('locale') as Locale;

const $q = useQuasar();

const refLocaleForm = ref<QForm>();

const showLocaleDialog = computed(() => locale.data.showDialog);

const data = reactive({
  editing: false,
  saving: false,
});

const closeDialog = () => locale.toggleEditDialog();

const saveAndClose = async () => {
  try {
    data.saving = true;

    if (locale.data.current?.id) {
      await locale.update();

      locale.toggleEditDialog();

      await locale.getLocales();

      $q.notify({
        message: 'Localidade atualizada',
        type: 'positive',
      });
    } else {
      await locale.create();

      await locale.getLocales();
      $q.notify({
        message: 'Localidade criada',
        type: 'positive',
      });
    }
  } catch (error) {
    $q.notify({
      message: 'Erro ao salvar dados localidade',
      type: 'negative',
    });
  } finally {
    data.saving = false;
  }
};

const submitLocaleForm = async () => {
  refLocaleForm.value?.submit();
};
</script>
