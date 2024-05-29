<template>
  <div class="container mx-auto">
    <div class="flex justify-center pt-5">
      <h1 class="text-2xl font-bold underline">Hospitales</h1>
    </div>
    <div class="flex justify-end">
      <button-primary @click="modalOpen = true">
        <template #icon>
          <add-icon class="mr-1" />
        </template>
        <template #title>
          <span class="text-white">Agregar</span>
        </template>
      </button-primary>
    </div>

    <div v-if="hospitalStore.noHospitals" class="flex flex-col justify-center px-10">
      <div class="flex justify-center">
        <p>No se han encontrado hospitales registrados...</p>
      </div>
    </div>

    <div v-else class="overflow-x-auto w-full h-[700px]">
      <table class="table table-zebra-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Consultas disponibles</th>
            <th>Consultas ocupadas</th>
            <th>Pacientes pendientes</th>
            <th>Pacientes en espera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody class="w-full max-h-[500px] overflow-auto">
          <tr v-for="hospital in hospitalStore.hospitals" :key="hospital.id" class="bg-base-200">
            <th>{{ hospital.id }}</th>
            <td>{{ hospital.nombre }}</td>
            <td>{{ hospital.direccion }}</td>
            <td>{{ hospital.consultasDisponibles }}</td>
            <td>{{ hospital.consultasOcupadas }}</td>
            <td>{{ hospital.pacientesPendientes }}</td>
            <td>{{ hospital.pacientesEnEspera }}</td>
            <td><button @click="onSelectHospital(hospital)">Ingresar</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <input-modal
      :title="`Agregar hospital`"
      :open="modalOpen"
      @close="modalOpen = false"
    ></input-modal>
  </div>
</template>

<script lang="ts" setup>
import AddIcon from '@/icons/AddIcon.vue';
import ButtonPrimary from '@/modules/common/components/ButtonPrimary.vue';
import InputModal from '@/modules/hospital/components/InputModal.vue';
import { ref } from 'vue';
import { useHospitalStore } from '../store/hospital.store';
import type { Hospital } from '../interfaces/hospital.interface';
import { useRouter } from 'vue-router';

const router = useRouter();
const modalOpen = ref(false);
const hospitalStore = useHospitalStore();

const onSelectHospital = (hospital: Hospital) => {
  if (!hospital) return;
  hospitalStore.hospitalSelected = hospital.id.toString();

  router.push(`/hospital/${hospitalStore.hospitalSelected}`);
};
</script>
