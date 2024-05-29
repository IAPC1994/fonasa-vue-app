import type { Paciente } from '.';

export interface PacienteCrudResponse {
  paciente: Paciente;
  status: number;
  message: string;
}
