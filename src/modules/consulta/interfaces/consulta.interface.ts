import type { ConsultaStatus } from '.';

export interface Consulta {
  cantPacientes: number;
  estado: ConsultaStatus;
  id: number;
  idHospital: number;
  nombreEspecialista: string;
  tipoConsulta: string;
}
