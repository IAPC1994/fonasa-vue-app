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
          <p v-if="errorInputNombre" class="text-red-500">El nombre es requerido</p>
          <label for="txtEdad">
            *Edad:
            <input
              id="txtEdad"
              ref="inputEdadRef"
              type="number"
              min="1"
              placeholder="Ingrese edad"
              class="input input-bordered input-primary w-full flex-1 mb-2 mt-2"
              v-model="inputEdad"
            />
          </label>
          <p v-if="errorInputEdad" class="text-red-500">La edad debe ser mayor que 0</p>
          <label for="txtNoHistoriaClinica">
            *N° de historia clínica:
            <input
              id="txtNoHistoriaClinica"
              ref="inputHistoriaClinicaRef"
              type="number"
              min="0"
              placeholder="Ingrese N° Historia Clínica"
              class="input input-bordered input-primary w-full flex-1 mb-2 mt-2"
              v-model="inputHistoriaClinica"
            />
          </label>
          <p v-if="errorInputHistoria" class="text-red-500">
            El número de historia clinica debe ser mayor o igual a 0
          </p>
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
import { usePacienteStore } from '../store/paciente.store';
import { useToast } from 'vue-toastification';
import { useHospitalStore } from '../../hospital/store/hospital.store';

interface Props {
  open: boolean;
  title: string;
}

defineProps<Props>();

const emits = defineEmits<{
  close: [void];
}>();

const pacienteStore = usePacienteStore();
const hospitalStore = useHospitalStore();
const toast = useToast();
const inputNombre = ref('');
const inputEdad = ref(1);
const inputHistoriaClinica = ref(0);
const inputNombreRef = ref<HTMLInputElement | null>(null);
const inputEdadRef = ref<HTMLInputElement | null>(null);
const inputHistoriaClinicaRef = ref<HTMLInputElement | null>(null);
const errorInputNombre = ref(false);
const errorInputEdad = ref(false);
const errorInputHistoria = ref(false);

const onSubmit = async () => {
  if (!inputNombre.value.trim()) {
    errorInputNombre.value = true;
    inputNombreRef.value?.focus();
    return;
  }

  if (inputEdad.value <= 0) {
    errorInputEdad.value = true;
    inputEdadRef.value?.focus();
    return;
  }

  if (inputHistoriaClinica.value < 0) {
    errorInputHistoria.value = true;
    inputEdadRef.value?.focus();
    return;
  }

  const createdPatient = await pacienteStore.createPatient(
    inputNombre.value,
    inputEdad.value,
    inputHistoriaClinica.value,
    Number(hospitalStore.getSelectedHospital),
  );

  emits('close');

  inputNombre.value = '';
  inputEdad.value = 1;
  inputHistoriaClinica.value = 0;
  errorInputNombre.value = false;
  errorInputEdad.value = false;
  errorInputHistoria.value = false;
  if (createdPatient?.status !== 201) {
    toast.error(createdPatient?.message);
  } else {
    toast.success(createdPatient?.message);
  }
};
</script>
