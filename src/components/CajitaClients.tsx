import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface datosCajaClient {
  nombre: string;
  telefono: string;
}
//npm install --save signature_pad
export function CajaCita({ nombre, telefono }: datosCajaClient) {  // Cambia a recibir directamente las propiedades
  return (
    <QueryClientProvider client={queryClient}>
      <Cajita nombre={nombre} telefono={telefono} />
    </QueryClientProvider>
  );
}

const Cajita: React.FC<datosCajaClient> = ({ nombre, telefono }) => {  // Recibe directamente las propiedades
  return (
    <div className="m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#3B3F46] dark:border-gray-700 dark:hover:bg-[#5b616c]">
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="font-[800]">Nombre: </span>
        {nombre}
      </h2>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
        <span className="font-[800]">Teléfono: </span>{telefono}
      </p>
    </div>
  );
};
