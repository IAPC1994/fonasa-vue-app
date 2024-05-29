<template>
  <div class="flex justify-center">
    <h2 class="text-2xl">Consultas</h2>
  </div>
  <div class="flex justify-end">
    <button-primary>
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
          <th>Nombre Especialista</th>
          <th>Cant. Pacientes atendidos</th>
          <th>Tipo Consulta</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consulta in consultas" :key="consulta.id">
          <th>{{ consulta.id }}</th>
          <td>{{ consulta.nombreEspecialista }}</td>
          <td>{{ consulta.cantPacientes }}</td>
          <td>
            <span class="capitalize">{{ consulta.tipoConsulta }}</span>
          </td>
          <td>
            <span
              :class="`capitalize ${consulta.estado === ConsultaStatus.EnEspera ? `text-green-500` : `text-red-500`}`"
              >{{ consulta.estado }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ConsultaStatus, type Consulta } from '../interfaces';
import ButtonPrimary from '@/modules/common/components/ButtonPrimary.vue';
import AddIcon from '@/icons/AddIcon.vue';

interface Props {
  consultas: Consulta[];
}

defineProps<Props>();
</script>
