<template>
  <q-dialog
    v-model="showDialog"
    persistent
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <q-btn
          style="margin: 10px"
          class="absolute-top-right"
          icon="close"
          color="primary"
          round
          flat
          @click="emitEvent('close')"
        />

        <div class="text-h6 text-primary">
          {{ props.title }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-px-md">
        <slot />
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <div class="row full-width">
          <div class="col-12">
            <q-btn
              v-if="!props.hideConfirm"
              :loading="props.saving"
              style="padding: 0 30px"
              class="float-right"
              label="Salvar"
              color="positive"
              @click="emitEvent('save')"
            />

            <q-btn
              v-if="!props.hideDelete"
              :loading="props.deleting"
              style="padding: 0 30px"
              class="float-right q-mr-md"
              label="Excluir"
              color="negative"
              @click="emitEvent('delete', true)"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emitEvent = defineEmits(['save', 'delete', 'close', 'edit']);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  deleting: {
    type: Boolean,
    default: false,
  },
  saving: {
    type: Boolean,
    default: false,
  },
  editing: {
    type: Boolean,
    default: false,
  },
  hideDelete: {
    type: Boolean,
    default: false,
  },
  hideConfirm: {
    type: Boolean,
    default: false,
  },
  hideLabels: {
    type: Boolean,
    default: false,
  },
  editIcon: {
    type: String,
    default: '',
  },
  deleteIcon: {
    type: String,
    default: '',
  },
  cancelIcon: {
    type: String,
    default: '',
  },
});

const showDialog = ref(false);

watch(() => props.show, (value) => {
  showDialog.value = value;

  if (!showDialog.value) {
    emitEvent('edit', false);
  }
});
</script>
