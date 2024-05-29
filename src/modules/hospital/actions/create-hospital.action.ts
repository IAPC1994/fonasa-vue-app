import { isAxiosError } from 'axios';
import { fonasaApi } from '@/api/fonasaApi';
import type { Hospital, HospitalCrudResponse } from '../interfaces';

interface CreationError {
  hospital: null;
  status: number;
  message: string;
}

interface CreationSuccess {
  hospital: Hospital;
  status: number;
  message: string;
}

export const createHospitalAction = async (
  nombre: string,
  direccion: string,
): Promise<CreationSuccess | CreationError> => {
  try {
    const { data } = await fonasaApi.post<HospitalCrudResponse>('/hospitals', {
      nombre,
      direccion,
    });

    return {
      status: data.status,
      message: data.message,
      hospital: data.hospital,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        hospital: null,
        status: 400,
        message: 'Error al crear hospital',
      };
    }
    console.log(error);
    return {
      hospital: null,
      status: 500,
      message: 'Internal Server Error',
    };
  }
};
