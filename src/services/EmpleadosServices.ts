export interface empleado {
  empleado_id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  foto?: string;
  token?: string;
}
export interface empleadoResponse {
  empleados: empleado[];
}

export interface empleadoCreate {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  foto?: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllempleados() {
  const response = await fetch(`${API_URL}/empleados`);
  const data: empleadoResponse = await response.json();
  return data;
}

export async function empleadoAddService(create: empleadoCreate) {
  const response = await fetch(`${API_URL}/empleados/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: create.nombre,
      apellido: create.apellido,
      email: create.email,
      password: create.password,
      foto: create.foto,
    }),
  });

  const responsedata = await response.json();
  return responsedata;
}

export async function deleteempleado(empleado_id: number) {
  const response = await fetch(`${API_URL}/empleado/${empleado_id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
export async function updateempleado(empleado: empleado) {
  const response = await fetch(`${API_URL}/empleado/${empleado.empleado_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      password: empleado.password,
      //foto: empleado.foto,
    }),
  });
  const data = await response.json();
  return data;
}
export async function searchempleado(name: string) {
  const response = await fetch(`${API_URL}/empleado/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
  const data = await response.json();
  return data;
}
