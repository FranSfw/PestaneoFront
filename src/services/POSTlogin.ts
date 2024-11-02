const API_URL = import.meta.env.VITE_API_URL;
//TODO: Definir la interfaz de la respuesta, en employee crear la interfaz de empleado
interface LoginResponse {
  employee?: string;
  success: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/empleados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error en el login: ${response.statusText}`);
    }

    // Parsear la respuesta JSON
    const data: LoginResponse = await response.json();

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    console.error("Error al hacer login:", error);
    throw error;
  }
};
