export interface Cita {
  //cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura
  citas_id?: number;
  cliente: number;
  fecha: Date;
  encargado: number;
  procedimiento: number;
  //num_dias
  notas: string;
  mapping_estilo: string;
  tamaño: string;
  curvatura: string;
  espessura: string;
}
export interface CitaResponse {
  citas: Cita[];
}

export interface citasCreate {
  cliente: number;
  fecha: Date;
  encargado: number;
  procedimiento: number;
  notas: string;
  mapping_estilo: string;
  tamaño: string;
  curvatura: string;
  espessura: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllCitas() {
  const response = await fetch(`${API_URL}/citas`);
  const data: CitaResponse = await response.json();
  return data;
}
