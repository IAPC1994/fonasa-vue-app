import { fonasaApi } from '@/api/fonasaApi';
import type { PacienteResponse } from '../interfaces';

export const getAllPacientesAction = async (idHospital: string): Promise<PacienteResponse> => {
  try {
    const { data } = await fonasaApi.get<PacienteResponse>(`/hospitals/${idHospital}/pacientes`);

    return {
      status: data.status,
      pacientes: data.pacientes,
    };
  } catch (error) {
    console.log(error);
    throw new Error('500 - Internal Server Error');
  }
};
