export interface Cita {
  //cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura
  citas_id?: number;
  cliente_nombre: string;
  cliente_apellido: string;
  fecha: Date;
  encargado_nombre: string;
  encargado_apellido: string;
  tipo_procedimiento: string;
  telefono: string;
  //num_dias: number;
  notas: string;
  mapping_estilo: string;
  tamaño: string;
  curvatura: string;
  espessura: string;
}
export interface CitaResponse {
  citas: Cita[];
}

export interface CitasCreate {
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
export async function createCita(cita: CitasCreate) {
  const response = await fetch(`${API_URL}/citas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cita),
  });
  return response;
}

export async function deleteCita(citas_id: number) {
  const response = await fetch(`${API_URL}/citas/${citas_id}`, {
    method: "DELETE",
  });
  return response;
}
