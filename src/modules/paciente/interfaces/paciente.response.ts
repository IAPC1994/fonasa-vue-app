import type { Paciente } from '.';

export interface PacienteResponse {
  pacientes: Paciente[];
  status: number;
}
