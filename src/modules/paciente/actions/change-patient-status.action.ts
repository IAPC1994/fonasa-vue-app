import { fonasaApi } from '@/api/fonasaApi';
import type { PacienteCrudResponse, PacienteStatus } from '../interfaces';
import { isAxiosError } from 'axios';

export const changePatientStatusAction = async (id: number, estado: PacienteStatus) => {
  try {
    const { data } = await fonasaApi.put<PacienteCrudResponse>('/pacientes/status', {
      id,
      estado,
    });

    return {
      paciente: data.paciente,
      status: data.status,
      message: data.message,
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
