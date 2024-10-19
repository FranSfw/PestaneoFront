const API_URL = import.meta.env.VITE_API_URL;

interface createClientResponse { 
    
    id: number;
    name: string;
    email: string;
  
}

interface createClientData {
    id: number;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: number;
    email: string;
    fecha_nacimiento: Date; // Tipo Date en TypeScript
    medicamentos: string;
    alergias: string;
    sensibilidad_productos: string;
    dermatitis: boolean;
    infeccion_ojos: boolean;
    dolencia_ojos: boolean;
    latex: boolean;
    fecha_ultimo_procedimiento: Date; // Tipo Date en TypeScript
    ultimo_procedimiento: string;
}


