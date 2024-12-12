
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
  //cliente?: number;
  telefono: string;
  fecha: string;
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
  console.log("papu pro: ",cita);
  const response = await fetch(`${API_URL}/citas/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telefono: cita.telefono,
      fecha: cita.fecha,
      encargado: cita.encargado,
      procedimiento: cita.procedimiento,
      notas: cita.notas,
      mapping_estilo: cita.mapping_estilo,
      tamaño: cita.tamaño,
      curvatura: cita.curvatura,
      espessura: cita.espessura,
    }),
  });
  console.log("response: ",response.json());
  console.log("response: ",response);
  return response;
}

export async function deleteCita(cita_id: number) {
  console.log("cita_id: ",cita_id);
  const response = await fetch(`${API_URL}/citas/delete/${cita_id}`, {
    method: "DELETE",
  });
  console.log("response: ",response.ok);
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
  return response.json();
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

export async function searchUser(search: string) {
  const response = await fetch(`${API_URL}/clientes/phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: search,
    }),
  });
  const data = await response.json();
  return data;
}