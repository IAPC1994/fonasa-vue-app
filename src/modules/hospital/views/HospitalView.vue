<template>
  <div class="w-screen fade-in">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-2 container mx-auto pt-10">
      <div class="w-full min-h-[400px]">
        <!-- Tabla Todos los Pacientes -->
        <paciente-table
          title="Todos los pacientes"
          :pacientes="pacienteStore.allPacienteList"
          :all-pacientes-table="true"
        />
      </div>

      <div class="w-full min-h-[400px]">
        <!-- Tabla de Consultas -->
        <consulta-table :consultas="consultaStore.consultaList" />
      </div>
      <div class="w-full min-h-[400px]">
        <!-- Tabla de Pacientes Pendientes -->
        <paciente-table
          title="Pacientes pendientes"
          :pacientes="pacienteStore.allPendingPatient || []"
        />
      </div>
      <div class="w-full min-h-[400px]">
        <!-- Tabla de Pacientes en Sala de espera -->
        <paciente-table
          title="Pacientes en espera"
          :pacientes="pacienteStore.allWaitingPatient || []"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConsultaTable from '@/modules/consulta/components/ConsultaTable.vue';
import PacienteTable from '@/modules/paciente/components/PacienteTable.vue';
import { usePacienteStore } from '../../paciente/store/paciente.store';
import { watch } from 'vue';
import { useConsultaStore } from '../../consulta/store/consulta.store';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const pacienteStore = usePacienteStore();
const consultaStore = useConsultaStore();

// const hospital = ref<Hospital | null>();

watch(
  () => props.id,
  () => {
    pacienteStore.getAllPacientes(props.id);
    consultaStore.getAllConsultations(props.id);
  },
  { immediate: true },
);
</script>
