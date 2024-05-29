import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Consulta } from '../interfaces';
import { getAllConsultasByIdHospitalAction } from '../actions';

export const useConsultaStore = defineStore('consultas', () => {
  const consultations = ref<Consulta[]>([]);

  const getAllConsultations = async (idHospital: string) => {
    try {
      consultations.value = [];
      const response = await getAllConsultasByIdHospitalAction(idHospital);
      if (response.consultas.length === 0) return consultations.value;
      consultations.value = response.consultas;
    } catch (error) {
      consultations.value = [];
    }
  };

  return {
    // Properties
    consultations,

    // Getters
    consultaList: computed(() => [...consultations.value!]),
    noConsultaList: computed(() => consultations.value!.length === 0),

    // Methods
    getAllConsultations,
  };
});
