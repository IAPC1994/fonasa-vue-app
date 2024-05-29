export interface Hospital {
  direccion: string;
  id: number;
  nombre: string;
  consultasDisponibles: number;
  consultasOcupadas: number;
  pacientesEnEspera: number;
  pacientesPendientes: number;
}
