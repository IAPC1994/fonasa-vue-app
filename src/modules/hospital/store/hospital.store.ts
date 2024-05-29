import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Hospital } from '../interfaces/hospital.interface';
import { createHospitalAction, getAllHospitalsAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useHospitalStore = defineStore('hospitals', () => {
  const hospitals = ref<Hospital[]>([]);
  const hospitalSelected = ref(useLocalStorage('hospital', ''));

  const getAllHospitals = async () => {
    try {
      const hospitalsResponse = await getAllHospitalsAction();
      if (hospitalsResponse.hospitals.length === 0) {
        return false;
      }
      hospitals.value = hospitalsResponse.hospitals;
      return true;
    } catch (error) {
      hospitals.value = [];
      return false;
    }
  };

  const createHospital = async (nombre: string, direccion: string) => {
    try {
      const response = await createHospitalAction(nombre, direccion);
      if (response.status !== 201) {
        return {
          status: response.status,
          message: response.message,
        };
      }

      if (!response.hospital) return { status: response.status, message: response.message };

      hospitals.value?.push(response.hospital);

      return {
        status: response.status,
        message: response.message,
        hospital: response.hospital,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Properties
    hospitals,
    hospitalSelected,

    // Getters
    hospitalList: computed(() => [...hospitals.value!]),
    noHospitals: computed(() => hospitals.value.length === 0),
    getSelectedHospital: computed(() => hospitalSelected.value),

    // Methods
    getAllHospitals,
    createHospital,
  };
});
