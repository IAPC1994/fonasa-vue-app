import { fonasaApi } from '@/api/fonasaApi';
import type { Hospital } from '../interfaces/hospital.interface';

interface HospitalSuccess {
  hospitals: Hospital[];
  status: number;
}

export const getAllHospitalsAction = async (): Promise<HospitalSuccess> => {
  try {
    const { data } = await fonasaApi.get<HospitalSuccess>('/hospitals');
    if (!data.hospitals) return { hospitals: [], status: 200 };

    return {
      status: data.status,
      hospitals: data.hospitals,
    };
  } catch (error) {
    console.log(error);
    throw new Error('500 - Internal Server Error');
  }
};
