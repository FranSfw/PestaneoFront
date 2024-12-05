import { HiOutlineRadio } from "react-icons/hi2";

export interface Cita {
  //cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura
  citas_id?: number;
  cliente_id: number;
  cliente_nombre: string;
  cliente_apellido: string;
  telefono: string;
  fecha: Date;
  hour: Date;
  encargado_id: string;
  encargado_nombre: string;
  encargado_apellido: string;
  tipo_procedimiento: string;
  num_dias?: number;
  notas: string;
  mapping_estilo: string;
  tamaño: string;
  curvatura: string;
  espessura: string;
  foto: string;
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

export async function lastCita(citas_id: number) {
  const response = await fetch(`${API_URL}/citas/last`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clienteid: citas_id }),
  });
  return response;
}

export async function updateAppointment(update: Cita) {
  try {
    const response = await fetch(`${API_URL}/appointments/${update.citas_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha: update.fecha,
        cliente_id: update.cliente_id,
        hour: update.hour,
        encargado_id: update.encargado_id,
        tipo_procedimiento: update.tipo_procedimiento,
        num_dias: update.num_dias,
        notas: update.notas,
        mapping_estilo: update.mapping_estilo,
        tamaño: update.tamaño,
        curvatura: update.curvatura,
        espessura: update.espessura,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function searchAppointment(search: string) {
  const response = await fetch(`${API_URL}/appointments/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: search,
    }),
  });
  const data = await response.json();
  return data;
}
