import { fonasaApi } from '@/api/fonasaApi';
import type { ConsultasResponse } from '../interfaces';

export const getAllConsultasByIdHospitalAction = async (idHospital: string) => {
  try {
    const { data } = await fonasaApi.get<ConsultasResponse>(`/hospitals/${idHospital}/consultas`);

    return {
      status: data.status,
      consultas: data.consultas,
    };
  } catch (error) {
    console.log(error);
    throw new Error('500 - Internal Server Error');
  }
};
