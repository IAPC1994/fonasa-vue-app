<template>
  <div class="flex justify-center">
    <h2 class="text-2xl">{{ title }}</h2>
  </div>
  <div v-if="allPacientesTable" class="flex justify-end">
    <button-primary @click="modalOpen = true">
      <template #icon>
        <add-icon class="mr-1" />
      </template>
      <template #title>
        <span class="text-white">Nuevo</span>
      </template>
    </button-primary>
  </div>
  <div class="overflow-x-auto max-h-[400px]">
    <table class="table table-zebra border border-base-300">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Estado</th>
          <th>N° Historia Clínica</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <th>{{ paciente.id }}</th>
          <td>{{ paciente.nombre }}</td>
          <td>{{ paciente.edad }}</td>
          <td>
            <span
              :class="`capitalize ${paciente.estado === PacienteStatus.Pendiente && 'text-orange-600'} ${paciente.estado === PacienteStatus.SalaDeEspera && 'text-orange-300'}`"
              >{{ paciente.estado }}</span
            >
          </td>
          <td>{{ paciente.noHistoriaClinica }}</td>
          <td>
            <button
              @click="() => admitirPaciente(paciente.id, paciente.nombre)"
              v-if="paciente.estado === PacienteStatus.Atendido"
            >
              Admitir
            </button>
            <button
              @click="() => enviarSalaEspera(paciente.id, paciente.nombre)"
              v-if="paciente.estado === PacienteStatus.Pendiente"
            >
              Sala de espera
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <input-modal-paciente title="Agregar Paciente" :open="modalOpen" @close="modalOpen = false" />
</template>

<script lang="ts" setup>
import { PacienteStatus } from '../interfaces';
import type { Paciente } from '../interfaces/paciente.interface';
import { usePacienteStore } from '../store/paciente.store';
import { useConsultaStore } from '../../consulta/store/consulta.store';
import InputModalPaciente from './InputModalPaciente.vue';
import ButtonPrimary from '@/modules/common/components/ButtonPrimary.vue';
import AddIcon from '@/icons/AddIcon.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

interface Props {
  title: string;
  pacientes: Paciente[];
  allPacientesTable?: boolean;
}
defineProps<Props>();

const modalOpen = ref(false);
const pacienteStore = usePacienteStore();
const consultaStore = useConsultaStore();
const toast = useToast();

const admitirPaciente = (idPaciente: number, nombre: string) => {
  pacienteStore.changePatientStatus(idPaciente, PacienteStatus.Pendiente);
  toast.success(`Paciente  "${nombre}" ingresado para atención`);
};

const enviarSalaEspera = (idPaciente: number, nombre: string) => {
  pacienteStore.changePatientStatus(idPaciente, PacienteStatus.SalaDeEspera);
  toast.success(`Paciente "${nombre}" enviado a sala de espera`);
};
</script>
