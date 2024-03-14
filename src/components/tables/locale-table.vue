<template>
  <div>
    <q-table
      :rows="data.index"
      :columns="columns"
      :loading="locale.data.loading"
      :rows-per-page-options="[0]"
      title="Manutenção de Localidades"
      row-key="name"
      flat
      :hide-bottom="data.index.length > 0"
    >
      <template v-slot:loading>
        <q-inner-loading
          color="primary"
          showing
        />
      </template>

      <template v-slot:no-data>
        <b>Nenhuma localidade encontrada.</b>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :props="props" key="name">
            {{ props.row.name }}
          </q-td>

          <!--        <q-td :props="props" key="address">-->
          <!--          {{ props.row.address }}-->
          <!--        </q-td>-->

          <q-td :props="props" key="icao">
            {{ props.row.icao }}
          </q-td>

          <q-td :props="props" key="iata">
            {{ props.row.iata }}
          </q-td>

          <q-td :props="props" key="authorized_entity">
            {{ props.row.authorized_entity }}
          </q-td>

          <q-td :props="props" key="locale_class">
            {{ props.row.locale_class }}
          </q-td>

          <q-td :props="props" key="action">
            <q-btn
              color="primary"
              icon="edit"
              dense
              flat
              @click="startEditing(props.row)"
            >
              <q-tooltip class="text-body2">
                Editar
              </q-tooltip>
            </q-btn>

            <q-btn
              class="q-ml-md"
              color="primary"
              icon="delete"
              dense
              flat
              @click="startDeleting(props.row)"
            >
              <q-tooltip class="text-body2">
                Excluir
              </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-btn
      class="absolute-top-right"
      style="margin: 40px 25px 0 0"
      color="primary"
      label="Nova localidade"
      @click="startCreating"
    />

    <edit-locale-modal />

    <delete-modal
      :show="data.showDeleteDialog"
      title="Tem certeza que deseja excluir esta localidade?"
      :item-name="locale.data.current?.name"
      @cancel="data.showDeleteDialog = false"
      @confirm="deleteAndClose"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';

import Locale, { ILocale } from 'src/services/locale';
import EditLocaleModal from 'components/modals/locale/edit-locale-modal.vue';
import DeleteModal from 'components/modals/simple-modal.vue';

const $q = useQuasar();

const locale = inject('locale') as Locale;

const columns = [
  {
    name: 'name',
    align: 'left',
    label: 'Nome da localidade',
    field: 'name',
    style: 'width:20%',
  },
  // {
  //   name: 'address',
  //   align: 'left',
  //   label: 'Endereço da localidade',
  //   field: 'address',
  //   style: 'width:30%',
  // },
  {
    name: 'icao',
    align: 'center',
    label: 'ICAO',
    field: 'icao',
    style: 'width:10%',
  },
  {
    name: 'iata',
    align: 'center',
    label: 'IATA',
    field: 'iata',
    style: 'width:10%',
  },
  {
    name: 'authorized_entity',
    align: 'center',
    label: 'Nome da entidade autorizada a operar',
    field: 'authorized_entity',
    style: 'width:10%',
  },
  {
    name: 'locale_class',
    align: 'center',
    label: 'Classe da localidade',
    field: 'locale_class',
    style: 'width:10%',
  },
  {
    name: 'action',
    align: 'right',
    label: '',
    field: 'action',
  },
];

const data = reactive({
  index: [],
  showDeleteDialog: false,
  deleting: false,
});

const startCreating = (localeData: ILocale) => {
  locale.resetCurrentLocale();

  locale.toggleEditDialog();
};

const startEditing = (localeData: ILocale) => {
  locale.data.current = { ...localeData };

  locale.toggleEditDialog();
};

const startDeleting = (localeData: ILocale) => {
  locale.data.current = { ...localeData };

  data.showDeleteDialog = true;
};

const deleteAndClose = async () => {
  try {
    data.showDeleteDialog = false;

    data.deleting = true;

    await locale.delete();

    await locale.getLocales();

    $q.notify({
      message: 'Localidade excluída',
      type: 'positive',
    });
  } catch (error) {
    $q.notify({
      message: 'Erro ao excluir a localidade',
    });
  } finally {
    data.deleting = false;
  }
};

onMounted(async () => {
  data.index = await locale.getLocales();
});
</script>
