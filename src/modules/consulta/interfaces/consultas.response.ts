import type { Consulta } from '.';

export interface ConsultasResponse {
  consultas: Consulta[];
  status: number;
}
