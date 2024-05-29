<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>

      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="onSubmit">
          <label for="txtDireccion">
            *Nombre:
            <input
              ref="inputNombreRef"
              type="text"
              placeholder="Ingrese nombre"
              class="input input-bordered input-primary w-full flex-1 mb-2 mt-2"
              v-model="inputNombre"
            />
          </label>
          <label for="txtDireccion">
            *Dirección:
            <input
              id="txtDireccion"
              ref="inputDireccionRef"
              type="text"
              placeholder="Ingrese dirección"
              class="input input-bordered input-primary w-full flex-1 mb-2 mt-2"
              v-model="inputDireccion"
            />
          </label>
          <p v-if="error" class="text-red-500">Debe rellenar todos los campos</p>
          <div class="flex justify-end mt-5">
            <button type="button" @click="$emit('close')" class="btn btn-error text-white mr-2">
              Cerrar
            </button>
            <button type="submit" class="btn bg-sky-500 hover:bg-sky-700 text-white">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useHospitalStore } from '../store/hospital.store';
import { useToast } from 'vue-toastification';

interface Props {
  open: boolean;
  title: string;
}

defineProps<Props>();

const emits = defineEmits<{
  close: [void];
}>();

const hospitalStore = useHospitalStore();
const inputNombre = ref('');
const inputDireccion = ref('');
const inputNombreRef = ref<HTMLInputElement | null>(null);
const inputDireccionRef = ref<HTMLInputElement | null>(null);
const error = ref(false);
const toast = useToast();

const onSubmit = async () => {
  if (!inputNombre.value.trim()) {
    error.value = true;
    inputNombreRef.value?.focus();
    return;
  }

  if (!inputDireccion.value.trim()) {
    error.value = true;
    inputDireccionRef.value?.focus();
    return;
  }

  const createdHospital = await hospitalStore.createHospital(
    inputNombre.value,
    inputDireccion.value,
  );

  emits('close');

  inputNombre.value = '';
  inputDireccion.value = '';
  error.value = false;

  if (createdHospital?.status !== 201) {
    toast.error(createdHospital?.message);
  } else {
    toast.success(`Hospital ${createdHospital?.hospital?.nombre} registrado exitosamente`);
  }
};
</script>
