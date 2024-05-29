import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { PacienteStatus, type Paciente } from '../interfaces';
import { changePatientStatusAction, createPatientAction, getAllPacientesAction } from '../actions';

export const usePacienteStore = defineStore('pacientes', () => {
  const pacientes = ref<Paciente[]>([]);

  const getAllPacientes = async (idHospital: string) => {
    try {
      pacientes.value = [];
      const response = await getAllPacientesAction(idHospital);
      if (response.pacientes.length === 0) return pacientes.value;
      pacientes.value = response.pacientes;
    } catch (error) {
      pacientes.value = [];
    }
  };

  const changePatientStatus = async (idPaciente: number, estado: PacienteStatus) => {
    try {
      const response = await changePatientStatusAction(idPaciente, estado);
      if (response.status !== 204) return { status: response.status, message: response.message };

      const index = pacientes.value.findIndex((p) => p.id === idPaciente);
      pacientes.value[index] = response.paciente!;
    } catch (error) {
      console.log(error);
    }
  };

  const createPatient = async (
    nombre: string,
    edad: number,
    noHistoriaClinica: number,
    idHospital: number,
  ) => {
    try {
      const response = await createPatientAction(nombre, edad, noHistoriaClinica, idHospital);
      if (response.status !== 201) return { status: response.status, message: response.message };
      pacientes.value.push(response.paciente!);

      return {
        status: response.status,
        message: 'Paciente creado con éxito',
        paciente: response.paciente,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Properties
    pacientes,

    // Getters
    allPacienteList: computed(() => [...pacientes.value]),
    allPendingPatient: computed(() =>
      pacientes.value.filter((p) => p.estado === PacienteStatus.Pendiente),
    ),
    allWaitingPatient: computed(() =>
      pacientes.value.filter((p) => p.estado === PacienteStatus.SalaDeEspera),
    ),

    // Actions
    getAllPacientes,
    changePatientStatus,
    createPatient,
  };
});
