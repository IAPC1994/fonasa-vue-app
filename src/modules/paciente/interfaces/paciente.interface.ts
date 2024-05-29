import type { PacienteStatus } from './paciente-status.enum';

export interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  estado: PacienteStatus;
  noHistoriaClinica: number;
  idHospital: number;
}
