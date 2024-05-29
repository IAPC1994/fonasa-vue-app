import type { Hospital } from '.';

export interface HospitalCrudResponse {
  hospital: Hospital;
  status: number;
  message: string;
}
