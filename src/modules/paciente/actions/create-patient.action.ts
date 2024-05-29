import { fonasaApi } from '@/api/fonasaApi';
import type { PacienteCrudResponse } from '../interfaces';
import { isAxiosError } from 'axios';

export const createPatientAction = async (
  nombre: string,
  edad: number,
  noHistoriaClinica: number,
  idHospital: number,
) => {
  try {
    const { data } = await fonasaApi.post<PacienteCrudResponse>('/pacientes', {
      nombre,
      edad,
      noHistoriaClinica,
      idHospital,
    });

    return {
      status: data.status,
      message: data.message,
      paciente: data.paciente,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        status: 400,
        message: 'Bad Request',
      };
    }
    console.log(error);
    throw new Error('Internal Server Error');
  }
};
