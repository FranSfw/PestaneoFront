export interface Cliente {
  cliente_id: number;
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  email: string;
  fecha_nacimiento: Date;
  medicamentos: string;
  alergias: string;
  sensibilidad_productos: string;
  dermatitis: boolean;
  infeccion_ojos: boolean;
  dolencia_ojos: boolean;
  latex: boolean;
  fecha_ultimo_procedimiento: Date;
  ultimo_procedimiento: string;
  firma: string;
  foto: string;
}
export interface ClienteResponse {
  clientes: Cliente[];
}

export interface clienteCreate {
  nombre: string;
  apellido: string;
  domicilio: string;
  telefono: string;
  email: string;
  fecha_nacimiento: string;
  medicamentos: string;
  alergias: string;
  sensibilidad_productos: string;
  dermatitis: boolean;
  infeccion_ojos: boolean;
  dolencia_ojos: boolean;
  latex: boolean;
  fecha_ultimo_procedimiento: string;
  ultimo_procedimiento?: string;
  firma: string;
  foto: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export const getAllClientes = async (): Promise<ClienteResponse> => {
  try {
    const respuesta = await fetch(`${API_URL}/clientes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      console.log(respuesta);
      throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
    }

    const datos: ClienteResponse = await respuesta.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const getClienteByTel = async (
  search: string
): Promise<ClienteResponse> => {
  try {
    const respuesta = await fetch(`${API_URL}/clientes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telefono: search,
      }),
    });

    if (!respuesta.ok) {
      console.log(respuesta);
      throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
    }

    const datos: ClienteResponse = await respuesta.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export async function clienteAgregar(create: clienteCreate) {
  console.log("papu pro: ", create);
  const response = await fetch(`${API_URL}/clientes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: create.nombre,
      apellido: create.apellido,
      domicilio: create.domicilio,
      telefono: create.telefono,
      email: create.email,
      fecha_nacimiento: create.fecha_nacimiento,
      medicamentos: create.medicamentos,
      alergias: create.alergias,
      sensibilidad_productos: create.sensibilidad_productos,
      dermatitis: create.dermatitis,
      infeccion_ojos: create.infeccion_ojos,
      dolencia_ojos: create.dolencia_ojos,
      latex: create.latex,
      foto: create.foto,
      firma: create.firma,
      fecha_ultimo_procedimiento: create.fecha_ultimo_procedimiento,
      ultimo_procedimiento: create.ultimo_procedimiento,
     
    }),
  });
  console.log(response.json());
  console.log(response);
  const responsedata = await response.json();
  return responsedata;
}
